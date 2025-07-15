import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../Helper/axiosInstance";
import type { sendMessageType } from "../Types/Message";

// Queries
export const useGetMessageQuery = (queryParams: any) => {
  return useQuery({
    queryKey: ['get-message', queryParams],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey; 
      return await axiosInstance.get(`/message/get-all?${params.toString()}`);
    },
  });
}

// Mutations
export const useSendMessageMutation = () => {
  return useMutation({
    mutationFn: async ({
      username,
      content,
    }: sendMessageType) =>
      await axiosInstance.post(`/message/create/${username}`, {
        content,
      }),
  });
};

export const useDeleteMessageMutation = () => {
  return useMutation({
    mutationFn: async (id: { id: string }) =>
      await axiosInstance.delete(`/message/delete/${id}`),
  });
};
