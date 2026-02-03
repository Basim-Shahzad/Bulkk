import React from "react";

interface ProductsFuntionsProps {
   openCreateModal : (value: boolean) => void;
}

const ProductsFuntions: React.FC<ProductsFuntionsProps> = ({ openCreateModal }) => {
   return (
      <div className="flex my-4 gap-4 mx-16" >
         <button onClick={() => openCreateModal(true)} className="bg-blue-600 flex items-center hover:bg-blue-700 px-4 py-1.5 text-sm text-white cursor-pointer rounded-lg transition-all duration-150">
            Create a Project
         </button>
      </div>
   );
};

export default ProductsFuntions;
