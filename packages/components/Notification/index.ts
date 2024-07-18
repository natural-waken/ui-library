import Notification from "./methods";
import { withInstallFunction } from '@ui-library/utils'

export const LiNotification = withInstallFunction(Notification, '$notify')

export * from './types'