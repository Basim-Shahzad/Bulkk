import { useMemo } from "react";
import { getStockStatus } from "../../../utils/utilsFunctions"
import { Link } from "react-router-dom";
import type { Product  } from "../../products/types";
import type { ProductsResponse } from "../../products/api";

interface LowStockAlertTableType {
   productsData: ProductsResponse
   productsLoading: boolean
}

const LowStockAlertTable: React.FC<LowStockAlertTableType> = ({  productsData, productsLoading }) => {

   const lowStockProducts: Product[] = useMemo(
      () =>
         productsData?.products.filter(
            (product) =>
               product.minimumStockLevel !== undefined &&
               product.minimumStockLevel !== null &&
               product.quantity <= product.minimumStockLevel,
         ) || [],
      [productsData],
   );
   
   return (
      <div className="h-full flex flex-col">
         {/* Inventory Alert Table */}
         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
               <h2 className="font-bold text-gray-800 text-sm sm:text-base">Low Stock Alerts</h2>
               <Link to={"/products"} className="text-xs sm:text-sm text-blue-600 font-medium hover:underline">
                  View All
               </Link>
            </div>
            <div className="overflow-auto flex-1">
               <table className="w-full text-left">
                  <thead className="bg-blue-600 text-white text-xs uppercase sticky top-0">
                     <tr>
                        <th className="px-4 sm:px-6 py-2 sm:py-3">Product</th>
                        <th className="px-4 sm:px-6 py-2 sm:py-3">Current Stock</th>
                        <th className="px-4 sm:px-6 py-2 sm:py-3">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     {productsLoading ? (
                        <tr>
                           <td colSpan={3} className="px-4 sm:px-6 py-4 text-center text-gray-500">
                              Loading...
                           </td>
                        </tr>
                     ) : lowStockProducts.length === 0 ? (
                        <tr>
                           <td colSpan={3} className="px-4 sm:px-6 py-4 text-center text-gray-500">
                              No low stock alerts
                           </td>
                        </tr>
                     ) : (
                        lowStockProducts.map((product) => (
                           <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 text-sm">{product.name}</td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 text-sm">{product.quantity} units</td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4">
                                 {(() => {
                                    const status = getStockStatus(product);
                                    return (
                                       <span
                                          className={`px-2 py-1 text-xs rounded-full ${status.className} font-semibold`}>
                                          {status.text}
                                       </span>
                                    );
                                 })()}
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default LowStockAlertTable;