import React from "react";

interface StatCardProps {
   title: string;
   value: string;
   change: string;
   isUp: boolean;
   icon: React.ReactNode;
   isLoading: boolean;
   gradient?: "blue" | "lightBlue" | "orange" | "green" | "purple" | "pink";
}

const gradients: any = {
   blue: "bg-gradient-to-br from-blue-500 to-blue-700",
   lightBlue: "bg-gradient-to-br from-sky-400 to-blue-500",
   purple: "bg-gradient-to-br from-purple-500 to-purple-700",
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, isLoading, gradient = "blue" }) => {
   if (isLoading) {
      return "Loading";
   }

   return (
      <div className={`p-6 rounded-xl shadow-sm ${gradients[gradient]}`}>
         <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 text-white rounded-lg">{icon}</div>
         </div>
         <h3 className="text-white/80 text-sm font-medium">{title}</h3>
         <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
   );
};
