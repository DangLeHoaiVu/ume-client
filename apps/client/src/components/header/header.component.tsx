import { Menu, Transition } from '@headlessui/react'
import { Dot, Gift, Remind } from '@icon-park/react'
import { Button } from '@ume/ui'
import coin from 'public/coin-icon.png'
import logo from 'public/ume-logo-2.svg'
import Notificate from '~/containers/notificate/notificate.container'
import { useAuth } from '~/contexts/auth'

import React, { Fragment, ReactElement, useCallback, useId, useState } from 'react'

import { isNil } from 'lodash'
import Image from 'next/legacy/image'
import Link from 'next/link'

import { DropDownMenu } from './drop-down.component'
import { LoginModal } from './login-modal.component'
import { RechargeModal } from './recharge-form.component'

import { trpc } from '~/utils/trpc'

interface TabProps {
  label: string
  children: ReactElement
}

export const Header: React.FC = () => {
  const index = useId()
  const [showRechargeModal, setShowRechargeModal] = useState(false)
  const [balance, setBalance] = useState<any>()
  const [notificatedAmount] = useState<number>(0)
  const [selectedTab, setSelectedTab] = useState('Chính')
  const [isModalLoginVisible, setIsModalLoginVisible] = React.useState(false)

  const accessToken = localStorage.getItem('accessToken')
  const userInfo = localStorage.getItem('user')

  const { isAuthenticated, user, logout, login } = useAuth()

  trpc.useQuery(['identity.identityInfo'], {
    onSuccess(data) {
      login({ ...data.data })
    },
    onError() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refeshToken')
    },
    enabled: !isNil(accessToken) && !isNil(userInfo),
  })

  trpc.useQuery(['identity.account-balance'], {
    onSuccess(data) {
      setBalance(data.data.totalCoinsAvailable)
    },
    enabled: isAuthenticated,
  })

  const tabDatas: TabProps[] = [
    {
      label: `Chính`,
      children: <Notificate type={'main'} />,
    },
    {
      label: `Đơn`,
      children: <Notificate type={'order'} />,
    },
  ]

  const handleChangeTab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = (e.target as HTMLElement).dataset.tab
    if (typeof target !== 'string') {
      return
    }
    setSelectedTab(target)
  }

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return (
    <div className="fixed z-50 flex items-center justify-between w-full h-16 bg-umeHeader ">
      <LoginModal isModalLoginVisible={isModalLoginVisible} setIsModalLoginVisible={setIsModalLoginVisible} />
      <RechargeModal showRechargeModal={showRechargeModal} setShowRechargeModal={setShowRechargeModal} />
      <div className="flex items-center">
        <span className="pl-2">
          <Link href={'/home'}>
            <Image width={160} height={40} alt="logo-ume" src={logo} layout="fixed" />
          </Link>
        </span>
        <span className="px-3 py-2 text-lg font-medium text-white align-middle duration-500 hover:bg-slate-700 rounded-2xl hover:ease-in-out">
          <Link href={'/home'}>Trang chủ</Link>
        </span>
        <span className="px-3 py-2 text-lg font-medium text-white align-middle duration-500 hover:bg-slate-700 rounded-2xl hover:ease-in-out">
          <Link href={'/community'}>Cộng đồng</Link>
        </span>
        <span className="px-3 py-2 text-lg font-medium text-white align-middle duration-500 hover:bg-slate-700 rounded-2xl hover:ease-in-out">
          <Link href={'/'}>Hỗ trợ</Link>
        </span>
        <span className="px-3 py-2 text-lg font-medium text-white align-middle duration-500 hover:bg-slate-700 rounded-2xl hover:ease-in-out">
          <Link href={'/'}>FAQs</Link>
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-1 pr-2 duration-500 hover:ease-in-out">
          {isAuthenticated && (
            <span className="self-center my-auto mr-4 rounded-ful hover:scale-110 hover:ease-in-out">
              <button className="pt-2">
                <Gift size={22} strokeWidth={4} fill="#FFFFFF" />
              </button>
            </span>
          )}
          {isAuthenticated && (
            <button onClick={() => setShowRechargeModal(true)}>
              <div className="flex items-center justify-end rounded-full bg-[#37354F] pr-2 pl-4 mr-2 self-center text-white">
                <p className="text-lg font-semibold">{balance}</p>
                <Image src={coin} width={30} height={30} alt="coin" />
              </div>
            </button>
          )}

          {isAuthenticated && (
            <span className="my-auto mr-5 duration-300 rounded-full">
              <div className="relative pt-2">
                <Menu>
                  <div>
                    <Menu.Button>
                      {notificatedAmount > 0 ? (
                        <div>
                          <Remind theme="filled" size="22" fill="#FFFFFF" strokeLinejoin="bevel" />
                          <Dot
                            className="absolute top-0 right-0"
                            theme="filled"
                            size="18"
                            fill="#FF0000"
                            strokeLinejoin="bevel"
                          />
                        </div>
                      ) : (
                        <Remind size={22} strokeWidth={4} fill="#FFFFFF" />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-400"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-400"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 p-5 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-96 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="flex flex-row gap-10" style={{ zIndex: 2 }}>
                        {tabDatas.map((item) => (
                          <a
                            href="#tab"
                            className={`xl:text-lg text-md font-medium p-2 ${
                              item.label == selectedTab ? 'border-b-4 border-purple-700' : ''
                            }`}
                            key={index}
                            onClick={handleChangeTab}
                            data-tab={item.label}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                      <div className="p-3 overflow-auto h-96">
                        {tabDatas.map((item) => {
                          return (
                            <div key={index} hidden={selectedTab !== item.label}>
                              {item.children}
                            </div>
                          )
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </span>
          )}
          <span className="my-auto mr-5">
            {!isAuthenticated ? (
              <>
                <Button
                  name="register"
                  customCSS="bg-[#37354F] py-2 hover:bg-slate-500 duration-300 !rounded-3xl max-h-10 w-[120px] text-[15px] "
                  type="button"
                  onClick={() => {
                    setIsModalLoginVisible(true)
                  }}
                >
                  Đăng nhập
                </Button>
              </>
            ) : (
              <div className="mt-1 bg-[#292734]">
                <DropDownMenu user={user} handleLogout={handleLogout} />
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
