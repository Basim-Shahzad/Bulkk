import React, { useMemo } from "react";
import { HiOutlineCube, HiOutlineCash, HiOutlineUsers } from "react-icons/hi";
import { useProducts } from "../features/products/hooks";
import { useSales } from "../features/sales/hooks";
import { useCustomers } from "../features/customers/hooks";
import { StatCard } from "../features/dashboard/components/StatCard";
import SalesReportGraph from "../features/dashboard/components/SalesReportGraph";
import { useAuth } from "../features/auth/hooks";
import ProductsPieChart from "../features/dashboard/components/ProductsPieChart";
import LowStockAlertTable from "../features/dashboard/components/LowStockAlertTable";

const Dashboard: React.FC = () => {
   const { data: customersData, isLoading: customersLoading } = useCustomers();
   const { data: productsData, isLoading: productsLoading } = useProducts();
   const { data: salesData, isLoading: salesLoading } = useSales();
   const { user } = useAuth();

   const salesTotal = useMemo(() => salesData?.sales.reduce((total, sale) => total + sale.totalAmount, 0), [salesData]);

   const itemsInStockTotal = useMemo(
      () => productsData?.products.reduce((total, product) => total + product.price * product.quantity, 0),
      [productsData],
   );

   const newCustomerTotal = useMemo(() => {
      const now = new Date();
      const currentMonth = now.getUTCMonth();
      const currentYear = now.getUTCFullYear();

      return (
         customersData?.customers.reduce((total, customer) => {
            const date = new Date(customer.createdAt!);

            if (date.getUTCMonth() === currentMonth && date.getUTCFullYear() === currentYear) {
               return total + 1;
            }

            return total;
         }, 0) ?? 0
      );
   }, [customersData]);

   const formatUSD = (amount: number) => {
      return new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      }).format(amount);
   };

   return (
      <div className="h-screen flex flex-col py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
         <div className="mb-4 flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Store Overview</h1>
            <p className="text-sm sm:text-base text-gray-500">Welcome back, {user?.name}. Here is your summary.</p>
         </div>

         <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-2 gap-4 overflow-auto">
            {/* Left Column */}
            <div className="flex flex-col gap-4 min-h-0">
               {/* Sales Graph */}
               <div className="flex-1 min-h-[300px]">
                  <SalesReportGraph />
               </div>

               {/* Low Stock Alert Table */}
               <div className="flex-1 min-h-[250px]">
                  <LowStockAlertTable productsData={productsData!} productsLoading={productsLoading} />
               </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 min-h-0">
               {/* Stat Cards */}
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  <StatCard
                     title="Total Sales"
                     value={formatUSD(salesTotal!)}
                     change="12%"
                     isUp={true}
                     icon={<HiOutlineCash size={24} />}
                     isLoading={salesLoading}
                     gradient="blue"
                  />
                  <StatCard
                     title="Items in Stock"
                     value={formatUSD(itemsInStockTotal!)}
                     change="3%"
                     isUp={false}
                     icon={<HiOutlineCube size={24} />}
                     isLoading={productsLoading}
                     gradient="lightBlue"
                  />
                  <StatCard
                     title="New Customers"
                     value={newCustomerTotal.toString()}
                     change="18%"
                     isUp={true}
                     icon={<HiOutlineUsers size={24} />}
                     isLoading={customersLoading}
                     gradient="purple"
                  />
               </div>

               {/* Products Pie Chart */}
               <div className="flex-1 min-h-[300px]">
                  <ProductsPieChart
                     productsData={productsData!}
                     productsLoading={productsLoading}
                     salesData={salesData!}
                     salesLoading={salesLoading}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
