import { useState } from "react";
import type { Product } from "../features/products/types";
import ProductsFuntions from "../features/products/components/ProductsFuntions";
import ProductCreateModal from "../features/products/components/ProductCreateModal";
import { useCreateProduct } from "../features/products/hooks";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductGrid from "../features/products/components/ProductGrid";
import { useProducts } from "../features/products/hooks";

const ProductsPage = () => {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
   const { mutate: createProduct, isSuccess } = useCreateProduct();
   const { data, error, isLoading } = useProducts();

   if (!data?.success || isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error.message}</div>;
   }

   const handleCreateProduct = async (newProduct: Omit<Product, "_id">) => {
      try {
         createProduct(newProduct);
         if (isSuccess) setIsCreateModalOpen(false);
      } catch (error) {
         console.error("Failed to create product", error);
      }
   };

   return (
      <div className="">
         <ProductsFuntions openCreateModal={setIsCreateModalOpen} />

         <div className="grid lg:grid-cols-8 mx-4 lg:mx-16">
            <div className="lg:col-start-1 lg:col-end-3 mx-4 mt-4">
               <ProductFilters products={data.products} />
            </div>
            <div className="lg:col-start-3 lg:col-end-9">
               <ProductGrid products={data.products} />
            </div>
         </div>

         {isCreateModalOpen && <ProductCreateModal closeModal={setIsCreateModalOpen} onCreate={handleCreateProduct} />}
      </div>
   );
};

export default ProductsPage;
