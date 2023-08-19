import axios, { AxiosError } from 'axios'

import { espApiUrl } from '@/constants/espApiUrl'

import LinkDeviceRequest from '@/models/requests/linkDeviceRequest'
import DeviceModel, { IDevice } from '@/models/deviceModel'
import SetDeviceRequest from '@/models/requests/setDeviceRequest'
import SendSignalRequest from '@/models/requests/sendSignalRequest'

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

const sendSignal = async (sendSignalRequest: SendSignalRequest) => {
  try {
    type Device = IDevice | null

    const device: Device = await DeviceModel.findById(sendSignalRequest.deviceId)

    if (device != null) {
      device.currentProfile = sendSignalRequest.profile
      device.temp = sendSignalRequest.temp
      device.fan = sendSignalRequest.fan
      device.status = sendSignalRequest.status

      device.save()
    }

    await axios.post(`${espApiUrl}/sendsignal`, sendSignalRequest)
  } catch (error) {
    if (error instanceof AxiosError) throw new Error('Cannot send signal !')
    if (error instanceof Error) throw new Error('Cannot find device !')
  }
}

const setDevice = async (setDeviceRequest: SetDeviceRequest) => {
  try {
    await axios.post(`${espApiUrl}/set`, setDeviceRequest)
  } catch (error) {
    throw new Error('Cannot set device !')
  }
}

export default {
  getDeviceList,
  getSingleDevice,
  createNewDevice,
  setDevice,
  sendSignal
}
