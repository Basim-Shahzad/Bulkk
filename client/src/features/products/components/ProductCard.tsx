import React from "react";
import { useProductFilters } from "../hooks";
import type { Product } from "../types";

interface ProductCardProps {
   product: Product;
   setIsProductClick: React.Dispatch<React.SetStateAction<boolean>>;
   setClickedProductId: React.Dispatch<React.SetStateAction<string>>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, setClickedProductId, setIsProductClick }) => {
   const { categories } = useProductFilters();

   const categoryData = categories.find((cat) => cat.name === product.category);
   const CategoryIcon = categoryData?.icon;

   const isLowStock = product.quantity <= (product.minimumStockLevel || 100);

   return (
      <div
         className="relative w-full max-w-sm p-5 cursor-pointer hover:bg-black/5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
         onClick={() => {
            setIsProductClick((state) => !state);
            setClickedProductId(product._id!);
         }}>
         <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-gray-500">
               {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
               <span className="text-sm font-medium">{product.category}</span>
            </div>
         </div>

         {isLowStock ? (
            <div className="absolute right-4 top-1/2 -translate-y-4">
               <span className="px-3 py-1 text-sm font-semibold text-orange-800 bg-orange-100 rounded-full">
                  Low Stock
               </span>
            </div>
         ) : (
            <div className="absolute right-4 top-1/2 -translate-y-4">
               <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                  In Stock
               </span>
            </div>
         )}

         <div className="flex justify-between items-end">
            <div className="flex flex-col">
               <span className="text-xs font-medium text-gray-500 mb-1">Qty</span>
               <span className="text-lg font-semibold text-gray-900">{product.quantity} units</span>
            </div>

            <div className="flex flex-col items-end">
               <span className="text-xs font-medium text-gray-500 mb-1">Price</span>
               <span className="text-2xl font-black text-gray-900">${product.price}</span>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
