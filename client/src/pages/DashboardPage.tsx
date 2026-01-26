import React from "react";
import { HiOutlineTrendingUp, HiOutlineTrendingDown, HiOutlineCube, HiOutlineCash, HiOutlineShoppingCart, HiOutlineUsers } from "react-icons/hi";
import { useAuth } from "../features/auth/hooks";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
   title: string;
   value: string;
   change: string;
   isUp: boolean;
   icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isUp, icon }) => (
   <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
         <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
         <span className={`text-sm font-medium flex items-center ${isUp ? "text-green-600" : "text-red-600"}`}>
            {isUp ? <HiOutlineTrendingUp className="mr-1" /> : <HiOutlineTrendingDown className="mr-1" />}
            {change}
         </span>
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
   </div>
);

const Dashboard: React.FC = () => {
   // Mock data - in production this would come from your MERN API
   const lowStockItems = [
      { id: "1", name: "Wireless Mouse", stock: 2, threshold: 5 },
      { id: "2", name: "Mechanical Keyboard", stock: 0, threshold: 3 },
      { id: "3", name: "USB-C Cable", stock: 4, threshold: 10 },
   ];

   return (
      <div className="p-4 lg:ml-0 pt-20 max-w-7xl mx-auto">
         <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Store Overview</h1>
            <p className="text-gray-500">Welcome back, here is what is happening today.</p>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Sales" value="$12,450" change="12%" isUp={true} icon={<HiOutlineCash size={24} />} />
            <StatCard title="Orders" value="154" change="8%" isUp={true} icon={<HiOutlineShoppingCart size={24} />} />
            <StatCard title="Items in Stock" value="842" change="3%" isUp={false} icon={<HiOutlineCube size={24} />} />
            <StatCard title="New Customers" value="28" change="18%" isUp={true} icon={<HiOutlineUsers size={24} />} />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inventory Alert Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-bold text-gray-800">Low Stock Alerts</h2>
                  <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                           <th className="px-6 py-3">Product</th>
                           <th className="px-6 py-3">Current Stock</th>
                           <th className="px-6 py-3">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200">
                        {lowStockItems.map((item) => (
                           <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                              <td className="px-6 py-4 text-gray-600">{item.stock} units</td>
                              <td className="px-6 py-4">
                                 <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                       item.stock === 0 ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                    {item.stock === 0 ? "Out of Stock" : "Low Stock"}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="bg-blue-600 rounded-xl p-8 text-white flex flex-col justify-between">
               <div>
                  <h2 className="text-2xl font-bold mb-2">Generate Instant Invoice</h2>
                  <p className="text-blue-100 mb-6">
                     Create and send professional invoices to your customers in seconds.
                  </p>
               </div>
               <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  + New Sale / Invoice
               </button>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
