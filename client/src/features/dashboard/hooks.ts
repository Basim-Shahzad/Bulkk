import { dashboardApi } from "./api";
import { useAuth } from "../auth/hooks";
import { useQuery } from "@tanstack/react-query";

export const useSalesReport = (timeInterval: "monthly" | "yearly" = "monthly") => {
   const { isAuthenticated } = useAuth();

   return useQuery({
      queryKey: ["salesReport", timeInterval], 
      queryFn: () => dashboardApi.getSalesReport(timeInterval),
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 5,
   });
};