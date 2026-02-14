import React from "react";
import { HiShieldCheck, HiArrowRight, HiHome } from "react-icons/hi";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
   children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const { isAuthenticated } = useAuth();
   const navigate = useNavigate();

   if (!isAuthenticated) {
      return (
         <div className="flex h-150 items-center justify-center bg-white p-6">
            <div className="w-full max-w-md text-center">
               <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <HiShieldCheck size={32} />
               </div>

               <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Authentication Required</h1>

               <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                     onClick={() => navigate("/login")}
                     className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]">
                     Sign In
                     <HiArrowRight size={18} />
                  </button>

                  <button
                     onClick={() => navigate("/")}
                     className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900">
                     <HiHome size={18} />
                     Home
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return <>{children}</>;
};

export default ProtectedRoute;
