import express from 'express'

import deviceController from '@/controllers/deviceController'

const router = express.Router()

router.get('/', deviceController.getAllDevices)

export default router
