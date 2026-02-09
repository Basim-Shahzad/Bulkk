import React, { useState } from "react";
import { useCustomers } from "../hooks";
import type { Customer } from "../types";

const CustomersTable: React.FC = () => {
   const { data, error, isLoading } = useCustomers();

   if (!data?.success || isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error.message}</div>;
   }

   return (
      <div className="flex items-center mx-16">
         <table className="w-1/2 text-left overflow-x-scroll">
            <thead className="bg-blue-600 text-white text-xs uppercase">
               <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
               {data.customers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                     <td className="px-3 py-2 font-medium text-gray-900">{customer.name}</td>
                     <td className="px-3 py-2 text-gray-600">{customer.email}</td>
                  </tr> 
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default CustomersTable;
