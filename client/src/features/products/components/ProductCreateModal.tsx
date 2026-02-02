import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import type { Product } from "../types";
import { useAuth } from "../../auth/hooks";

interface ProductCreateModalProps {
   closeModal: (value: boolean) => void;
   onCreate: (product: Omit<Product, "_id">) => void;
}

type ProductFormInput = Omit<Product, "_id">;

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({ closeModal, onCreate }) => {
   const { user } = useAuth();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ProductFormInput>({
      defaultValues: {
         price: 0,
         quantity: 0,
         store: user?.store._id
      },
   });

   const onSubmit: SubmitHandler<ProductFormInput> = (data) => {
      onCreate(data);
      closeModal(false);
   };

   const categories: string[] = [
      "Electronics",
      "Clothing & Apparel",
      "Home & Kitchen",
      "Health & Beauty",
      "Sports & Outdoors",
      "Food & Beverages",
      "Toys & Games",
      "Office Supplies",
      "Automotive",
      "Pet Supplies",
      "Books & Stationery",
      "Software & Digital",
      "Services & Repairs",
   ];

   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
         <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
               <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
               <button
                  type="button"
                  onClick={() => closeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <CgClose className="text-2xl text-gray-600" />
               </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                  <input
                     {...register("name", { required: "Name is required" })}
                     className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                     }`}
                     placeholder="e.g. Wireless Mouse"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                     <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                           <option key={category} value={category}>
                              {category}
                           </option>
                        ))}
                     </select>
                     {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                     <input
                        type="number"
                        step="0.01"
                        {...register("price", {
                           required: "Price is required",
                           min: { value: 0, message: "Price cannot be negative" },
                           valueAsNumber: true,
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                     />
                     {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                  </div>
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Stock</label>
                     <input
                        type="number"
                        {...register("quantity", {
                           required: "Quantity is required",
                           min: { value: 0, message: "Cannot be negative" },
                           valueAsNumber: true,
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                     />
                     {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
                  </div>
               </div>

               <div className="flex gap-3 pt-6 border-t mt-6">
                  <button
                     type="button"
                     onClick={() => closeModal(false)}
                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-shadow cursor-pointer">
                     Create Product
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ProductCreateModal;
