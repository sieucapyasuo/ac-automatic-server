import LinkDeviceRequest from '@/models/requests/linkDeviceRequest'
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

const getSingleDevice = async (deviceId: string): Promise<IDevice | null> => {
  type Device = IDevice | null
  let device: Device = null
  try {
    device = await DeviceModel.findById(deviceId)
    if (device != null) {
      return device
    }
  } catch (error) {
    throw new Error(`Cannot find device with the id ${deviceId}`)
  }

  return device
}

const createNewDevice = async (newDevice: LinkDeviceRequest) => {
  try {
    const newDeviceModel = new DeviceModel(newDevice)
    await newDeviceModel.save()
  } catch (error) {
    throw new Error(`Cannot save new device`)
  }
}

export default {
  getDeviceList,
  getSingleDevice,
  createNewDevice
}
