import { axiosInstance } from "../Helper/axiosInstance"


export const sendMessageApi = async ({username,content}:{username:string;content:String;}) =>  {
    try {
        const res = await axiosInstance.post(`/message/create/${username}`, {content});
        return res.data;
    } catch (error: any) {
        console.log("Send Messages Api Error :: ", error);
        return error?.response?.data;
    }
}


export const deleteMessageApi = async (id:{id:string}) => {
    try {
        var messageId = id;
        const res = await axiosInstance.delete(`/message/delete/${messageId}`);
        if(res) return res.data;
    } catch (error) {
        console.log("Delete Messages Api Error :: ",error);
    }
}


export const getMessagesApi = async ({queryParams}: {queryParams: URLSearchParams}) => {
    try {
        const res = await axiosInstance.get(`/message/get-all?${queryParams.toString()}`);
        // console.log("Get Message Api :: ", res.data)
        if(res) return res?.data?.data;
    } catch (error) {
        console.log("Get Messages Api Error :: ", error);
    }
}