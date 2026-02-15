import React from "react";

interface StaffFuntionsProps {
   openCreateModal : (value: boolean) => void;
}

const StaffFuntions: React.FC<StaffFuntionsProps> = ({ openCreateModal }) => {
   return (
      <div className="flex my-4 gap-4 mx-4 lg:mx-8 justify-between items-center">
         <div className="text-xl lg:text-4xl font- text-black/80">Staff Overview</div>
         <div>
            <button
               onClick={() => openCreateModal(true)}
               className="bg-blue-600 flex items-center hover:bg-blue-700 px-4 py-1.5 text-white cursor-pointer rounded-lg transition-all duration-150">
               Add a Staff Member
            </button>
         </div>
      </div>
   );
};

export default StaffFuntions;
