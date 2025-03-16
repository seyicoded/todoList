const app_token = btoa("app_token");
const app_profile = btoa("app_profile");

export const getAuthToken = ()=>{
    return localStorage.getItem(app_token);
}

export const setAuthToken = (data: object)=>{
    return localStorage.setItem(app_token, JSON.stringify(data));
}

export const getAppProfile = ()=>{
    const __ = localStorage.getItem(app_profile);
    if(!__){
        return null;
    }
    return JSON.parse(__);
}

export const setAppProfile = (data: object)=>{
    return localStorage.setItem(app_profile, JSON.stringify(data));
}