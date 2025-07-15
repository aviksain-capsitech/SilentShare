import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../Helper/axiosInstance.ts";
import type { LoginType, SignUpType } from "../Types/User.ts";

// Quries
export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => await axiosInstance.get("/user/current-user"),
  });
};

// Mutations
export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (values: SignUpType) => await axiosInstance.post("/user/signup", values),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (values: LoginType) => await axiosInstance.post("/user/login", values)
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => await axiosInstance.post("/user/logout")
  }); 
};

export const useToggleAcceptingMutation = () => {
  return useMutation({
    mutationFn: async () => await axiosInstance.put("/user/toggle-user")
  });
};



