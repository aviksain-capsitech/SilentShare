import { axiosInstance } from "../Helper/axiosInstance"
import type { FeedbackFormType } from "../Types/Feedback"

export const createFeedback = async (feedbackForm: FeedbackFormType) => {
    try {
        const res = await axiosInstance.post('/feedback/create', feedbackForm);
        return res?.data;
    } catch (error) {
        console.log("Create Feedback API error :: ", error);
        return error;
    }
}

export const getAllFeedbacks = async () => {
    try {
        const res = await axiosInstance.get('feedback/get-all');
        console.log("alksjdhfk;j :: ",res);
        return res?.data;
    }
    catch(error) {
        console.log(error);
        return error;
    }
}


