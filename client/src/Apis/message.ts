import { axiosInstance } from "../Helper/axiosInstance"

export const sendMessageApi = async ({username,content}:{username:string;content:String;}) =>  {
    try {
        const res = await axiosInstance.post(`/message/create/${username}`, {content});
        return res.data;
    } catch (error) {
        
    }
}

export const getMessagesApi = async () => {
    try {
        const res = await axiosInstance.get('/message/get-all');
        if(res) return res.data;
    } catch (error) {
        console.log("Get Messages Api Error :: ", error);
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
