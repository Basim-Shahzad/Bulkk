import { useMemo, useState } from "react";
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
            const found: any = rawData.find((d: any) => d._id === monthNum);
            return { label: monthName, total: found ? found.total : 0 };
         });
      } else {
         // Show Days of CURRENT month
         const now = new Date();
         const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

         return Array.from({ length: daysInMonth }, (_, i) => {
            const dayNum = i + 1;
            const found: any = rawData.find((d: any) => parseInt(d._id) === dayNum);
            return {
               label: dayNum.toString().padStart(2, "0"),
               total: found ? found.total : 0,
            };
         });
      }
   }, [apiResponse, interval]);

   if (isLoading) {
      return (
         <div className="h-full w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
            <div className="text-gray-500">Loading...</div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="h-full w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
            <div className="text-red-500">Error loading data</div>
         </div>
      );
   }

   return (
      <div className="h-full w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 flex-shrink-0">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">
               {interval === "yearly" ? "Annual Sales (This Year)" : "Monthly Sales (This Month)"}
            </h2>

            <div className="flex bg-white rounded-md border border-black/10">
               <button
                  onClick={() => setInterval("monthly")}
                  className={`px-3 sm:px-4 py-1 text-xs sm:text-sm cursor-pointer rounded-l-md transition-all duration-100 ${
                     interval === "monthly" ? "bg-blue-800 text-white" : "bg-white text-black"
                  } hover:bg-blue-800 hover:text-white`}>
                  Monthly
               </button>
               <button
                  onClick={() => setInterval("yearly")}
                  className={`px-3 sm:px-4 py-1 text-xs sm:text-sm cursor-pointer rounded-r-md transition-all duration-100 ${
                     interval === "yearly" ? "bg-blue-800 text-white" : "bg-white text-black"
                  } hover:bg-blue-800 hover:text-white`}>
                  Yearly
               </button>
            </div>
         </div>

         <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                     dataKey="label"
                     tick={{ fill: "#64748b", fontSize: 10 }}
                     tickFormatter={(val: string) => `${val}`}
                     interval={interval === "monthly" ? 4 : 0}
                  />
                  <YAxis
                     tick={{ fill: "#64748b", fontSize: 10 }}
                     tickFormatter={(val) => `$${val > 1000 ? (val / 1000).toFixed(0) + "k" : val}`}
                  />
                  <Tooltip
                     formatter={(val: any) => [`$${val.toLocaleString()}`, "Revenue"]}
                     contentStyle={{ fontSize: "12px" }}
                  />
                  <Line
                     type="monotone"
                     dataKey="total"
                     stroke="#2563eb"
                     strokeWidth={2}
                     dot={interval === "yearly"}
                     activeDot={{ r: 6 }}
                  />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </div>
   );
};

export default SalesReportGraph;
