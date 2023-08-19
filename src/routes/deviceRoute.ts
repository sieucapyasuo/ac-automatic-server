import express from 'express'

import deviceController from '@/controllers/deviceController'

const router = express.Router()

router.get('/', deviceController.getAllDevices)

router.get('/:id', deviceController.getSingleDevice)

router.get('/:id/stats', deviceController.getStats)

router.post('/:id/power', deviceController.powerDevice)

router.post('/:id/sendSignal', deviceController.sendSignal)

router.post('/', deviceController.linkNewDevice)

export default router
