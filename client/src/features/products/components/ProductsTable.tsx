import React, { useMemo, useState } from "react";
import { useProducts } from "../hooks";
import type { Product } from "../types";
import ProductCreateModal from "./ProductCreateModal";
import ProductDetailModal from "./ProductDetailModal";

const ProductsTable: React.FC = () => {
   const { data, error, isLoading } = useProducts();
   const [isProductClick, setIsProductClick] = useState<boolean>(false);
   const [clickedProductId, setClickedProductId] = useState<string>("");

   const selectedProduct = useMemo(() => {
      if (isProductClick && clickedProductId) {
         return data?.products.find((prod) => prod._id == clickedProductId);
      }
   }, [isProductClick, clickedProductId]);

   if (!data?.success || isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error.message}</div>;
   }


   return (
      <div className="flex justify-center items-center">
         <table className="sm:w-11/12 w-1/2 text-left overflow-x-scroll">
            <thead className="bg-blue-600 text-white text-xs uppercase">
               <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Price</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
               {data.products.map((prod) => (
                  <tr
                     key={prod._id}
                     onClick={() => {
                        setIsProductClick((state) => !state);
                        setClickedProductId(prod._id!);
                     }}
                     className="hover:bg-gray-50 transition-colors cursor-pointer">
                     <td className="px-3 py-2 font-medium text-gray-900">{prod.name}</td>
                     <td className="px-3 py-2 text-gray-600">{prod.category}</td>
                     <td className="px-3 py-2 text-gray-600">{prod.quantity} units</td>
                     <td className="px-3 py-2 text-gray-600">${prod.price}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         {isProductClick ? <ProductDetailModal product={selectedProduct!} closeModal={setIsProductClick} /> : ""}
      </div>
   );
};

export default ProductsTable;
