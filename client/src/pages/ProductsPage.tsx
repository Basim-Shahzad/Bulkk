import React, { useState } from "react";
import type { Product } from "../features/products/types";
import ProductsTable from "../features/products/components/ProductsTable";
import ProductsFuntions from "../features/products/components/ProductsFuntions";
import ProductCreateModal from "../features/products/components/ProductCreateModal";
import { useCreateProduct } from "../features/products/hooks";

const ProductsPage = () => {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
   const { mutate: createProduct, isSuccess } = useCreateProduct()


   const handleCreateProduct = async (newProduct: Omit<Product, "_id">) => {
      try {
         createProduct(newProduct)
         if (isSuccess) setIsCreateModalOpen(false);
      } catch (error) {
         console.error("Failed to create product", error);
      }
   };

   return (
      <div>
         <ProductsFuntions openCreateModal={setIsCreateModalOpen} />
         <ProductsTable />

         {isCreateModalOpen && <ProductCreateModal closeModal={setIsCreateModalOpen} onCreate={handleCreateProduct} />}
      </div>
   );
};

export default ProductsPage;
