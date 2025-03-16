import Joi from "joi"

export const createUserScheme = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    f_name: Joi.string().required().label("first name"),
    l_name: Joi.string().required().label("last name"),
    // phone: Joi.string().required().label("phone"),
    // dob: Joi.string().required().label("dob"),
    // gender: Joi.string().required().label("gender"),
    // country: Joi.string().optional().label("country"),
    // refer_by_username: Joi.string().optional().label("refer_by_username"),
}

export const loginUserScheme = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
}

export const changePasswordScheme = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    resetPasswordToken: Joi.string().required().label("Token"),
}