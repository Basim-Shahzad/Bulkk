import { useState } from "react";
import type { Customer } from "../features/customers/types";
import CustomersTable from "../features/customers/components/CustomersTable";
import CustomerFuntions from "../features/customers/components/CustomerFunctions";
import CustomerCreateModal from "../features/customers/components/CustomerCreateModal";
import { useCreateCustomer } from "../features/customers/hooks";

const CustomersPage = () => {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
   const { mutate: createProduct, isSuccess } = useCreateCustomer();

   const handleCreateProduct = async (newCustomer: Omit<Customer, "_id">) => {
      try {
         createProduct(newCustomer);
         if (isSuccess) setIsCreateModalOpen(false);
      } catch (error) {
         console.error("Failed to create product", error);
      }
   };

   return (
      <div>
         <CustomerFuntions openCreateModal={setIsCreateModalOpen} />
         <CustomersTable />

         {isCreateModalOpen && <CustomerCreateModal closeModal={setIsCreateModalOpen} onCreate={handleCreateProduct} />}
      </div>
   );
};

export default CustomersPage;
