import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { useAuth, useChangePassword, useLogout } from "../../auth/hooks";

interface ProfileModalProps {
   closeModal: (value: boolean) => void;
}

interface ChangePasswordForm {
   oldPassword: string;
   newPassword: string;
   confirmPassword: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ closeModal }) => {
   const { mutate: logoutFunction } = useLogout();
   const { mutate: changePassword, isPending, error } = useChangePassword();
   const [isChangePasswordClicked, setIsChangePasswordClicked] = useState<boolean>(false);
   const { user } = useAuth();

   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
   } = useForm<ChangePasswordForm>({
      mode: "onBlur",
   });

   const newPassword = watch("newPassword");

   function logout() {
      const result = confirm("Are you sure you want to logout?");
      if (result) {
         logoutFunction();
      }
   }

   const onSubmit = (data: ChangePasswordForm) => {
      changePassword(
         {
            email: user?.email!,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
         },
         {
            onSuccess: () => {
               reset();
               setIsChangePasswordClicked(false);
            },
         },
      );
   };

   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-center items-center p-4">
         <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
               <div>
                  <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                  <p className="text-xs font-semibold text-gray-600 mt-1">{user?.email}</p>
               </div>
               <button
                  onClick={() => closeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                  <CgClose className="text-2xl text-gray-600" />
               </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
               <div>
                  <h3 className="text-lg font-semibold text-gray-800">Store Information</h3>
                  <p className="text-sm text-gray-600 mt-2">
                     <span className="font-medium">{user?.store.name}</span> • {user?.role}
                  </p>
               </div>

               {/* Change Password Form */}
               {isChangePasswordClicked && (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t pt-6">
                     <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>

                     {/* Old Password */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                           type="password"
                           placeholder="Enter your current password"
                           {...register("oldPassword", {
                              required: "Current password is required",
                              minLength: {
                                 value: 6,
                                 message: "Password must be at least 6 characters",
                              },
                           })}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.oldPassword && (
                           <p className="text-xs text-red-600 mt-1">{errors.oldPassword.message}</p>
                        )}
                     </div>

                     {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                           Invalid Password
                        </div>
                     )}

                     {/* New Password */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                           type="password"
                           placeholder="Enter your new password"
                           {...register("newPassword", {
                              required: "New password is required",
                              minLength: {
                                 value: 6,
                                 message: "Password must be at least 6 characters",
                              },
                           })}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.newPassword && (
                           <p className="text-xs text-red-600 mt-1">{errors.newPassword.message}</p>
                        )}
                     </div>

                     {/* Confirm Password */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                           type="password"
                           placeholder="Confirm your new password"
                           {...register("confirmPassword", {
                              required: "Please confirm your password",
                              validate: (value) => value === newPassword || "Passwords do not match",
                           })}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.confirmPassword && (
                           <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
                        )}
                     </div>

                     {/* Form Actions */}
                     <div className="flex gap-3 pt-2">
                        <button
                           type="button"
                           onClick={() => {
                              setIsChangePasswordClicked(false);
                              reset();
                           }}
                           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                           Cancel
                        </button>
                        <button
                           type="submit"
                           disabled={isPending}
                           className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                           {isPending ? "Updating..." : "Update Password"}
                        </button>
                     </div>
                  </form>
               )}
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 p-4 flex justify-between gap-3 border-t">
               <button
                  onClick={() => {
                     setIsChangePasswordClicked((state) => !state);
                     reset();
                  }}
                  className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors ${
                     isChangePasswordClicked
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-blue-500/10 text-blue-600 hover:text-blue-800"
                  }`}>
                  {isChangePasswordClicked ? "Cancel" : "Change Password"}
               </button>
               <button
                  onClick={logout}
                  className="flex-1 px-6 py-2 bg-red-500/10 rounded-lg text-red-600 font-medium hover:text-red-800 transition-colors">
                  Logout
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProfileModal;
