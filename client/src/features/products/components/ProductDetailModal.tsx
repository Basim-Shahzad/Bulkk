import React, { useState } from "react";
import type { Product } from "../types";
import { CgClose, CgMathMinus, CgMathPlus } from "react-icons/cg";
import { useDeleteProduct, useProductUpdate } from "../hooks";

interface ProductDetailModalProps {
   product: Product;
   closeModal: (value: boolean) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, closeModal }) => {
   const [customAmount, setCustomAmount] = useState<number>(0);
   const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
   const { mutate: updateProduct, isPending: isUpdating } = useProductUpdate();
   const [currentStock, setCurrentStock] = useState<number>(product.quantity);

   const handleStockAdjust = (amount: number) => {
      setCurrentStock((state) => state + amount);
   };

   const handleDeleteProduct = () => {
      let result = confirm("Are you sure you want to delete this product?");

      if (result) {
         deleteProduct(product._id!);
         closeModal(false);
      }
   };

   const handleCloseModal = () => {
      if (currentStock != product.quantity) {
         let result = confirm("Are you sure you want to discard the changes to the stock?");
         if (result) closeModal(false);
      } else {
         closeModal(false);
      }
   };

   const handleUpdatingStock = () => {
      updateProduct({
         id: product._id!,
         productData: {
            quantity: currentStock,
         },
      });
      closeModal(false)
   };

   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-center items-center p-4">
         <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
               <div>
                  <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                  <h2 className="text-xs font-extrabold text-gray-500">Click DONE to save changes</h2>
                  {/* add some thing here later  */}
               </div>
               <button
                  onClick={() => handleCloseModal()}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer ">
                  <CgClose className="text-2xl text-gray-600" />
               </button>
            </div>

            <div className="p-6 space-y-6">
               <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                  <span className="text-gray-600 font-medium">Current Quantity:</span>
                  <span className="text-2xl font-mono font-bold text-blue-600">{currentStock}</span>
               </div>

               <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                     Quick Adjust Stock
                  </label>

                  {[1, 10, 100].map((val) => (
                     <div key={val} className="flex gap-2">
                        <button
                           onClick={() => handleStockAdjust(-val)}
                           className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium">
                           <CgMathMinus /> {val}
                        </button>
                        <button
                           onClick={() => handleStockAdjust(val)}
                           className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors font-medium">
                           <CgMathPlus /> {val}
                        </button>
                     </div>
                  ))}

                  <div className="pt-4 border-t">
                     <label className="text-sm font-semibold text-gray-700">Custom Amount</label>
                     <div className="flex gap-2 mt-2">
                        <input
                           type="number"
                           value={customAmount}
                           onChange={(e) => setCustomAmount(Number(e.target.value))}
                           className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                           placeholder="Enter amount..."
                        />
                        <button
                           onClick={() => handleStockAdjust(customAmount)}
                           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-shadow font-semibold">
                           Update
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-gray-50 p-4 flex justify-between">
               <button
                  onClick={() => handleUpdatingStock()}
                  className="px-6 py-2 text-gray-600 font-medium hover:text-gray-800">
                  {isUpdating ? "Updating" : "Done"}
               </button>

               <button
                  onClick={() => handleDeleteProduct()}
                  className="px-6 py-2 bg-red-500/10 rounded-2xl cursor-pointer text-red-600 font-medium hover:text-red-800">
                  {isDeleting ? "Deleting" : "Delete"}
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProductDetailModal;
