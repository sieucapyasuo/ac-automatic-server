import express from 'express'

import deviceController from '@/controllers/deviceController'

const router = express.Router()

router.get('/', deviceController.getAllDevices)

router.get('/:id', deviceController.getSingleDevice)

router.post('/', deviceController.linkNewDevice)

export default router
