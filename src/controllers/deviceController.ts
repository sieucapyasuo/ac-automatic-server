import { Request, Response } from 'express'

import deviceService from '@/services/deviceService'

const getAllDevices = async (_: Request, res: Response) => {
  try {
    const deviceList = await deviceService.getDeviceList()
    res.json(deviceList)
  } catch (error) {
    res.status(500).send({ error: error })
  }
}

export default { getAllDevices }
