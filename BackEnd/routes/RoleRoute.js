import express from 'express'

import RoleController from '../controllers/RoleController.js'

const router = express.Router()

router.get('/getRoles', RoleController.getRole)

router.post('/rolePost', RoleController.PostRole)

export default router;
