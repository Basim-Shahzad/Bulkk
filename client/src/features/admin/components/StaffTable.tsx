import React from "react";
import { useStaff } from "../hooks";

const StaffTable: React.FC = () => {
   const { data: staff, isLoading: staffLoading } = useStaff();

   if (staffLoading || !staff) {
      return "Loading";
   }
   const formatDate = (dateString?: string) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
      });
   };

   return (
      <div className="w-full mx-8">
         <table className="text-left shadow-lg w-11/12">
            <thead className="bg-blue-600 text-white text-xs uppercase">
               <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Created At</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
               {staff.staff.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors cursor-pointer">
                     <td className="px-3 py-2 font-medium text-gray-900">{member.name}</td>
                     <td className="px-3 py-2 text-gray-600">{member.email}</td>
                     <td className="px-3 py-2 text-gray-600">{formatDate(member.createdAt)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default StaffTable;
