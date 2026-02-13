import React from "react";

interface StatCardProps {
   title: string;
   value: number;
   change: string;
   isUp: boolean;
   icon: React.ReactNode;
   isLoading: boolean;
   currencyRel?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, isLoading, currencyRel }) => {
   if (isLoading) {
      return "Loading";
   }

   return (
      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
         <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
            {/* <span className={`text-sm font-medium flex items-center ${isUp ? "text-green-600" : "text-red-600"}`}>
               {isUp ? <HiOutlineTrendingUp className="mr-1" /> : <HiOutlineTrendingDown className="mr-1" />}
               {change}
            </span> */}
         </div>
         <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
         <p className="text-2xl font-bold text-gray-900 mt-1">
            {currencyRel ? "$" : ""}
            {value}
         </p>
      </div>
   );
};
