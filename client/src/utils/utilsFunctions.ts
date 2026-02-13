import type { Product } from "../features/products/types";

interface StockStatus {
   text: string;
   className: string;
}

export function getStockStatus(product: Product): StockStatus {
   if (product.quantity <= 0) {
      return {
         text: "Out of Stock",
         className: "text-red-600 bg-red-100",
      };
   }

   if (product.minimumStockLevel && product.quantity <= product.minimumStockLevel) {
      return {
         text: "Low Stock",
         className: "text-orange-600 bg-orange-100",
      };
   }
   
   return {
      text: "In Stock",
      className: "text-green-600 bg-green-100",
   };
}
