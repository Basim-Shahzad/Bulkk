import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout: React.FC = () => {
   const navigation = useNavigation();

   // Check if the app is currently fetching data for the next route
   const isLoading = navigation.state === "loading";

   return (
      <div className="min-h-screen bg-white">
         {/* Subtle Loading Top-bar (Production touch) */}
         {isLoading && (
            <div className="fixed top-0 left-0 w-full h-1 bg-blue-100 z-[60]">
               <div className="h-full bg-blue-600 animate-pulse w-1/3"></div>
            </div>
         )}

         <Navbar />

         <main className="transition-opacity duration-200">
            <div className={isLoading ? "opacity-50" : "opacity-100"}>
               <Outlet />
            </div>
         </main>
      </div>
   );
};

export default AppLayout;
