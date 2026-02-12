import React, { useMemo, useState } from "react";
import { HiOutlineCube, HiOutlineCash, HiOutlineUsers } from "react-icons/hi";
import { IoPeople } from "react-icons/io5";
import { useProducts } from "../features/products/hooks";
import { useSales } from "../features/sales/hooks";
import { useCustomers } from "../features/customers/hooks";
import { StatCard } from "../features/dashboard/components/StatCard";
import { getStockStatus } from "../utils/utilsFunctions";
import type { Product } from "../features/products/types";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
   const { data: customersData, isLoading: customersLoading } = useCustomers();
   const { data: productsData, isLoading: productsLoading } = useProducts();
   const { data: salesData, isLoading: salesLoading } = useSales();

   const salesTotal = useMemo(() => salesData?.sales.reduce((total, sale) => total + sale.totalAmount, 0), [salesData]);

   const itemsInStockTotal = useMemo(
      () => productsData?.products.reduce((total, product) => total + product.price * product.quantity, 0),
      [productsData],
   );

   const newCustomerTotal = useMemo(() => {
      const now = new Date();
      const currentMonth = now.getUTCMonth();
      const currentYear = now.getUTCFullYear();

      return (
         customersData?.customers.reduce((total, customer) => {
            const date = new Date(customer.createdAt!);

            if (date.getUTCMonth() === currentMonth && date.getUTCFullYear() === currentYear) {
               return total + 1;
            }

            return total;
         }, 0) ?? 0
      );
   }, [customersData]);

   const returningCustomers = useMemo(() => {
      if (!salesData?.sales) return 0;

      const customerSalesCount = new Map<string, number>();

      for (const sale of salesData.sales) {
         const customerId = sale.customer;
         if (!customerId) continue;

         customerSalesCount.set(customerId, (customerSalesCount.get(customerId) ?? 0) + 1);
      }

      return Array.from(customerSalesCount.values()).filter((count) => count > 1).length;
   }, [salesData]);

   const lowStockItems = [
      { id: "1", name: "Wireless Mouse", stock: 2, threshold: 5 },
      { id: "2", name: "Mechanical Keyboard", stock: 0, threshold: 3 },
      { id: "3", name: "USB-C Cable", stock: 124, threshold: 4 },
   ];

   const lowStockProducts: Product[] = useMemo(
      () =>
         productsData?.products.filter(
            (product) => product.minimumStockLevel && product.minimumStockLevel > product.quantity,
         ) || [],
      [productsData],
   );

   return (
      <div className="py-4 px-12 lg:ml-0 mx-auto">
         <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Store Overview</h1>
            <p className="text-gray-500">Welcome back, here is what is happening today.</p>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
               title="Total Sales"
               value={salesTotal!}
               change="12%"
               isUp={true}
               icon={<HiOutlineCash size={24} />}
               isLoading={salesLoading}
               currencyRel
            />
            <StatCard
               title="Returning Customers"
               value={returningCustomers}
               change="8%"
               isUp={true}
               icon={<IoPeople size={24} />}
               isLoading={customersLoading}
            />
            <StatCard
               title="Items in Stock"
               value={itemsInStockTotal!}
               change="3%"
               isUp={false}
               icon={<HiOutlineCube size={24} />}
               isLoading={productsLoading}
               currencyRel
            />
            <StatCard
               title="New Customers"
               value={newCustomerTotal!}
               change="18%"
               isUp={true}
               icon={<HiOutlineUsers size={24} />}
               isLoading={customersLoading}
            />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inventory Alert Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-bold text-gray-800">Low Stock Alerts</h2>
                  <Link to={'/products'} className="text-sm text-blue-600 font-medium hover:underline">View All</Link>
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
                        {lowStockProducts.map((product) => (
                           <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                              <td className="px-6 py-4 text-gray-600">{product.quantity} units</td>
                              <td className="px-6 py-4">
                                 <span
                                    className={`px-1.5 py-0.5 font-semibold rounded-full text-${getStockStatus(product)?.color}-600 font-semibold bg-${getStockStatus(product)?.color}-100`}>
                                    {getStockStatus(product)?.text ? getStockStatus(product)?.text : 'Low Stock'}
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
                  <h2 className="text-2xl font-bold mb-2">Generate Invoice</h2>
                  <p className="text-blue-100 mb-6">
                     Create and send professional invoices to your customers in seconds.
                  </p>
               </div>
               <Link to={"/sales"} className="w-full flex justify-center cursor-pointer bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  + New Sale
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
