import { Request, Response } from 'express'

import LinkDeviceRequest from '@/models/requests/linkDeviceRequest'
import deviceService from '@/services/deviceService'

import isLinkRequestValid from '@/utils/validateLinkRequest'

const getAllDevices = async (_: Request, res: Response) => {
  try {
    const deviceList = await deviceService.getDeviceList()
    res.json(deviceList)
  } catch (error) {
    if (error instanceof Error) res.status(500).send({ error: error.message })
  }
}

const getSingleDevice = async (req: Request, res: Response) => {
  const deviceId: string = req.params.id

  try {
    const device = await deviceService.getSingleDevice(deviceId)
    res.json(device)
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ message: error.message })
  }
}

const linkNewDevice = async (req: Request, res: Response) => {
  try {
    const newDevice = <LinkDeviceRequest>req.body
    if (!isLinkRequestValid(newDevice)) throw Error('Missing field(s)')
    await deviceService.createNewDevice(newDevice)
    res.json({ message: 'Successfully linked new device' })
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ message: error.message })
  }
}

export default { getAllDevices, getSingleDevice, linkNewDevice }
