
export interface SaleItem {
   product: string;
   quantity: number;
   unitPrice: number;
}

export interface Sale {
   _id?: string;
   store: string;
   customer?: string;
   items: SaleItem[];
   totalAmount: number;
   soldBy: string;
   createdAt?: string
}
