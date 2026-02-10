import api from "../../services/api";
import type { Sale, SaleItem } from "./types";

export interface SalesResponse {
   success: boolean;
   sales: Sale[];
   salesCount?: number;
}

export interface SaleResponse {
   success: boolean;
   sale: Sale;
   message? : string
}

export interface MessageResponse {
   success: boolean;
   message: string;
}

export const salesApi = {
   createSale: async (saleData: Partial<Sale>): Promise<SaleResponse> => {
      const { data } = await api.post<SaleResponse>("/sales", saleData);
      return data;
   },
   getSales: async (): Promise<SalesResponse> => {
      const { data } = await api.get<SalesResponse>("/sales");
      return data;
   },
   getSale: async (id: string): Promise<SaleResponse> => {
      const { data } = await api.get<SaleResponse>(`/sales/${id}`);
      return data;
   },
};
