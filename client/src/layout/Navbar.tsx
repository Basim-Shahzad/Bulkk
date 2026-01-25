import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiOutlineMenuAlt2, HiOutlineX, HiOutlineChartBar, HiOutlineCube, HiOutlineShoppingCart } from "react-icons/hi";

const Navbar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);

   const navigation = [
      { name: "Dashboard", href: "/dashboard", icon: HiOutlineChartBar },
      { name: "Inventory", href: "/inventory", icon: HiOutlineCube },
      { name: "Sales", href: "/sales", icon: HiOutlineShoppingCart },
   ];

   return (
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
               <div className="flex items-center w-full justify-between">
                  <Link to="/" className="text-2xl font-bold text-blue-600">
                     Bulkk.
                  </Link>

                  {/* Desktop Links */}
                  <div className="hidden md:ml-8 md:flex md:space-x-4">
                     {navigation.map((item) => (
                        <NavLink
                           key={item.name}
                           to={item.href}
                           className={({ isActive }) =>
                              `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                 isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                              }`
                           }>
                           <item.icon className="mr-2 h-5 w-5" />
                           {item.name}
                        </NavLink>
                     ))}
                     <Link to={'/signup'} className="bg-blue-600 flex items-center hover:bg-blue-700 px-4 py-0.5 text-sm text-white rounded-lg transition-all duration-150">
                        Sign up
                     </Link>
                     <Link to={'/login'} className="bg-blue-600 flex items-center hover:bg-blue-700 px-4 py-0.5 text-sm text-white rounded-lg transition-all duration-150">
                        Log in
                     </Link>
                  </div>
               </div>

               {/* Mobile Menu Button */}
               <div className="flex items-center md:hidden">
                  <button
                     onClick={() => setIsOpen(!isOpen)}
                     className="text-gray-600 hover:text-blue-600 transition-colors">
                     {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt2 size={24} />}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Menu Overlay */}
         <div className={`md:hidden ${isOpen ? "block" : "hidden"} border-t border-gray-100 bg-white`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
               {navigation.map((item) => (
                  <NavLink
                     key={item.name}
                     to={item.href}
                     onClick={() => setIsOpen(false)}
                     className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium ${
                           isActive ? "bg-blue-50 text-blue-700" : "text-gray-600"
                        }`
                     }>
                     <div className="flex items-center">
                        <item.icon className="mr-3 h-6 w-6" />
                        {item.name}
                     </div>
                  </NavLink>
               ))}
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
