import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../Helper/axiosInstance";
import type { FeedbackFormType } from "../Types/Feedback";


export const useCreateFeedbackMutation = () => {
  return useMutation({
    mutationFn: async (feedbackForm: FeedbackFormType) => await axiosInstance.post("/feedback/create", feedbackForm)
  });
}

export const useGetAllFeedbacksQuery = (showPreviousFeedbacks: boolean) => {
  return useQuery({
    queryKey: ["getAllFeedbacks", showPreviousFeedbacks],
    queryFn: async () => {
      const res = await axiosInstance.get("feedback/get-all");
      return res?.data.data;
    }
  });
}


