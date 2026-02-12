import type { Product } from "../features/products/types";

export function getStockStatus(product: Product):
   | {
        text: string;
        color: string;
     }
   | undefined {
   if (product.quantity === 0) {
      return {
         text: "Out of Stock",
         color: "red",
      };
   }
   if (product.minimumStockLevel && product.minimumStockLevel < product.quantity) {
      return {
         text: "In Stock",
         color: "green",
      };
   }
   if (product.minimumStockLevel && product.minimumStockLevel > product.price) {
      return {
         text: "Low Stock",
         color: "orange",
      };
   }
}
