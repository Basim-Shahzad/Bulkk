
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

export interface InvoiceItem {
   name: string
   description: string;
   quantity: number;
   price: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  clientName: string | undefined;
  date: string;
  items: InvoiceItem[];
}
