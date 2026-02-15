import React from "react";
import { useCustomers } from "../hooks";
import { FiUsers, FiMail, FiPhone, FiCalendar } from "react-icons/fi";

const CustomersTable: React.FC = () => {
   const { data, error, isLoading } = useCustomers();

   if (!data?.success || isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error.message}</div>;
   }

   // Calculate stats
   const totalCustomers = data.customers.length;
   const recentCustomers = data.customers.filter((c) => {
      if (!c.createdAt) return false;
      const createdDate = new Date(c.createdAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return createdDate >= sevenDaysAgo;
   }).length;

   return (
      <div className="mx-16 space-y-6">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-blue-100 text-sm font-medium">Total Customers</p>
                     <p className="text-3xl font-bold mt-1">{totalCustomers}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                     <FiUsers className="text-2xl" />
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-orange-100 text-sm font-medium">New (7 days)</p>
                     <p className="text-3xl font-bold mt-1">{recentCustomers}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                     <FiCalendar className="text-2xl" />
                  </div>
               </div>
            </div>
         </div>

         {/* Table */}
         <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                     <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                           Customer Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                           Joined Date
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                     {data.customers.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center justify-center text-gray-400">
                                 <FiUsers className="text-5xl mb-3" />
                                 <p className="text-lg font-medium">No customers yet</p>
                                 <p className="text-sm">Add your first customer to get started</p>
                              </div>
                           </td>
                        </tr>
                     ) : (
                        data.customers.map((customer) => (
                           <tr key={customer._id} className="hover:bg-blue-50 transition-colors cursor-pointer group">
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                       {customer.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-4">
                                       <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                          {customer.name}
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center text-sm text-gray-600">
                                    {customer.email ? (
                                       <>
                                          <FiMail className="mr-2 text-gray-400" />
                                          {customer.email}
                                       </>
                                    ) : (
                                       <span className="text-gray-400 italic">No email</span>
                                    )}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center text-sm text-gray-600">
                                    {customer.phone ? (
                                       <>
                                          <FiPhone className="mr-2 text-gray-400" />
                                          {customer.phone}
                                       </>
                                    ) : (
                                       <span className="text-gray-400 italic">No phone</span>
                                    )}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center text-sm text-gray-600">
                                    <FiCalendar className="mr-2 text-gray-400" />
                                    {customer.createdAt
                                       ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                         })
                                       : "N/A"}
                                 </div>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {data.customers.length > 0 && (
            <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
               <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{data.customers.length}</span> customer
                  {data.customers.length !== 1 ? "s" : ""}
               </p>
            </div>
         )}
      </div>
   );
};

export default CustomersTable;
