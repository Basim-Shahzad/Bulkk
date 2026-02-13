import React from "react";
import { HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineDocumentText, HiArrowRight } from "react-icons/hi";
import { useAuth } from "../features/auth/hooks";

const Homepage: React.FC = () => {
   const { isAuthenticated } = useAuth();

   return (
      <div className="pt-20 bg-white flex flex-col font-sans">
         <section className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-600 uppercase tracking-widest">
               v1.0 Now Live
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[0.9]">
               Inventory <br />
               <span className="text-blue-600">Simplified.</span>
            </h1>

            <p className="max-w-lg mx-auto mt-6 text-lg text-gray-500 font-medium">
               Prevent overselling and generate instant invoices. <br className="hidden md:block" />
               The operating system for modern SMBs.
            </p>

            <div className="flex items-center justify-center mt-10 gap-4">
               <button className=" cursor-pointer group relative">
                  <div className="absolute inset-0 bg-blue-600/20 rounded-xl translate-y-1.5 transition-transform group-hover:translate-y-1 group-active:translate-y-0" />
                  <div className="relative px-8 py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 transition-transform group-active:translate-y-1">
                     Get Started <HiArrowRight />
                  </div>
               </button>

               <button className=" cursor-pointer px-8 py-4 text-gray-900 font-bold hover:bg-gray-50 rounded-xl transition-colors">
                  Live Demo
               </button>
            </div>
         </section>

         <section className="px-6 z-10 mt-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                  {
                     title: "Low-Stock Alerts",
                     desc: "Custom thresholds to avoid running out of stock.",
                     icon: <HiOutlineShieldCheck />,
                  },
                  {
                     title: "Instant Invoices",
                     desc: "Generate professional PDFs in one click.",
                     icon: <HiOutlineDocumentText />,
                  },
                  {
                     title: "Performance",
                     desc: "Data-driven insights for your business.",
                     icon: <HiOutlineLightningBolt />,
                  },
               ].map((feature, i) => (
                  <div
                     key={i}
                     className="flex items-center gap-4 p-5 bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all">
                     <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xl">
                        {feature.icon}
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-500 leading-tight">{feature.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </div>
   );
};

export default Homepage;
