export type createUser = {
    email: string;
    username: string;
    phone: string;
    dob: string;
    gender: string;
    password: string;
    refer_by_username?: string;
}

export type loginUser = {
    email: string;
    password: string;
}

export type changePassword = {
    email: string;
    password: string;
    resetPasswordToken: string;
}