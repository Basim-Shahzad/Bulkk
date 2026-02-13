import React from "react";
import StaffTable from "../features/admin/components/StaffTable";
import StaffFuntions from "../features/admin/components/StaffFunctions";
import { useCreateStaff } from "../features/admin/hooks";
import StaffCreateModal from "../features/admin/components/StaffCreateModal";

const AdminPage = () => {
   const [isCreateModalOpen, setIsCreateModalOpen] = React.useState<boolean>(false);
   const { mutate: createStaff, isSuccess } = useCreateStaff();

   const handleCreateStaff = async (newStaffMember: any) => { // temp any change it later
      try {
         createStaff(newStaffMember);
         if (isSuccess) setIsCreateModalOpen(false);
      } catch (error) {
         console.error("Failed to create product", error);
      }
   };

   return (
      <div className="flex" >
         <div className="flex flex-col items-center justify-center" >
            <StaffTable />
            <StaffFuntions openCreateModal={setIsCreateModalOpen} />
         </div>

         {isCreateModalOpen && <StaffCreateModal closeModal={setIsCreateModalOpen} onCreate={handleCreateStaff} />}
      </div>
   );
};

export default AdminPage;
