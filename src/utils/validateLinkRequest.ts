import { MODE } from '@/constants/enum'
import LinkDeviceRequest from '@/models/requests/linkDeviceRequest'

const isLinkRequestValid = (request: LinkDeviceRequest): boolean => {
  if (request.name == undefined) return false
  if (request.brand == undefined) return false
  if (request.userId == undefined) return false

  if (request.profile != undefined) {
    for (const mode of Object.values(MODE)) {
      if (request.profile[mode] != undefined) {
        if (request.profile[mode].fan == undefined) return false
        if (request.profile[mode].temp == undefined) return false
      } else return false
    }
  } else return false

  return true
}

export default isLinkRequestValid
