import api from "../../services/api";
import type { Product } from "./types";

export interface ProductsResponse {
   success: boolean;
   products: Product[];
   productsCount?: number;
}

export interface ProductResponse {
   success: boolean;
   product: Product;
}

export interface MessageResponse {
   success: boolean;
   message: string;
}

export const productApi = {
   getProducts: async (): Promise<ProductsResponse> => {
      const { data } = await api.get<ProductsResponse>("/products");
      return data;
   },

   createProduct: async (productData: Product): Promise<ProductResponse> => {
      const { data } = await api.post<ProductResponse>("/products", productData);
      return data;
   },

   getProduct: async (id: string): Promise<ProductResponse> => {
      const { data } = await api.get<ProductResponse>(`/products/${id}`);
      return data;
   },

   deleteProduct: async (id: string): Promise<MessageResponse> => {
      const { data } = await api.delete<MessageResponse>(`/products/${id}`);
      return data;
   },

   updateProduct: async (id: string, productData: Partial<Product>): Promise<ProductResponse> => {
      const { data } = await api.patch<ProductResponse>(`/products/${id}`, productData);
      return data;
   },

   increaseStock: async (id: string, amount: number): Promise<ProductResponse> => {
      const { data } = await api.patch<ProductResponse>(`/products/${id}/stock-in`, { increaseAmount: amount });
      return data;
   },

   decreaseStock: async (id: string, amount: number): Promise<ProductResponse> => {
      const { data } = await api.patch<ProductResponse>(`/products/${id}/stock-out`, { decreaseAmount: amount });
      return data;
   },
};
