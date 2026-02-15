import React, { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types";
import ProductDetailModal from "./ProductDetailModal";
import { useProductFilters } from "../hooks";

interface ProductGridProps {
   products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
   const { productsFilter, isInStock } = useProductFilters();
   const [isProductClick, setIsProductClick] = useState<boolean>(false);
   const [clickedProductId, setClickedProductId] = useState<string>("");

   const selectedProduct = useMemo(() => {
      if (isProductClick && clickedProductId) {
         return products.find((prod) => prod._id == clickedProductId);
      }
   }, [isProductClick, clickedProductId]);

   const filteredproducts = useMemo(() => {
      if (isInStock) {
         return products.filter((prod) => prod.quantity > prod.minimumStockLevel!);
      } else if (productsFilter) {
         return products.filter((prod) => prod.category === productsFilter.name);
      } else {
         return products;
      }
   }, [products, productsFilter, isInStock]);

   return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
         {filteredproducts.map((prod) => (
            <ProductCard product={prod} setClickedProductId={setClickedProductId} setIsProductClick={setIsProductClick} />
         ))}
         {isProductClick ? <ProductDetailModal product={selectedProduct!} closeModal={setIsProductClick} /> : ""}
      </div>
   );
};

export default ProductGrid;
