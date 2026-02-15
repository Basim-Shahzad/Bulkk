import React, { useMemo, useState } from "react";
import { useSales } from "../hooks";
import { useCustomers } from "../../customers/hooks";
import SaleDetailModal from "./SaleDetailModal";

const SalesTable: React.FC = () => {
   const { data, error, isLoading } = useSales();
   const [isSaleClick, setIsSaleClick] = useState<boolean>(false);
   const [clickedSaleId, setClickedSaleId] = useState<string>("");
   const { data: customers } = useCustomers();

   const selectedSale = useMemo(() => {
      if (isSaleClick && clickedSaleId) {
         return data?.sales.find((sale) => sale._id === clickedSaleId);
      }
   }, [isSaleClick, clickedSaleId, data?.sales]);

   const formatDate = (dateString?: string) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
      });
   };

   if (!data?.success || isLoading) {
      return (
         <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-500">Loading sales data...</div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="mx-4 lg:mx-16 my-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error.message}
         </div>
      );
   }

   return (
      <div className="mx-4 lg:mx-16 my-6">
         {/* Sales Table */}
         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                     <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Items</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                           Total Amount
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Sold By</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {data.sales.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center justify-center text-gray-400">
                                 <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                 </svg>
                                 <p className="text-lg font-medium">No sales found</p>
                                 <p className="text-sm mt-1">Start by adding your first sale</p>
                              </div>
                           </td>
                        </tr>
                     ) : (
                        data.sales.map((sale, index) => (
                           <tr
                              key={sale._id}
                              onClick={() => {
                                 setIsSaleClick((state) => !state);
                                 setClickedSaleId(sale._id!);
                              }}
                              className={`hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
                                 index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                              }`}>
                              <td className="px-6 py-4">
                                 <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                       <svg
                                          className="w-5 h-5 text-blue-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24">
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                          />
                                       </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                       {formatDate(sale.createdAt)}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3">
                                       <span className="text-white font-semibold text-sm">
                                          {(
                                             customers?.customers?.find((cust) => cust._id === sale.customer)?.name ||
                                             "Walk-in"
                                          )
                                             .charAt(0)
                                             .toUpperCase()}
                                       </span>
                                    </div>
                                    <div>
                                       <div className="text-sm font-semibold text-gray-900">
                                          {customers?.customers?.find((cust) => cust._id === sale.customer)?.name ||
                                             "Walk-in"}
                                       </div>
                                       {!sale.customer && <span className="text-xs text-gray-500">Guest customer</span>}
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                       <svg
                                          className="w-5 h-5 text-green-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24">
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                          />
                                       </svg>
                                    </div>
                                    <div>
                                       <div className="text-sm font-semibold text-gray-900">
                                          {sale.items.length} {sale.items.length === 1 ? "item" : "items"}
                                       </div>
                                       <div className="text-xs text-gray-500">
                                          {sale.items.reduce((sum, item) => sum + item.quantity, 0)} units total
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100">
                                    <span className="text-sm font-bold text-green-700">
                                       ${sale.totalAmount.toFixed(2)}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mr-2">
                                       <span className="text-white font-semibold text-xs">
                                          {sale.soldBy
                                             .split(" ")
                                             .map((n) => n[0])
                                             .join("")
                                             .toUpperCase()
                                             .slice(0, 2)}
                                       </span>
                                    </div>
                                    <span className="text-sm text-gray-700">{sale.soldBy}</span>
                                 </div>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {isSaleClick && selectedSale && <SaleDetailModal sale={selectedSale} closeModal={setIsSaleClick} />}
      </div>
   );
};

export default SalesTable;
