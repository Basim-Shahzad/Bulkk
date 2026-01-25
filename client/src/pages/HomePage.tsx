import React from "react";
import { HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineDocumentText } from "react-icons/hi";

const Homepage: React.FC = () => {
   return (
      <div className="pt-20 bg-white">
         {/* Hero Section */}
         <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                  Inventory management <br />
                  <span className="text-blue-600">without the headache.</span>
               </h1>
               <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-500">
                  Bulkk helps SMBs prevent overselling, track real-time sales, and generate instant invoices. Scale your
                  business with data-driven insights.
               </p>
               <div className="flex justify-center mt-10 space-x-4">
                  <button className="px-8 py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                     Start Free Trial
                  </button>
                  <button className="px-8 py-3 text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
                     Live Demo
                  </button>
               </div>
            </div>
         </section>

         {/* Feature Grid */}
         <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
               {[
                  {
                     title: "Smart Stock Control",
                     desc: "Real-time alerts before you run out.",
                     icon: <HiOutlineShieldCheck />,
                  },
                  {
                     title: "Instant Invoicing",
                     desc: "Generate professional PDFs in one click.",
                     icon: <HiOutlineDocumentText />,
                  },
                  {
                     title: "Sales Analytics",
                     desc: "Track daily and monthly performance.",
                     icon: <HiOutlineLightningBolt />,
                  },
               ].map((feature, i) => (
                  <div
                     key={i}
                     className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                     <div className="text-blue-600 text-3xl mb-4">{feature.icon}</div>
                     <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                     <p className="text-gray-600">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </section>
      </div>
   );
};

export default Homepage;
