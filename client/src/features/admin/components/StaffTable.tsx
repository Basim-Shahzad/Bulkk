import React from "react";
import type { User } from "../../auth/types";
import { useStaff } from "../hooks";

const StaffTable: React.FC = () => {
   const { data: staff, isLoading: staffLoading, error: staffError } = useStaff()

   if (staffLoading || !staff) {
      return 'Loading'
   }

   return (
      <div className="mx-16">
         <table className="w-full text-left shadow-lg">
            <thead className="bg-blue-600 text-white text-xs uppercase">
               <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
               {staff.staff.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors cursor-pointer">
                     <td className="px-3 py-2 font-medium text-gray-900">{member.name}</td>
                     <td className="px-3 py-2 text-gray-600">{member.email}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default StaffTable;
