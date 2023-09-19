import { TRPCError } from '@trpc/server'
import { getEnv } from '~/env'

import { parse } from 'cookie'
import {
  BookingApi,
  BookingProviderRequest,
  FeedbackBookingRequest,
  ImageApi,
  NoticeApi,
  ProviderApi,
  ProviderSkillApi,
  SkillApi,
} from 'ume-service-openapi'
import { optional } from 'zod'

import { getTRPCErrorTypeFromErrorStatus } from '~/utils/errors'

export const getListSkill = async () => {
  try {
    const response = await new SkillApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
    }).findAndCountAll('unlimited', '1', '["$all"]')

    return {
      data: response.data,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.response?.status) || 500,
      message: error.message || 'Failed to get list skill',
    })
  }
}

export const getProviders = async (query?: {
  startCost?: number
  endCost?: number
  skillId?: string
  name?: string
  gender?: string
  limit?: string
  page?: string
  order?: string
}) => {
  try {
    const response = await new ProviderApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
    }).getListProvider(
      query?.startCost,
      query?.endCost,
      query?.skillId,
      query?.name,
      query?.gender as 'MALE' | 'FEMALE' | 'ORTHER' | 'PRIVATE',
      query?.limit,
      query?.page,
      query?.order,
    )
    return {
      data: response.data,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.response?.status) || 500,
      message: error.message || 'Failed to get list provider',
    })
  }
}

export const getHotProviders = async () => {
  try {
    const response = await new ProviderApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
    }).getListHotProvider(7, '8', '1')
    return {
      data: response.data,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.response?.status) || 500,
      message: error.message || 'Failed to get list hot provider',
    })
  }
}

export const getProviderBySlug = async (providerId: string) => {
  try {
    const respone = await new ProviderApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
    }).getProviderBySlug(providerId)
    return {
      data: respone.data,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status) || 500,
      message: error.message || 'Fail to get list skill',
    })
  }
}

export const getCurrentBookingForProvider = async (ctx) => {
  try {
    const cookies = parse(ctx.req.headers.cookie)
    const respone = await new BookingApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
      accessToken: cookies['accessToken'],
    }).getCurrentBookingForProvider()
    return {
      data: respone.data,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status),
      message: error.message || 'Fail to create new booking',
    })
  }
}

export const createBooking = async (provider: BookingProviderRequest, ctx) => {
  try {
    const cookies = parse(ctx.req.headers.cookie)
    const respone = await new BookingApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
      accessToken: cookies['accessToken'],
    }).createBooking(provider)
    return {
      data: respone.data,
      success: true,
      message: 'Booking success!',
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status),
      message: error.message || 'Fail to create new booking',
    })
  }
}

export const putProviderResponeBooking = async ({ bookingHistoryId, status }, ctx) => {
  try {
    const cookies = parse(ctx.req.headers.cookie)
    const respone = await new BookingApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
      accessToken: cookies['accessToken'],
    }).bookingHandle({
      bookingHistoryId: bookingHistoryId,
      status: status,
    })
    return {
      data: respone.data,
      success: true,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status),
      message: error.message || 'Fail to create new booking',
    })
  }
}

export const getFeedbackSkillById = async (feedbackSkillId) => {
  try {
    const respone = await new ProviderSkillApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
    }).getFeedbackByProviderSkill(feedbackSkillId, '1', '1', '["$all"]')
    return {
      data: respone.data,
      success: true,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status),
      message: error.message || 'Fail to create new booking',
    })
  }
}

export const getNoticeAmount = async (ctx) => {
  try {
    const cookies = parse(ctx.req.headers.cookie)
    const respone = await new NoticeApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
      accessToken: cookies['accessToken'],
    }).amountNewNotice()
    return {
      data: respone.data,
      success: true,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status),
      message: error.message || 'Fail to get notice amount',
    })
  }
}

export const getAllNotice = async (query: { page: string; limit: string }, ctx) => {
  try {
    const cookies = parse(ctx.req.headers.cookie)
    const respone = await new NoticeApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
      accessToken: cookies['accessToken'],
    }).getNotice(query.limit, query.page, '["$all"]')
    return {
      data: respone.data,
      success: true,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status),
      message: error.message || 'Fail to create get all notification',
    })
  }
}

export const getAblumByProviderSlug = async (query: { slug: string; page?: string; limit?: string }, ctx) => {
  try {
    const cookies = parse(ctx.req.headers.cookie)
    const respone = await new ProviderApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
      accessToken: cookies['accessToken'],
    }).getAlbumByProviderSlug(query.slug, query.limit, query.page)
    return {
      data: respone.data,
      success: true,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status),
      message: error.message || 'Fail to create get album',
    })
  }
}

export const postFeedback = async (
  query: { id: string; feedback?: { content?: string; amountStar?: number } },
  ctx,
) => {
  try {
    const cookies = parse(ctx.req.headers.cookie)
    const respone = await new BookingApi({
      basePath: getEnv().baseUmeServiceURL,
      isJsonMime: () => true,
      accessToken: cookies['accessToken'],
    }).createFeedbackBooking(query.id, query.feedback as any)
    return {
      data: respone.data,
      success: true,
    }
  } catch (error) {
    throw new TRPCError({
      code: getTRPCErrorTypeFromErrorStatus(error.respone?.status),
      message: error.message || 'Fail to create get album',
    })
  }
}
