import React from "react";

interface StatCardProps {
   title: string;
   value: string | number;
   icon: React.ReactNode;
   gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, gradient }) => {
   return (
      <div className={`bg-gradient-to-br ${gradient} rounded-xl shadow-lg p-5 text-white`}>
         <div className="flex items-center justify-between">
            <div>
               <p className="text-white/80 text-sm font-medium">{title}</p>
               <h3 className="text-3xl font-bold mt-1">{value}</h3>
            </div>
            <div className="bg-white/20 rounded-full p-3">
               {icon}
            </div>
         </div>
      </div>
   );
};

export default StatCard;