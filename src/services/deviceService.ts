import DeviceModel, { IDevice } from '@/models/deviceModel'

type DeviceList = IDevice[]

const getDeviceList = async (): Promise<DeviceList> => {
  let deviceList: DeviceList = []

  try {
    deviceList = await DeviceModel.find()
  } catch (error) {
    throw new Error('Failed to get device list')
  }

  return deviceList
}

export default {
  getDeviceList
}
