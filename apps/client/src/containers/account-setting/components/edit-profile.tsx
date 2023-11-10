import { Menu, Transition } from '@headlessui/react'
import { Check, CheckOne, CloseSmall, Pencil } from '@icon-park/react'
import { Button, FormInput, Input, Modal } from '@ume/ui'
import ImgForEmpty from 'public/img-for-empty.png'
import { uploadImageBooking } from '~/apis/upload-media'
import { GenderEnum } from '~/enumVariable/enumVariable'
import useDebounce from '~/hooks/useDebounce'

import { FormEvent, Fragment, useEffect, useRef, useState } from 'react'

import { notification } from 'antd'
import { useFormik } from 'formik'
import Image from 'next/legacy/image'
import * as Yup from 'yup'

import ConfirmForm from '~/components/confirm-form/confirm-form'
import { SkeletonForAccountSetting } from '~/components/skeleton-load'

import { trpc } from '~/utils/trpc'

interface GenderProps {
  key: GenderEnum
  name: string
}

interface SelectedImageProps {
  avatarURL: string | undefined
  frontVertificationImage: string | undefined
  backVertificationImage: string | undefined
  faceImage: string | undefined
}

const genderData: GenderProps[] = [
  { key: GenderEnum.MALE, name: 'Nam' },
  { key: GenderEnum.FEMALE, name: 'Nữ' },
  { key: GenderEnum.OTHER, name: 'Khác' },
  { key: GenderEnum.PRIVATE, name: 'Ẩn' },
]

const EditProfile = () => {
  const today = new Date().toISOString().split('T')[0]

  const { data: userSettingData, isLoading: isLoadingUserSettingData } = trpc.useQuery(['identity.identityInfo'])
  const utils = trpc.useContext()

  const updateInformation = trpc.useMutation(['identity.updateUserProfile'])
  const userKYC = trpc.useMutation(['identity.userKYC'])

  const [selectedImage, setSelectedImage] = useState<SelectedImageProps>({
    avatarURL: undefined,
    frontVertificationImage: undefined,
    backVertificationImage: undefined,
    faceImage: undefined,
  })

  const [isModalConfirmationVisible, setIsModalConfirmationVisible] = useState(false)
  const [isModalVertificationVisible, setIsModalVertificationVisible] = useState(false)

  const editAccountInforFormRef = useRef<HTMLFormElement>(null)

  const vietnamesePhoneNumberRegExp = /^(03|05|07|08|09)\d{8}$/

  const form = useFormik({
    initialValues: {
      avatarUrl: '',
      dob: '',
      email: '',
      gender: genderData[0],
      isVerified: false,
      latestOnline: null,
      name: '',
      phone: '',
      slug: '',
      username: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên là yêu cầu'),
      dob: Yup.date().required('Ngày sinh là yêu cầu'),
      slug: Yup.string().required('Đường dẫn là yêu cầu'),
      phone: Yup.string()
        .required('Số điện thoại là yêu cầu')
        .matches(vietnamesePhoneNumberRegExp, 'Định dạng không hợp lệ'),
    }),
    onSubmit(values) {
      setIsModalConfirmationVisible(true)
    },
  })

  const handleResetForm = () => {
    if (!isLoadingUserSettingData && userSettingData) {
      form.setValues({
        avatarUrl: userSettingData?.data?.avatarUrl ?? '',
        dob: userSettingData?.data?.dob?.split('T')[0] ?? '',
        email: userSettingData?.data?.email ?? '',
        gender: genderData.find((gender) => gender.key == userSettingData?.data?.gender) ?? genderData[0],
        isVerified: userSettingData?.data?.isVerified,
        latestOnline: null,
        name: userSettingData?.data?.name ?? '',
        phone: userSettingData?.data?.phone ?? '',
        slug: userSettingData?.data?.slug ?? '',
        username: userSettingData?.data?.username ?? '',
      })
    }
  }

  useEffect(() => {
    handleResetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSettingData])

  const debouncedValue = useDebounce<string>(form.values.slug, 500)
  const { data: checkSlugUserData } = trpc.useQuery(['identity.checkSlugUser', debouncedValue], {
    enabled: !!form.values.slug,
  })

  const inforChange: boolean =
    (userSettingData?.data?.name ?? '') == form.values.name &&
    (userSettingData?.data?.avatarUrl ?? '') == form.values.avatarUrl &&
    (userSettingData?.data?.dob?.split('T')[0] ?? '') == form.values.dob &&
    (userSettingData?.data?.gender ?? '') == form.values.gender.key &&
    (userSettingData?.data?.phone ?? '') == form.values.phone &&
    (userSettingData?.data?.slug ?? '') == form.values.slug

  const handleClose = () => {
    setIsModalConfirmationVisible(false)
    setIsModalVertificationVisible(false)
  }

  const handleImageChange = (event, index: number) => {
    const file = event.target.files[0]

    if (file) {
      switch (index) {
        case 0:
          setSelectedImage((image) => ({
            ...image,
            avatarURL: URL.createObjectURL(file),
          }))
          form.setFieldValue('avatarUrl', URL.createObjectURL(file))
          break
        case 1:
          setSelectedImage((image) => ({
            ...image,
            frontVertificationImage: URL.createObjectURL(file),
          }))
          break
        case 2:
          setSelectedImage((image) => ({
            ...image,
            backVertificationImage: URL.createObjectURL(file),
          }))
          break
        case 3:
          setSelectedImage((image) => ({
            ...image,
            faceImage: URL.createObjectURL(file),
          }))
          break
        default:
          break
      }
    } else {
      notification.error({
        message: 'File ảnh bị lỗi',
        description: 'Vui lòng kiểm tra lại file ảnh!',
        placement: 'bottomLeft',
      })
    }
  }

  const handleUploadImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    if (selectedImage.frontVertificationImage && selectedImage.backVertificationImage && selectedImage.faceImage) {
      try {
        const responseData = await uploadImageBooking(formData)
        if (responseData?.data?.data?.results) {
          userKYC.mutate(
            {
              frontSideCitizenIdImageUrl: responseData.data.data.results[0],
              backSideCitizenIdImageUrl: responseData.data.data.results[1],
              portraitImageUrl: responseData.data.data.results[2],
            },
            {
              onSuccess() {
                setSelectedImage((image) => ({
                  ...image,
                  frontVertificationImage: undefined,
                  backVertificationImage: undefined,
                  faceImage: undefined,
                }))
                setIsModalVertificationVisible(false)
                utils.invalidateQueries('identity.identityInfo')
                notification.success({
                  message: 'Cập nhật thông tin thành công',
                  description: 'Thông tin vừa được cập nhật',
                  placement: 'bottomLeft',
                })
              },
              onError() {
                notification.error({
                  message: 'Cập nhật thông tin thất bại',
                  description: 'Có lỗi trong quá trình cập nhật thông tin. Vui lòng thử lại sau!',
                  placement: 'bottomLeft',
                })
              },
            },
          )
        } else {
          notification.error({
            message: 'Cập nhật thông tin thất bại',
            description: 'Có lỗi trong quá trình cập nhật thông tin. Vui lòng thử lại sau!',
            placement: 'bottomLeft',
          })
        }
      } catch (error) {
        notification.error({
          message: 'Cập nhật thông tin thất bại',
          description: 'Có lỗi trong quá trình cập nhật thông tin. Vui lòng thử lại sau!',
          placement: 'bottomLeft',
        })
      }
    } else {
      notification.warning({
        message: 'Thiếu ảnh',
        description: 'Vui lòng cung cấp đủ hình ảnh!',
        placement: 'bottomLeft',
      })
    }
  }

  const handleUpdateInformation = async () => {
    if (editAccountInforFormRef.current) {
      if (selectedImage.avatarURL) {
        const formData = new FormData(editAccountInforFormRef.current)
        const responseData = await uploadImageBooking(formData)

        if (responseData?.data?.data?.results) {
          try {
            updateInformation.mutate(
              {
                avatarUrl: String(responseData.data.data.results),
                dob: form.values.dob,
                gender: form.values.gender.key,
                name: form.values.name?.trim(),
                slug: form.values.slug?.trim(),
                phone: form.values.phone,
              },
              {
                onSuccess() {
                  setSelectedImage((image) => ({
                    ...image,
                    avatarURL: undefined,
                  }))
                  setIsModalConfirmationVisible(false)
                  utils.invalidateQueries('identity.identityInfo')
                  notification.success({
                    message: 'Cập nhật thông tin thành công',
                    description: 'Thông tin vừa được cập nhật',
                    placement: 'bottomLeft',
                  })
                },
              },
            )
          } catch (error) {
            notification.error({
              message: 'Cập nhật thông tin thất bại',
              description: 'Có lỗi trong quá tring cập nhật thông tin. Vui lòng thử lại sau!',
              placement: 'bottomLeft',
            })
          }
        } else {
          notification.error({
            message: 'Cập nhật thông tin thất bại',
            description: 'Có lỗi trong quá tring cập nhật thông tin. Vui lòng thử lại sau!',
            placement: 'bottomLeft',
          })
        }
      } else {
        try {
          updateInformation.mutate(
            {
              dob: form.values.dob,
              gender: form.values.gender.key,
              name: form.values.name?.trim(),
              slug: form.values.slug?.trim(),
              phone: form.values.phone,
            },
            {
              onSuccess() {
                utils.invalidateQueries('identity.identityInfo')
                setIsModalConfirmationVisible(false)
                notification.success({
                  message: 'Cập nhật thông tin thành công',
                  description: 'Thông tin vừa được cập nhật',
                  placement: 'bottomLeft',
                })
              },
            },
          )
        } catch (error) {
          notification.error({
            message: 'Cập nhật thông tin thất bại',
            description: 'Có lỗi trong quá trình cập nhật thông tin. Vui lòng thử lại sau!',
            placement: 'bottomLeft',
          })
        }
      }
    }
  }

  const confirmModal = Modal.useEditableForm({
    onOK: () => {},
    onClose: handleClose,
    show: isModalConfirmationVisible,
    form: (
      <ConfirmForm
        title="Thay đổi thông tin cá nhân"
        description="Bạn có chấp nhận thay đổi thông tin cá nhân hay không?"
        onClose={handleClose}
        onOk={() => {
          handleUpdateInformation()
        }}
      />
    ),
    backgroundColor: '#15151b',
    closeWhenClickOutSide: true,
    closeButtonOnConner: (
      <CloseSmall
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Enter' && handleClose()}
        tabIndex={1}
        className=" bg-[#3b3470] rounded-full cursor-pointer top-2 right-2 hover:rounded-full hover:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 "
        theme="outline"
        size="24"
        fill="#FFFFFF"
      />
    ),
  })

  const vertificationModal = Modal.useEditableForm({
    onOK: () => {},
    onClose: handleClose,
    show: isModalVertificationVisible,
    customModalCSS: 'top-0 overflow-y-auto custom-scrollbar',
    closeWhenClickOutSide: true,
    form: (
      <form
        className="min-h-[75%] max-h-[95%] flex flex-col justify-between px-5 pb-5 gap-5 overflow-y-auto custom-scrollbar"
        onSubmit={handleUploadImage}
      >
        <div className="pb-3 text-xl font-bold text-white border-b border-opacity-30">Xác minh danh tính</div>
        <p className="text-white opacity-50">*Dùng ảnh CCCD hoặc Passport</p>
        <div className="min-h-[75%] max-h-full flex flex-col gap-10 text-md text-white overflow-y-auto custom-scrollbar">
          <div>
            <label>Ảnh mặt trước</label>
            <div className="relative">
              <div className="relative w-full h-[300px] bg-white bg-opacity-30 rounded-xl">
                {!selectedImage.frontVertificationImage && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full border-2 border-white border-dashed rounded-xl">
                    <p className="text-4xl font-bold text-white">+</p>
                  </div>
                )}
                <Image
                  className="rounded-lg"
                  layout="fill"
                  objectFit="scale-down"
                  src={selectedImage.frontVertificationImage ? selectedImage.frontVertificationImage : ImgForEmpty}
                  alt="Personal Image"
                />
              </div>
              <input
                className="absolute top-0 left-0 z-20 w-full h-full opacity-0 cursor-pointer"
                type="file"
                name="files"
                onChange={(e) => handleImageChange(e, 1)}
              />
            </div>
          </div>
          <div>
            <label>Ảnh mặt sau</label>
            <div className="relative">
              <div className="relative w-full h-[300px] bg-white bg-opacity-30 rounded-xl">
                <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full border-2 border-white border-dashed rounded-xl">
                  <p className="text-4xl font-bold text-white">+</p>
                </div>
                <Image
                  className="rounded-lg"
                  layout="fill"
                  objectFit="scale-down"
                  src={selectedImage.backVertificationImage ? selectedImage.backVertificationImage : ImgForEmpty}
                  alt="Personal Image"
                />
              </div>
              <input
                className="absolute top-0 left-0 z-20 w-full h-full opacity-0 cursor-pointer"
                type="file"
                name="files"
                onChange={(e) => handleImageChange(e, 2)}
              />
            </div>
          </div>
          <div>
            <label>Ảnh khuôn mặt</label>
            <div className="relative">
              <div className="relative w-full h-[300px] bg-white bg-opacity-30 rounded-xl">
                <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full border-2 border-white border-dashed rounded-xl">
                  <p className="text-4xl font-bold text-white">+</p>
                </div>
                <Image
                  className="rounded-lg"
                  layout="fill"
                  objectFit="scale-down"
                  src={selectedImage.faceImage ? selectedImage.faceImage : ImgForEmpty}
                  alt="Personal Image"
                />
              </div>
              <input
                className="absolute top-0 left-0 z-20 w-full h-full opacity-0 cursor-pointer"
                type="file"
                name="files"
                onChange={(e) => handleImageChange(e, 3)}
              />
            </div>
          </div>
        </div>
        <div className="min-h-[50px] flex justify-around items-start">
          <Button
            isActive={false}
            isOutlinedButton={true}
            customCSS="w-[100px] text-xl p-2 rounded-xl hover:scale-105"
            onClick={() => handleClose()}
          >
            Hủy
          </Button>

          <Button
            customCSS="w-[150px] text-xl p-2 rounded-xl hover:scale-105"
            type="submit"
            isActive={true}
            isOutlinedButton={true}
          >
            Xác minh
          </Button>
        </div>
      </form>
    ),
    backgroundColor: '#15151b',
    closeButtonOnConner: (
      <CloseSmall
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Enter' && handleClose()}
        tabIndex={1}
        className="bg-[#3b3470] rounded-full cursor-pointer top-2 right-2 hover:rounded-full hover:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
        theme="outline"
        size="24"
        fill="#FFFFFF"
      />
    ),
  })

  return (
    <div className="w-full px-10">
      <p className="text-4xl font-bold">Thông tin cá nhân</p>
      {!isLoadingUserSettingData && userSettingData?.success ? (
        <>
          <form
            ref={editAccountInforFormRef}
            onSubmit={form.handleSubmit}
            className="flex flex-col items-center w-full gap-5 p-10"
          >
            <div className="flex items-center justify-start w-full gap-24">
              <div className="relative p-2 bg-gray-700 rounded-lg">
                <div className="w-[250px] h-[300px]">
                  <Image
                    className="rounded-lg"
                    layout="fill"
                    objectFit="cover"
                    src={
                      selectedImage.avatarURL
                        ? selectedImage.avatarURL
                        : form.values.avatarUrl != ''
                        ? form.values.avatarUrl
                        : ImgForEmpty
                    }
                    alt="Personal Image"
                  />
                </div>
                <div className="absolute bottom-0 right-0 p-2 rounded-full bg-zinc-800 hover:bg-gray-700">
                  <Pencil theme="filled" size="25" fill="#FFFFFF" strokeLinejoin="bevel" />
                  <input
                    className="absolute top-0 left-0 z-20 w-full h-full opacity-0"
                    type="file"
                    name="files"
                    onChange={(e) => handleImageChange(e, 0)}
                  />
                </div>
              </div>
              <div>
                <p className="py-2 mb-5 border-b opacity-30">Thông tin hồ sơ</p>
                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <label>Tên</label>
                    <FormInput
                      name="name"
                      className={`${
                        form.values.name == (userSettingData.data?.name ?? '') ? 'bg-zinc-800' : 'bg-gray-700'
                      } border border-white border-opacity-30`}
                      value={form.values.name}
                      onChange={(e) => form.handleChange(e)}
                      onBlur={form.handleBlur}
                      error={!!form.errors.name && form.touched.name}
                      errorMessage={''}
                      autoComplete="off"
                    />
                    {!!form.errors.name && form.touched.name && (
                      <p className="text-xs text-red-500">{form.errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-end gap-3">
                      Đường dẫn của bạn{' '}
                      {!userSettingData.data?.slug && (
                        <p className="text-xs text-red-600 font-semibold opacity-80">
                          *( Chỉ được cập nhật một lần duy nhất )
                        </p>
                      )}
                    </label>
                    <FormInput
                      name="slug"
                      className={`${
                        form.values.slug == (userSettingData.data?.slug ?? '') ? 'bg-zinc-800' : 'bg-gray-700'
                      } ${
                        !userSettingData.data?.slug
                          ? 'border border-white border-opacity-30'
                          : '!border-none !hover:border-none !focus:border-none outline-0'
                      }`}
                      placeholder="nguyen_van_a"
                      value={form.values.slug}
                      onChange={(e) => {
                        const updatedValue = e.target.value.replace(/ /g, '-')
                        e.target.value = updatedValue
                        form.handleChange(e)
                      }}
                      onBlur={form.handleBlur}
                      disabled={!!userSettingData.data?.slug}
                      readOnly={!!userSettingData.data?.slug}
                      error={(!!form.errors.slug && form.touched.slug) || checkSlugUserData?.data.isExisted}
                      errorMessage={undefined}
                    />
                    {!!form.errors.slug && form.touched.slug && (
                      <p className="text-xs text-red-500">{form.errors.slug}</p>
                    )}
                    {!userSettingData.data?.slug && checkSlugUserData?.data.isExisted && (
                      <p className="text-xs text-red-500">Đường dẫn này đãn được sử dụng</p>
                    )}
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="space-y-2">
                      <label>Email</label>
                      <Input
                        name="email"
                        className="bg-zinc-800 focus:outline-none"
                        value={form.values.email}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Số điện thoại</label>
                      <FormInput
                        type="text"
                        name="phone"
                        className={`${
                          form.values.phone == (userSettingData.data?.phone ?? '') ? 'bg-zinc-800' : 'bg-gray-700'
                        } border border-white border-opacity-30`}
                        value={form.values.phone}
                        onChange={(e) => form.handleChange(e)}
                        onBlur={form.handleBlur}
                        error={!!form.errors.phone && form.touched.phone}
                        errorMessage={''}
                        autoComplete="off"
                      />
                      {!!form.errors.phone && form.touched.phone && (
                        <p className="text-xs text-red-500">{form.errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="space-y-2">
                      <label>Ngày sinh</label>
                      <FormInput
                        name="dob"
                        type="date"
                        className={`${
                          form.values.dob == (userSettingData.data?.dob?.split('T')[0] ?? '')
                            ? 'bg-zinc-800'
                            : 'bg-gray-700'
                        } border border-white border-opacity-30`}
                        max={today}
                        value={form.values.dob}
                        onChange={(e) => form.handleChange(e)}
                        onBlur={form.handleBlur}
                        error={!!form.errors.dob && form.touched.dob}
                        errorMessage={''}
                      />
                      {!!form.errors.dob && form.touched.dob && (
                        <p className="text-xs text-red-500">{form.errors.dob}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label>Giới tính</label>
                      <div className="relative w-fit">
                        <Menu>
                          <Menu.Button>
                            <button
                              className={`min-w-[110px] text-xl font-semibold px-8 py-2 ${
                                form.values.gender.key == userSettingData.data?.gender ? 'bg-zinc-800' : 'bg-gray-700'
                              } hover:bg-gray-700 rounded-xl`}
                            >
                              {form.values.gender.name}
                            </button>
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-400"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-400"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              className="absolute right-0 left-0 p-2 mt-2 origin-top-right bg-[#292734] divide-y divide-gray-100 rounded-xl shadow-lg w-fit ring-1 ring-black ring-opacity-5 focus:outline-none"
                              style={{ zIndex: 5 }}
                            >
                              <div className="flex flex-col gap-2" style={{ zIndex: 10 }}>
                                {genderData.map((genData, index) => (
                                  <div
                                    className={`flex gap-5 items-center ${
                                      genData.key === form.values.gender.key ? 'bg-gray-700' : ''
                                    } hover:bg-gray-700 cursor-pointer p-3 rounded-lg`}
                                    key={index}
                                    onClick={() => {
                                      form.setFieldValue('gender', genData)
                                    }}
                                    onKeyDown={() => {}}
                                  >
                                    <p className="font-semibold text-mg">{genData.name}</p>
                                    <div>
                                      {genData.key === form.values.gender.key ? (
                                        <Check theme="filled" size="10" fill="#FFFFFF" strokeLinejoin="bevel" />
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Xác minh danh tính</label>
                    <div>
                      {userSettingData.data?.isVerified ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-md w-fit">
                            <CheckOne theme="outline" size="20" fill="#FFF" strokeLinejoin="bevel" /> Đã xác minh
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="p-2 px-5 text-white bg-red-600 rounded-md w-fit">Chưa xác minh</div>
                          <Button
                            isActive={true}
                            isOutlinedButton={true}
                            customCSS="py-2 px-7 rounded-xl hover:scale-105"
                            type="button"
                            onClick={() => {
                              setIsModalVertificationVisible(true)
                            }}
                          >
                            Xác minh danh tính
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-10 mt-20">
              {(!inforChange || selectedImage.avatarURL) && (
                <>
                  <Button
                    isActive={false}
                    isOutlinedButton={true}
                    type="button"
                    customCSS="w-[100px] text-xl p-2 rounded-xl hover:scale-105"
                    onClick={() => handleResetForm()}
                  >
                    Hủy
                  </Button>
                  <Button
                    customCSS="w-[100px] text-xl p-2 rounded-xl hover:scale-105"
                    type="button"
                    isActive={true}
                    isOutlinedButton={true}
                    onClick={() => {
                      if (form.values.dob != '' && form.values.phone != '') {
                        setIsModalConfirmationVisible(true)
                      } else {
                        if (form.values.dob == '') {
                          form.setFieldError('dob', 'Ngày sinh là yêu cầu')
                          form.setFieldTouched('dob', true)
                        }
                        if (form.values.phone == '') {
                          form.setFieldError('phone', 'Số điện thoại là yêu cầu')
                          form.setFieldTouched('phone', true)
                        }
                        notification.warning({
                          message: 'Thiếu thông tin',
                          description: 'Vui lòng kiểm tra lại số điện thoại và ngày sinh!',
                          placement: 'bottomLeft',
                        })
                      }
                    }}
                  >
                    Thay đổi
                  </Button>
                </>
              )}
            </div>
            {isModalConfirmationVisible && confirmModal}
          </form>
          {isModalVertificationVisible && vertificationModal}
        </>
      ) : (
        <SkeletonForAccountSetting />
      )}
    </div>
  )
}
export default EditProfile
