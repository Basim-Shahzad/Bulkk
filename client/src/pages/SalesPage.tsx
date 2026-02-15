import { useState } from "react";
import SalesFuntions from "../features/sales/components/SalesFunctions";
import SalesCreateModal from "../features/sales/components/SalesCreateModal";
import SalesTable from "../features/sales/components/SalesTable";
import SalesStats from "../features/sales/components/SalesStats";

const SalesPage = () => {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

   return (
      <div>
         <SalesFuntions openCreateModal={setIsCreateModalOpen} />
         <SalesStats />
         <SalesTable />
         {isCreateModalOpen && <SalesCreateModal closeModal={setIsCreateModalOpen} />}
      </div>
   );
};

export default SalesPage;