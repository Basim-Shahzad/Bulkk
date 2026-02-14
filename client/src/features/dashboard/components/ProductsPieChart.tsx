import React, { useMemo } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";
import type { ProductsResponse } from "../../products/api";
import type { SalesResponse } from "../../sales/api";

interface ProductsPieChartType {
   salesData: SalesResponse | undefined;
   productsData: ProductsResponse | undefined;
   productsLoading: boolean;
   salesLoading: boolean;
}

// Simple colors for the pie slices
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4560"];

const ProductsPieChart: React.FC<ProductsPieChartType> = ({
   productsData,
   productsLoading,
   salesData,
   salesLoading,
}) => {
   const chartData = useMemo(() => {
      if (!salesData?.sales || !productsData?.products) return [];

      const salesMap: Record<string, number> = {};

      salesData.sales.forEach((sale) => {
         sale.items.forEach((item) => {
            const currentTotal = salesMap[item.product] || 0;
            salesMap[item.product] = currentTotal + item.unitPrice * item.quantity;
         });
      });

      return Object.entries(salesMap)
         .map(([productId, totalSales]) => {
            const product = productsData.products.find((p) => p._id === productId);
            return {
               name: product ? product.name : "Unknown Product",
               value: totalSales,
            };
         })
         .filter((item) => item.value > 0)
         .sort((a, b) => b.value - a.value)
         .slice(0, 6); // Show top 6 products for better visibility
   }, [salesData, productsData]);

   if (productsLoading || salesLoading) {
      return (
         <div className="h-full w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
            <div className="text-gray-500">Loading chart...</div>
         </div>
      );
   }

   if (chartData.length === 0) {
      return (
         <div className="h-full w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
            <div className="text-gray-500">No sales data available</div>
         </div>
      );
   }

   return (
      <div className="h-full w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
         <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 sm:mb-4">Top Products by Sales</h2>
         <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                     data={chartData}
                     dataKey="value"
                     nameKey="name"
                     cx="50%"
                     cy="50%"
                     outerRadius="70%"
                     fill="#8884d8"
                     label={({ name, percent }) => `${name}: ${(percent! * 100).toFixed(0)}%`}
                     labelLine={false}>
                     {chartData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `$${value.toFixed(2)}`} contentStyle={{ fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} iconSize={10} />
               </PieChart>
            </ResponsiveContainer>
         </div>
      </div>
   );
};

export default ProductsPieChart;
