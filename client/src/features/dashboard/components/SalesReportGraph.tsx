import React, { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSalesReport } from "../hooks";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SalesReportGraph = () => {
   const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
   const { data: apiResponse, isLoading, error } = useSalesReport(interval);

   const chartData = useMemo(() => {
      if (!apiResponse?.data) return [];
      const rawData = apiResponse.data;

      if (interval === "yearly") {
         // Show 12 Months
         return MONTHS.map((monthName, index) => {
            const monthNum = (index + 1).toString().padStart(2, "0");
            const found = rawData.find((d: any) => d._id === monthNum);
            return { label: monthName, total: found ? found.total : 0 };
         });
      } else {
         // Show Days of CURRENT month
         const now = new Date();
         const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

         return Array.from({ length: daysInMonth }, (_, i) => {
            const dayNum = i + 1;
            const found = rawData.find((d: any) => parseInt(d._id) === dayNum);
            return {
               label: dayNum.toString().padStart(2, "0"),
               total: found ? found.total : 0,
            };
         });
      }
   }, [apiResponse, interval]);

   if (isLoading) return <div className="h-[300px] flex items-center justify-center">Loading...</div>;
   if (error) return <div className="text-red-500">Error loading data</div>;

   return (
      <div className="h-[325px] w-full bg-white p-6 rounded-xl shadow-sm border border-slate-100">
         <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
               {interval === "yearly" ? "Annual Sales (This Year)" : "Monthly Sales (This Month)"}
            </h2>

            <div className="flex gap-2 mb-6">
               <button
                  onClick={() => setInterval("monthly")}
                  className={`px-4.5 py-1 cursor-pointer ${interval === "monthly" ? "bg-blue-800" : "bg-blue-700"} hover:bg-blue-800 text-white rounded-md`}>
                  Monthly
               </button>
               <button
                  onClick={() => setInterval("yearly")}
                  className={`px-4.5 py-1 cursor-pointer ${interval === "yearly" ? "bg-blue-800" : "bg-blue-700"} bg-blue-700 hover:bg-blue-800 text-white rounded-md`}>
                  Yearly
               </button>
            </div>
         </div>

         <ResponsiveContainer width="100%" height="80%">
            <LineChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
               <XAxis
                  dataKey="label"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  interval={interval === "monthly" ? 4 : 0}
               />
               <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={(val) => `$${val > 1000 ? (val / 1000).toFixed(0) + "k" : val}`}
               />
               <Tooltip formatter={(val: number) => [`$${val.toLocaleString()}`, "Revenue"]} />
               <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={interval === "yearly"}
                  activeDot={{ r: 6 }}
               />
            </LineChart>
         </ResponsiveContainer>
      </div>
   );
};

export default SalesReportGraph;
