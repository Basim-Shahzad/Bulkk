import api from "../../services/api";
import type { Customer } from "./types";

export interface CustomersResponse {
   success: boolean;
   customers: Customer[];
   customersCount?: number;
}

export interface CustomerResponse {
   success: boolean;
   customer: Customer;
}

export interface MessageResponse {
   success: boolean;
   message: string;
}

export const customerApi = {
   getCustomers: async (): Promise<CustomersResponse> => {
      const { data } = await api.get<CustomersResponse>("/customers");
      return data;
   },

   createCustomer: async (customerData: Customer): Promise<CustomerResponse> => {
      const { data } = await api.post<CustomerResponse>("/customers", customerData);
      return data;
   },

   getCustomer: async (id: string): Promise<CustomerResponse> => {
      const { data } = await api.get<CustomerResponse>(`/customers/${id}`);
      return data;
   },

   deleteCustomer: async (id: string): Promise<MessageResponse> => {
      const { data } = await api.delete<MessageResponse>(`/customers/${id}`);
      return data;
   },
};
