import express from 'express'
import { authAdminMiddleWare, authMiddleWare } from '../middleware/auth.middleware';
import { initAuthRoutesV1 } from './v1/auth.route';
import { initAppRoutesV1 } from './v1/app.route';


let router = express.Router()

// guest route
router = initAuthRoutesV1(router)
router = initAppRoutesV1(router)

// user route

// admin route

export default router;