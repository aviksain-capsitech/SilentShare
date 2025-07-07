import { axiosInstance } from "../Helper/axiosInstance.ts";
import type { LoginType, SignUpType } from "../Types/User.ts";

export const SignUpApi = async (values: SignUpType) => {
    try {
        const res = await axiosInstance.post("/user/signup", values);
        if (res) return res.data;
    } catch (error) {
        console.log("SignUp Api Error :: ", error);
    }
}

export const LoginApi = async (values: LoginType) => {
    try {
        const res = await axiosInstance.post("/user/login", values);
        if (res) return res.data;
    } catch (error) {
        console.log("Login Api Error :: ", error);
    }
}

export const getUserApi = async () => {
    try {
        const res = await axiosInstance.get("/user/current-user");
        if (res) return res.data;
    } catch (error) {
        console.log("Get Current User Api Error :: ", error);
    }
}

export const LogoutApi = async () => {
    try {
        const res = await axiosInstance.post('/user/logout');
        if (res) return res.data;
    } catch (error) {
        console.log("Logout Api Error :: ", error);
    }
}