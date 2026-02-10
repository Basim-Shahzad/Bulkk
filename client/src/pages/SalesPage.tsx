import React, { useState } from "react";
import type { Sale } from "../features/sales/types";
import { useCreateSale } from "../features/sales/hooks";
import SalesFuntions from "../features/sales/components/SalesFunctions";
import SalesCreateModal from "../features/sales/components/SalesCreateModal";
import SalesTable from "../features/sales/components/SalesTable";

const SalesPage = () => {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);


   return (
      <div>
         <SalesFuntions openCreateModal={setIsCreateModalOpen} />
         <SalesTable />

         

         {isCreateModalOpen && <SalesCreateModal closeModal={setIsCreateModalOpen} />}
      </div>
   );
};

export default SalesPage;
