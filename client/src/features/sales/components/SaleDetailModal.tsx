import React, { useMemo } from "react";
import { CgClose } from "react-icons/cg";
import { useCustomer } from "../../customers/hooks";
import type { Sale } from "../types";
import { useProducts } from "../../products/hooks";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import type { InvoiceData } from "../types";

interface SaleDetailModalProps {
   sale: Sale;
   closeModal: (value: boolean) => void;
}

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({ sale, closeModal }) => {
   const { data: customerData } = useCustomer(sale?.customer!);
   const { data: productsData } = useProducts();
   const now = new Date();

   const saleItemsWithProducts = useMemo(() => {
      if (!productsData?.success || !productsData.products) return [];

      return sale.items
         .map((saleItem) => {
            const product = productsData.products.find((p) => p._id === saleItem.product);
            return {
               product,
               quantity: saleItem.quantity,
               unitPrice: saleItem.unitPrice,
               subtotal: saleItem.quantity * saleItem.unitPrice,
            };
         })
         .filter((item) => item.product);
   }, [productsData, sale.items]);

   const invoiceData: InvoiceData = useMemo(() => {
      const suffix = sale._id!.substring(sale._id!.length - 5).toUpperCase();
      const invNo = `INV-${suffix}`;

      return {
         invoiceNumber: invNo,
         clientName: customerData?.customer.name || "Unknown Customer",
         date: new Date(sale.createdAt || Date.now()).toDateString(),
         items: saleItemsWithProducts.map((item) => ({
            name: item.product?.name || "Unknown Product",
            description: `Standard billing for ${item.product?.name || "Product"} under ${invNo}`,
            quantity: item.quantity,
            price: item.unitPrice,
         })),
      };
   }, [sale, customerData, saleItemsWithProducts]);

   const totalAmount = useMemo(() => {
      return saleItemsWithProducts.reduce((sum, item) => sum + item.subtotal, 0);
   }, [saleItemsWithProducts]);

   const itemCount = useMemo(() => {
      return saleItemsWithProducts.reduce((sum, item) => sum + item.quantity, 0);
   }, [saleItemsWithProducts]);

   if (!customerData) {
      return (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6">
               <p className="text-center text-gray-600">Loading customer data...</p>
            </div>
         </div>
      );
   }

   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-center items-center p-4">
         <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
               <div>
                  <h2 className="text-2xl font-bold text-gray-800">Sale Details</h2>
                  <p className="text-sm text-gray-600 mt-1">Customer: {customerData.customer.name}</p>
               </div>
               <button
                  onClick={() => closeModal(false)}
                  className="p-2 hover:bg-white/50 rounded-full transition-colors cursor-pointer">
                  <CgClose className="text-2xl text-gray-600" />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
               {saleItemsWithProducts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No items in this sale</p>
               ) : (
                  <div className="space-y-3">
                     <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-gray-600 px-3 pb-2 border-b">
                        <div>Product</div>
                        <div className="text-right">Unit Price</div>
                        <div className="text-right">Qty</div>
                        <div className="text-right">Subtotal</div>
                        <div></div>
                     </div>

                     {saleItemsWithProducts.map((item, index) => (
                        <div
                           key={index}
                           className="grid grid-cols-5 gap-2 items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                           <div className="font-medium text-gray-800 truncate">{item.product?.name || "Unknown"}</div>
                           <div className="text-right text-sm text-gray-700">${item.unitPrice.toFixed(2)}</div>
                           <div className="text-right">
                              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                 {item.quantity}
                              </span>
                           </div>
                           <div className="text-right font-semibold text-gray-900">${item.subtotal.toFixed(2)}</div>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            {/* Summary Section */}
            <div className="border-t bg-gray-50 p-6 space-y-3">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-medium text-gray-800">{itemCount}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-800">${totalAmount.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center text-lg border-t pt-3">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-indigo-600">${totalAmount.toFixed(2)}</span>
               </div>
            </div>

            {/* Actions */}
            <div className="border-t p-6 flex gap-3 bg-white">
               <button
                  onClick={() => closeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Close
               </button>

               <PDFDownloadLink
                  className="flex-1 flex justify-center px-4 py-2 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors"
                  document={<InvoicePDF data={invoiceData} />}
                  fileName={`INV-${now.getFullYear()}-${invoiceData.invoiceNumber}.pdf`}>
                  {({ loading }) => (loading ? "Preparing PDF..." : "Download Invoice")}
               </PDFDownloadLink>
            </div>
         </div>
      </div>
   );
};

export default SaleDetailModal;
