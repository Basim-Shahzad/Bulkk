import { salesApi } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/hooks";

export const useSales = () => {
   const { isAuthenticated } = useAuth();

   return useQuery({
      queryKey: ["sales"],
      queryFn: salesApi.getSales,
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 5,
   });
};

export const useCreateSale = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: salesApi.createSale,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["products"] });
         queryClient.invalidateQueries({ queryKey: ["sales"] });
      },
   });
};

export const useSale = (id: string) => {
   const { isAuthenticated } = useAuth();

   return useQuery({
      queryKey: ["sale", id],
      queryFn: () => salesApi.getSale(id),
      enabled: isAuthenticated && !!id,
      staleTime: 0,
   });
};