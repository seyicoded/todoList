import express, { Request, Response} from 'express';
import Joi from 'joi';
import db from '../../../models';
import { WrapperResponse } from '../../helper/wrapResponse';
import bcryptjs from 'bcryptjs'
import 'dotenv/config'
import { generateOtp } from '../../generic/functions';
import { sendMail } from '../../generic/sendMail';
import { generateOtpMailTemplate } from '../../templates/mails/otp';
import { generateSmsUseCase, sendSMS } from '../../generic/termii';
import {Model, Op, Sequelize} from 'sequelize'
import { USER_ROLE, USER_STATUS } from '../../config/constants/enum/auth';
import moment from 'moment'
import { changePassword, createUser, loginUser } from '../../../types/auth.types';
import { changePasswordScheme, createUserScheme, loginUserScheme } from '../../../dtos/auth.dto';

var jwt = require('jsonwebtoken');

export default class AppController {
    public userModel: typeof db.users;

    constructor(){
        this.userModel = db.users;
    }

    getListController = async (request: Request, response: Response)=>{
        const res = await db.lists.findAll({
            where: {
                // @ts-ignore
                userId: request?.user?.id
            }
        });
        return WrapperResponse("success", {
            message: "Successfully fetched",
            status: "success",
            payload: {
                res
            }
        }, response);
    }
    
    createListController = async (request: Request, response: Response)=>{
        try{
            const body = request?.body;

            const res = await db.lists.create({
                ...body,
                // @ts-ignore
                userId: request?.user?.id
            });
    
            return WrapperResponse("success", {
                message: "Successfully created",
                status: "success",
                payload: {
                    res
                }
            }, response)
        }
        catch(e){
            console.log(e)
            return WrapperResponse("error", {
                message: "Token is Invalid",
                status: "failed"
            }, response)
        }
    }

    editListController = async (request: Request, response: Response)=>{
        try{
            const body = request?.body;
            const {id} = request?.params;

            const res = await db.lists.update(body, {
                where: {
                    id
                }
            });
    
            return WrapperResponse("success", {
                message: "Successfully updated",
                status: "success",
                payload: {
                    res
                }
            }, response)
        }
        catch(e){
            console.log(e)
            return WrapperResponse("error", {
                message: "An error occurred",
                status: "failed"
            }, response)
        }
    }

    deleteListController = async (request: Request, response: Response)=>{
        try{
            const {id} = request?.params;

            const res = await db.lists.destroy({
                where: {
                    id
                }
            });
    
            return WrapperResponse("success", {
                message: "Successfully deleted",
                status: "success",
                payload: {
                    res
                }
            }, response)
        }
        catch(e){
            console.log(e)
            return WrapperResponse("error", {
                message: "An error occurred",
                status: "failed"
            }, response)
        }
    }
    
}