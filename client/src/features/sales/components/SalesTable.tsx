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
         return data?.sales.find((sale) => sale._id == clickedSaleId);
      }
   }, [isSaleClick, clickedSaleId]);

   if (!data?.success || isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error.message}</div>;
   }

   return (
      <div className="flex justify-center items-center">
         <table className="sm:w-11/12 w-1/2 text-left overflow-x-auto overflow-scrolling-touch">
            <thead className="bg-blue-600 text-white text-xs uppercase">
               <tr>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Total Amount</th>
                  <th className="px-6 py-3">Sold By</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
               {data.sales.map((sale, i) => (
                  <tr
                     key={i}
                     onClick={() => {
                        setIsSaleClick((state) => !state);
                        setClickedSaleId(sale._id!);
                     }}
                     className="hover:bg-gray-50 transition-colors cursor-pointer">
                     <td className="px-3 py-2 font-medium text-gray-900">
                        {customers?.customers?.find((cust) => cust._id === sale.customer)?.name || "Unknown"}
                     </td>
                     <td className="px-3 py-2 text-gray-600">
                        {sale.items.length > 1 ? `${sale.items.length} units` : `${sale.items.length} unit`}
                     </td>
                     <td className="px-3 py-2 text-gray-600">${sale.totalAmount}</td>
                     <td className="px-3 py-2 text-gray-600">{sale.soldBy}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         {isSaleClick ? <SaleDetailModal sale={selectedSale!} closeModal={setIsSaleClick} /> : ""}
      </div>
   );
};

export default SalesTable;
