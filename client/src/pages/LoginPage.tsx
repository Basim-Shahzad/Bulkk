import React from "react";
import { HiOutlineMap, HiOutlineLockClosed } from "react-icons/hi2";

const LoginPage: React.FC = () => {
   return (
      <div className="pt-10 bg-white flex flex-col items-center px-4">
         <div className="max-w-md w-full">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-extrabold text-gray-900">
                  Welcome <span className="text-blue-600">Back</span>
               </h2>
               <p className="mt-2 text-gray-500">Log in to manage your inventory.</p>
            </div>

            <form className="space-y-4">
               {/* Email Field */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative mt-1">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineMap />
                     </div>
                     <input
                        type="email"
                        placeholder="name@company.com"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                     />
                  </div>
               </div>

               {/* Password Field */}
               <div>
                  <div className="flex justify-between items-center">
                     <label className="block text-sm font-medium text-gray-700">Password</label>
                     <a href="#" className="text-sm text-blue-600 hover:underline">Forgot?</a>
                  </div>
                  <div className="relative mt-1">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineLockClosed />
                     </div>
                     <input
                        type="password"
                        placeholder="••••••••"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                     />
                  </div>
               </div>

               <button className="w-full mt-6 px-8 py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                  Sign In
               </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
               New to Bulkk?{" "}
               <a href="/signup" className="text-blue-600 font-semibold hover:underline">
                  Create an account
               </a>
            </p>
         </div>
      </div>
   );
};

export default LoginPage;