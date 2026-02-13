import React from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { HiPlus, HiTrash } from "react-icons/hi";
import type { Sale } from "../types";
import { useAuth } from "../../auth/hooks";
import { useProducts } from "../../products/hooks";
import { useCustomers } from "../../customers/hooks";
import { useCreateSale } from "../hooks";

interface SalesCreateModalProps {
   closeModal: (value: boolean) => void;
}

const SalesCreateModal: React.FC<SalesCreateModalProps> = ({ closeModal }) => {
   const { user } = useAuth();
   const { data: productsData, isLoading: pLoading } = useProducts();
   const { data: customersData, isLoading: cLoading } = useCustomers();
   const { mutate: createSale } = useCreateSale();
   const [errorMessage, setErrorMessage] = React.useState<string>("");

   const {
      register,
      control,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<Sale>({
      defaultValues: {
         store: user?.store?._id,
         soldBy: user?.name,
         customer: "",
         items: [{ product: "" as any, quantity: 1, unitPrice: 0 }],
      },
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: "items",
   });

   if (pLoading || cLoading)
      return <div className="fixed inset-0 bg-black/20 flex items-center justify-center">Loading...</div>;

   const onSubmit: SubmitHandler<Sale> = (data) => {
      setErrorMessage("");

      createSale(data, {
         onSuccess: () => {
            closeModal(false);
         },
         onError: (error: any) => {
            setErrorMessage(error?.response?.data?.message || "Something went wrong");
         },
      });
   };
   
   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
         <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b">
               <h2 className="text-2xl font-bold text-gray-800">Create New Sale</h2>
               <button onClick={() => closeModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <CgClose className="text-2xl text-gray-600" />
               </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-6">
               {/* CUSTOMER */}
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Select Customer</label>
                  <select
                     {...register("customer", { required: "Please select a customer" })}
                     className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 border-gray-300">
                     <option value="">Select a Customer</option>
                     {customersData?.customers?.map((c) => (
                        <option key={c._id} value={c._id}>
                           {c.name}
                        </option>
                     ))}
                  </select>
                  {errors.customer && <p className="text-red-500 text-xs mt-1">{errors.customer.message}</p>}
               </div>

               {/* ITEMS */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <h3 className="font-semibold text-gray-700">Order Items</h3>
                     <button
                        type="button"
                        onClick={() => append({ product: "" as any, quantity: 1, unitPrice: 0 })}
                        className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100">
                        <HiPlus /> Add Item
                     </button>
                  </div>

                  {fields.map((field, index) => (
                     <div
                        key={field.id}
                        className="grid grid-cols-12 gap-3 items-end border p-3 rounded-lg bg-gray-50/50">
                        {/* PRODUCT */}
                        <div className="col-span-6">
                           <label className="block text-xs font-bold text-gray-500 mb-1">Product</label>
                           <select
                              {...register(`items.${index}.product` as const, {
                                 required: true,
                                 onChange: (e) => {
                                    const selectedProduct = productsData?.products?.find(
                                       (p) => p._id === e.target.value,
                                    );

                                    if (selectedProduct) {
                                       setValue(`items.${index}.unitPrice`, selectedProduct.price);
                                    }
                                 },
                              })}
                              className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                              <option value="">Select Product</option>
                              {productsData?.products?.map((p) => (
                                 <option key={p._id} value={p._id}>
                                    {p.name} (${p.price})
                                 </option>
                              ))}
                           </select>
                        </div>

                        {/* QUANTITY */}
                        <div className="col-span-2">
                           <label className="block text-xs font-bold text-gray-500 mb-1">Qty</label>
                           <input
                              type="number"
                              min={1}
                              {...register(`items.${index}.quantity` as const, {
                                 valueAsNumber: true,
                                 min: 1,
                              })}
                              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                           />
                        </div>

                        {/* UNIT PRICE */}
                        <div className="col-span-3">
                           <label className="block text-xs font-bold text-gray-500 mb-1">Unit Price</label>
                           <input
                              type="number"
                              step="0.01"
                              min={0}
                              {...register(`items.${index}.unitPrice` as const, {
                                 valueAsNumber: true,
                                 min: 0,
                              })}
                              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                           />
                        </div>

                        {/* REMOVE */}
                        <div className="col-span-1">
                           <button
                              type="button"
                              onClick={() => remove(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                              <HiTrash />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               {errorMessage && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{errorMessage}</div>}

               <div className="flex gap-3 pt-6 border-t mt-6">
                  <button
                     type="button"
                     onClick={() => closeModal(false)}
                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50">
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                     Complete Transaction
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default SalesCreateModal;
