import { productApi } from "./api";
import { useAuth } from "../auth/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = () => {
   const { isAuthenticated } = useAuth();

   return useQuery({
      queryKey: ["products"],
      queryFn: productApi.getProducts,
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 5,
   });
};

export const useProduct = (id: string) => {
   const { isAuthenticated } = useAuth();

   return useQuery({
      queryKey: ["product", id],
      queryFn: () => productApi.getProduct(id),
      enabled: isAuthenticated && !!id,
      staleTime: 0,
   });
};

export const useCreateProduct = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: productApi.createProduct,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["products"] });
      },
   });
};

export const useDeleteProduct = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: productApi.deleteProduct,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["products"] });
      },
   });
};

export const useIncreaseStock = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, amount }: { id: string; amount: number }) =>
         productApi.increaseStock(id, amount),

      onSuccess: (_data, variables) => {
         queryClient.invalidateQueries({ queryKey: ["products"] });
         queryClient.invalidateQueries({
            queryKey: ["product", variables.id],
         });
      },
   });
};

export const useDecreaseStock = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, amount }: { id: string; amount: number }) =>
         productApi.decreaseStock(id, amount),

      onSuccess: (_data, variables) => {
         queryClient.invalidateQueries({ queryKey: ["products"] });
         queryClient.invalidateQueries({
            queryKey: ["product", variables.id],
         });
      },
   });
};
