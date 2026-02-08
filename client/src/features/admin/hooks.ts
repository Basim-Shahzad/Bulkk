import { staffApi } from "./api";
import { useAuth } from "../auth/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStaff = () => {
   const { isAuthenticated } = useAuth();

   return useQuery({
      queryKey: ["staff"],
      queryFn: staffApi.getStaff,
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 5,
   });
};

export const useCreateStaff = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: staffApi.createStaff,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["staff"] });
      },
   });
};
