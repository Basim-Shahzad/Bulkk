import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import type { Customer } from "../types";
import { useAuth } from "../../auth/hooks";

interface CustomerCreateModalProps {
   closeModal: (value: boolean) => void;
   onCreate: (product: Omit<Customer, "_id">) => void;
}

type CustomerFormInput = Omit<Customer, "_id">;

const CustomerCreateModal: React.FC<CustomerCreateModalProps> = ({ closeModal, onCreate }) => {
   const { user } = useAuth();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<CustomerFormInput>({
      defaultValues: {
         store: user?.store._id,
      },
   });

   const onSubmit: SubmitHandler<CustomerFormInput> = (data) => {
      onCreate(data);
      closeModal(false);
   };

   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
         <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
               <h2 className="text-2xl font-bold text-gray-800">Add New Customer</h2>
               <button
                  type="button"
                  onClick={() => closeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <CgClose className="text-2xl text-gray-600" />
               </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
                  <input
                     {...register("name", { required: "Name is required" })}
                     className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                     }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
               </div>

               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Email</label>
                  <input
                     {...register("email")}
                     className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                     }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
                     Add a Customer
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default CustomerCreateModal;
