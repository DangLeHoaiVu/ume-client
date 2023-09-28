import { authRouter } from './auth'
import { createRouter } from './configurations'
import { identityRouter } from './identity'
import { providerRouter } from './provider'
import { userRouter } from './user'
import { voucherRouter } from './voucher'

export const rootRouter = createRouter()
  .merge('auth.', authRouter)
  .merge('identity.', identityRouter)
  .merge('user.', userRouter)
  .merge('provider.', providerRouter)
  .merge('voucher.', voucherRouter)
export type RootRouterTypes = typeof rootRouter
