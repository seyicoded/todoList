import express, { Router } from 'express'
import { authAdminMiddleWare, authMiddleWare } from '../../middleware/auth.middleware';
import AppController from '../../controllers/v1/app.controller';

// declare instance
const appController = new AppController();

const version = "/v1";

export const initAppRoutesV1 = (router: Router) =>{
    router.post(version+"/list/create", authMiddleWare, appController.createListController);
    router.post(version+"/list/edit/:id", authMiddleWare, appController.editListController);
    router.delete(version+"/list/action/:id", authMiddleWare, appController.deleteListController);

    return router;
}
