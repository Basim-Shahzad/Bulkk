import React, { useEffect } from "react";
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed, HiBuildingStorefront } from "react-icons/hi2";
import { useAuth, useSignup } from "../features/auth/hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignupFormData = {
   name: string;
   email: string;
   password: string;
   storeName: string;
};

const SignupPage: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SignupFormData>();
   const { mutate: signup, isLoading } = useSignup();
   const { user, isAuthenticated } = useAuth();
   const navigate = useNavigate();

   const onSubmit = (data: SignupFormData) => {
      signup(data);
   };

   useEffect(() => {
      if (isAuthenticated && user) {
         navigate("/dashboard");
      }
   }, [isAuthenticated, user, navigate]);

   return (
      <div className="pt-10 bg-white flex flex-col items-center px-4">
         <div className="max-w-md w-full">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-extrabold text-gray-900">
                  Create your <span className="text-blue-600">Bulkk account</span>
               </h2>
               <p className="mt-2 text-gray-500">Start managing your inventory today.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
               {/* Username Field */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <div className="relative mt-1">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineUser />
                     </div>
                     <input
                        type="text"
                        {...register("name", { required: "Name is Required" })}
                        autoComplete="name"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                     />
                  </div>
                  {errors.name && <span className="text-red-700 ">{errors.name.message}</span>}
               </div>

               {/* Email Field */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative mt-1">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineEnvelope />
                     </div>
                     <input
                        type="email"
                        {...register("email", { required: "Email is Required" })}
                        autoComplete="email"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                     />
                  </div>
                  {errors.email && <span className="text-red-700 ">{errors.email.message}</span>}
               </div>

               {/* Password Field */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative mt-1">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineLockClosed />
                     </div>
                     <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        placeholder="•••••••••"
                        autoComplete="new-password"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                     />
                  </div>
                  {errors.password && <span className="text-red-700 ">{errors.password.message}</span>}
               </div>

               {/* Store Name Field */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Store Name</label>
                  <div className="relative mt-1">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <HiBuildingStorefront />
                     </div>
                     <input
                        type="text"
                        {...register("storeName", { required: "Store name is required" })}
                        autoComplete="organization"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                     />
                  </div>
                  {errors.storeName && <span className="text-red-700 ">{errors.storeName.message}</span>}
               </div>

               <button
                  type="submit"
                  className="w-full mt-6 px-8 py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                  {isLoading ? "Signing up…" : "Sign Up"}
               </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
               Already have an account?{" "}
               <a href="/login" className="text-blue-600 font-semibold hover:underline">
                  Sign in
               </a>
            </p>
         </div>
      </div>
   );
};

export default SignupPage;
