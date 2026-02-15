import React, { useMemo } from "react";
import { useSales } from "../hooks";
import StatCard from "./StatCard";

const SalesStats: React.FC = () => {
   const { data } = useSales();

   // Calculate statistics
   const stats = useMemo(() => {
      if (!data?.sales || data.sales.length === 0) {
         return {
            totalRevenue: 0,
            totalSales: 0,
            averageSale: 0,
            totalItems: 0,
         };
      }

      const totalRevenue = data.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
      const totalSales = data.sales.length;
      const averageSale = totalRevenue / totalSales;
      const totalItems = data.sales.reduce((sum, sale) => sum + sale.items.length, 0);

      return {
         totalRevenue,
         totalSales,
         averageSale,
         totalItems,
      };
   }, [data?.sales]);

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 lg:mx-16 mb-6">
         <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            gradient="from-blue-500 to-blue-600"
            icon={
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            }
         />

         <StatCard
            title="Total Sales"
            value={stats.totalSales}
            gradient="from-green-500 to-green-600"
            icon={
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
            }
         />

         <StatCard
            title="Average Sale"
            value={`$${stats.averageSale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            gradient="from-purple-500 to-purple-600"
            icon={
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
               </svg>
            }
         />

         <StatCard
            title="Items Sold"
            value={stats.totalItems}
            gradient="from-orange-500 to-orange-600"
            icon={
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
               </svg>
            }
         />
      </div>
   );
};

export default SalesStats;