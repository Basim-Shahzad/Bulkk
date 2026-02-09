import React from "react";

interface CustomersFuntionsProps {
   openCreateModal : (value: boolean) => void;
}

const CustomerFuntions: React.FC<CustomersFuntionsProps> = ({ openCreateModal }) => {
   return (
      <div className="flex my-4 gap-4 mx-16" >
         <button onClick={() => openCreateModal(true)} className="bg-blue-600 flex items-center hover:bg-blue-700 px-4 py-1.5 text-sm text-white cursor-pointer rounded-lg transition-all duration-150">
            Add a Customer
         </button>
      </div>
   );
};

export default CustomerFuntions;
