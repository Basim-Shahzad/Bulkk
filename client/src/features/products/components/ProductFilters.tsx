import React, { useMemo } from "react";
import { useProductFilters } from "../hooks";
import { MdOutlineInventory2 } from "react-icons/md";
import type { Product, Category } from "../types";

interface ProductFiltersProps {
   products: Product[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ products }) => {
   const { categories, productsFilter, setProductsFilter, isInStock, setIsInStock } = useProductFilters();

   const handleToggle = () => {
      setIsInStock((prev) => !prev);
   };

   const categoriesUsed: Category[] = useMemo(() => {
      const productCategoryNames = new Set(products.map((product) => product.category));

      return categories.filter((category) => productCategoryNames.has(category.name));
   }, [categories, products]);

   const handleCategoryClick = (category: Category) => {
      setProductsFilter(productsFilter?.name === category.name ? undefined : category);
   };

   return (
      <div className="w-full flex flex-col">

         <div className="space-y-3">
            {categoriesUsed.map((category) => (
               <div
                  key={category.name}
                  className={`flex w-full items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                     productsFilter?.name === category.name
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                  onClick={() => handleCategoryClick(category)}>
                  <category.icon className="w-5 h-5 text-gray-700" />
                  <span className="flex-1 text-sm font-medium">{category.name}</span>
                  {productsFilter?.name === category.name && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
               </div>
            ))}
         </div>

         <div className="mt-6 pt-4 border-t border-gray-100">
            <div
               className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border-2 border-transparent cursor-pointer transition-colors"
               onClick={handleToggle}>
               <div className="flex items-center gap-3">
                  <MdOutlineInventory2 className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">In Stock Only</span>
               </div>

               <button
                  type="button"
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                     isInStock ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-pressed={isInStock}>
                  <span
                     className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        isInStock ? "translate-x-5" : "translate-x-1"
                     }`}
                  />
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProductFilters;
