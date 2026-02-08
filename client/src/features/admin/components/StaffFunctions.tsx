import React from "react";

interface StaffFuntionsProps {
   openCreateModal : (value: boolean) => void;
}

const StaffFuntions: React.FC<StaffFuntionsProps> = ({ openCreateModal }) => {
   return (
      <div className="my-4 mx-16" >
         <button onClick={() => openCreateModal(true)} className="bg-blue-600 flex items-center hover:bg-blue-700 px-4 py-1.5 text-sm text-white cursor-pointer rounded-lg transition-all duration-150">
            Create a Staff Member
         </button>
      </div>
   );
};

export default StaffFuntions;
