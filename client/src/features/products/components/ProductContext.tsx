import { useState } from "react";
import { createContext, type ReactNode } from "react";
import type { Category } from "../types";
import {
   FaLaptop,
   FaTshirt,
   FaHome,
   FaHeartbeat,
   FaFootballBall,
   FaUtensils,
   FaGamepad,
   FaClipboard,
   FaCar,
   FaPaw,
   FaBook,
   FaCode,
   FaTools,
} from "react-icons/fa";

type ProductContextType = {
   categories: Category[];
   productsFilter: Category | undefined;
   setProductsFilter: React.Dispatch<React.SetStateAction<Category | undefined>>;
   isInStock: boolean
   setIsInStock: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
   const [productsFilter, setProductsFilter] = useState<Category | undefined>(undefined);
   const [isInStock, setIsInStock] = useState<boolean>(true);

   const categories: Category[] = [
      { name: "Electronics", icon: FaLaptop },
      { name: "Clothing & Apparel", icon: FaTshirt },
      { name: "Home & Kitchen", icon: FaHome },
      { name: "Health & Beauty", icon: FaHeartbeat },
      { name: "Sports & Outdoors", icon: FaFootballBall },
      { name: "Food & Beverages", icon: FaUtensils },
      { name: "Toys & Games", icon: FaGamepad },
      { name: "Office Supplies", icon: FaClipboard },
      { name: "Automotive", icon: FaCar },
      { name: "Pet Supplies", icon: FaPaw },
      { name: "Books & Stationery", icon: FaBook },
      { name: "Software & Digital", icon: FaCode },
      { name: "Services & Repairs", icon: FaTools },
   ];

   return (
      <ProductContext.Provider value={{ categories, productsFilter, setProductsFilter, isInStock, setIsInStock }}>
         {children}
      </ProductContext.Provider>
   );
};
