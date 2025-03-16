import express, { Router } from 'express'
import { authAdminMiddleWare, authMiddleWare } from '../../middleware/auth.middleware';
import AuthController from '../../controllers/v1/auth.controller';

// declare instance
const authController = new AuthController();

const version = "/v1";

export const initAuthRoutesV1 = (router: Router) =>{
    router.post(version+"/otp/email", authController.requestEmailOtpController);
    router.post(version+"/otp/phone", authController.requestPhoneOtpController);
    
    // **** auth
    router.get(version+"/register/:email/:username", authController.validateEmailController)
    router.post(version+"/register", authController.registerController)
    router.post(version+"/login", authController.loginController)
    router.post(version+"/change-password", authController.changePasswordController)

    return router;
}
