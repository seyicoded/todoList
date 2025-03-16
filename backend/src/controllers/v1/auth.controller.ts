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

export default class AuthController {
    public userModel: typeof db.users;

    constructor(){
        this.userModel = db.users;
    }

    public userExist = async (email: string)=>{
        const _user = await this.userModel.findOne({
            where: {
                email: (email || "").toLowerCase()
            }
        });
    
        if(_user){
            return {
                exist: true,
                user: _user
            }
        }else{
            return {
                exist: false
            }
        }
    }
    
    
    public requestEmailOtpController = async (request: Request, response: Response)=>{
        const {error, value} = Joi.object({
            email: Joi.string().email().required().label("Email"),
        }).validate(request.body)
    
        if(error){
            return WrapperResponse("error", {
                message: error.message,
                status: "failed"
            }, response)
        }
    
        // if( (await userExist(value.email)).exist ){
        if(false){
            // account already exist
            return WrapperResponse("error", {
                message: "Account already exist",
                status: "failed"
            }, response)
        }
    
        // generate otp and send
        const otp = await generateOtp(6);
        const mailHTML = generateOtpMailTemplate(otp);
    
        const resetPasswordToken = jwt.sign({
            time: moment().add(20, 'minutes'),
            email: value.email
        }, process.env.JWT_SECRET);
    
        await sendMail({
            subject: 'OviJoy Registration OTP',
            to: value.email,
            html: mailHTML,
        });
    
    
        return WrapperResponse("success", {
            message: "OTP SENT",
            status: "success",
            payload: {
                otp,
                resetPasswordToken
            }
        }, response)
    }
    
    requestPhoneOtpController = async (request: Request, response: Response)=>{
        const {error, value} = Joi.object({
            cc: Joi.string().required().label("Country Code"),
            phone: Joi.string().required().label("Phone Number"),
        }).validate(request.body)
    
        if(error){
            return WrapperResponse("error", {
                message: error.message,
                status: "failed"
            }, response)
        }
        
        // send otp to phone number then return data
        const otp = await generateOtp(6);
        const sent = await sendSMS({
            sms: generateSmsUseCase(otp),
            to: `${value.cc}${value.phone}`
        })
    
        if(!sent){
            return WrapperResponse("error", {
                message: "Termii rejected this sms",
                status: "failed",
                payload: {
                    otp
                }
            }, response)
        }
    
        const resetPasswordToken = jwt.sign({
            time: moment().add(20, 'minutes'),
            email: value.email
        }, process.env.JWT_SECRET);
    
        return WrapperResponse("success", {
            message: "OTP SENT",
            status: "success",
            payload: {
                otp,
                resetPasswordToken
            }
        }, response)
    }
    
    validateEmailController = async (request: Request, response: Response)=>{
        try{
            const { email, username } = request.params;
            
            // check if user exist
            let _user = await this.userModel.findOne({
                where: {
                    [Op.or]: [
                        { email: email }
                    ]
                }
            });
    
            let exist = false;
            let message = 'All Good';
    
            if(_user){
                message = "Email already exist";
                exist = true;
            }
    
            _user = await this.userModel.findOne({
                where: {
                    [Op.or]: [
                        { username: username }
                    ]
                }
            });
    
    
            if(_user){
                message = "Username already exist";
                exist = true;
            }
    
    
            return WrapperResponse("success", {
                message,
                status: "success",
                payload: {
                    exist,
                    email
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
    
    registerController = async (request: Request, response: Response)=>{
        const data: createUser = request.body;
        
        // validate 
        const {error, value} = Joi.object(createUserScheme).validate(data)
    
        if(error){
            return WrapperResponse("error", {
                message: error.message,
                status: "failed"
            }, response)
        }
    
        value.email = (value.email).toLowerCase();
    
        // check if user exist
        const user = await this.userModel.findOne({
            where: {
                [Op.or]: [
                    { email: value.email },
                ]
            }
        });
    
        if(user){
            return WrapperResponse("error", {
                message: "User already exist with same username/email",
                status: "failed"
            }, response)
        }
    
        const hashPassword = bcryptjs.hashSync(value.password, 8)
    
        const newUser = await this.userModel.create({
            email: value.email,
            password: hashPassword,
            first_name: value.first_name,
            last_name: value.last_name,
            username: value.email,
            role: USER_ROLE.USER,
            status: USER_STATUS.ACTIVE,
        })
    
    
    
        if(!newUser){
            return WrapperResponse("error", {
                message: "Error creating user",
                status: "failed"
            }, response)    
        }
    
        // get jwt token
        const jwtToken = jwt.sign({
            data: newUser
        }, process.env.JWT_SECRET);
    
        return WrapperResponse("success", {
            message: "User Created Successfully",
            status: "success",
            payload: {
                token: jwtToken,
                user: newUser
            },
        }, response)
    }
    
    loginController = async (request: Request, response: Response)=>{
        const data: loginUser = request.body;
        
        // validate 
        const {error, value} = Joi.object(loginUserScheme).validate(data)
    
        if(error){
            return WrapperResponse("error", {
                message: error.message,
                status: "failed"
            }, response)
        }
    
        // check if user exist
        const user = await this.userModel.findOne({
            where: {
                [Op.or]: [
                    { email: value.email },
                ]
            },
        });
    
        if(!user){
            return WrapperResponse("error", {
                message: "User doesn't exist",
                status: "failed"
            }, response)
        }
    
        // compare password
        if(!(bcryptjs.compareSync((value.password), user.password))){
            return WrapperResponse("error", {
                message: "password is incorrect",
                status: "failed"
            }, response)
        }
    
        // get jwt token
        const jwtToken = jwt.sign({
            data: user
        }, process.env.JWT_SECRET);
    
        return WrapperResponse("success", {
            message: "login successful",
            payload: {
                token: jwtToken,
                user
            },
            status: "success"
        }, response)
    }
    
    changePasswordController = async (request: Request, response: Response)=>{
        const data: changePassword = request.body;
        
        // validate 
        const {error, value} = Joi.object(changePasswordScheme).validate(data)
    
        if(error){
            return WrapperResponse("error", {
                message: error.message,
                status: "failed"
            }, response)
        }
    
        // validate token
        try{
            var decoded = jwt.verify(value.resetPasswordToken, process.env.JWT_SECRET);
            const timeToExpire = decoded.time;
            const decodedEmail = decoded.email;
    
            console.log(moment(timeToExpire).isBefore(moment( (new Date()).toISOString() )))
    
            if(moment(timeToExpire).isBefore(moment( (new Date()).toISOString() ))){
                // existed
                return WrapperResponse("error", {
                    message: "Token is Expired",
                    status: "failed"
                }, response)
            }
    
            if(decodedEmail != value.email){
                return WrapperResponse("error", {
                    message: "Token not for this user",
                    status: "failed"
                }, response)
            }
    
            // check if user exist and change password
            const user = await this.userModel.findOne({
                where: {
                    [Op.or]: [
                        { email: value.email },
                        { username: value.email },
                    ]
                }
            });
    
            if(!user){
                return WrapperResponse("error", {
                    message: "User doesn't exist",
                    status: "failed"
                }, response)
            }
    
            const hashPassword = bcryptjs.hashSync(value.password, 8)
    
            user.password = hashPassword;
    
            await user.save();
    
            return WrapperResponse("success", {
                message: "password changed successful",
                status: "success"
            }, response)
        }catch(e){
            return WrapperResponse("error", {
                message: "Token is Invalid",
                status: "failed"
            }, response)
        }
        
        
    }

}