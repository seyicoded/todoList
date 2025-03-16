import express from 'express'
import { authAdminMiddleWare, authMiddleWare } from '../middleware/auth.middleware';
import { initAuthRoutesV1 } from './v1/auth.route';


let router = express.Router()

// guest route
router = initAuthRoutesV1(router)

// user route

// admin route

export default router;