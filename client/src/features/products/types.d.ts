export interface Product {
   _id?: string
   name: string;
   category: string;
   price: number;
   quantity: number;
   store: string;
   minimumStockLevel?: number;
   createdAt?: string
}

export type Category = {
   name: string;
   icon: IconType;
};
