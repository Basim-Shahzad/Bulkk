import { customerApi } from "./api";
import { useAuth } from "../auth/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCustomers = () => {
   const { isAuthenticated } = useAuth();

   return useQuery({
      queryKey: ["customers"],
      queryFn: customerApi.getCustomers,
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 5,
   });
};

export const useCustomer = (id: string) => {
   const { isAuthenticated } = useAuth();

   return useQuery({
      queryKey: ["customer", id],
      queryFn: () => customerApi.getCustomer(id),
      enabled: isAuthenticated && !!id,
      staleTime: 0,
   });
};

export const useCreateCustomer = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: customerApi.createCustomer,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["customers"] });
      },
   });
};

export const useDeleteCustomer = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: customerApi.deleteCustomer,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["customers"] });
      },
   });
};