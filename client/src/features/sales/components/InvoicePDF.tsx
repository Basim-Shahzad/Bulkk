import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { InvoiceData } from "../types";

const styles = StyleSheet.create({
   page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#333" },
   header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30, borderBottom: "2pt solid #000", paddingBottom: 10 },
   invoiceTitle: { fontSize: 28, fontWeight: "bold" },
   infoText: { fontSize: 10, color: "#444", marginTop: 2 },
   section: { marginBottom: 25 },
   sectionTitle: { fontSize: 10, fontWeight: "bold", marginBottom: 4, textTransform: "uppercase", color: "#777" },
   clientName: { fontSize: 14, fontWeight: "bold" },
   table: { width: "auto", marginTop: 10 },
   tableRow: { flexDirection: "row", borderBottomColor: "#EEE", borderBottomWidth: 1, minHeight: 30, alignItems: "center" },
   tableHeader: { backgroundColor: "#F5F5F5", borderBottomColor: "#000", borderBottomWidth: 1 },
   headerText: { fontWeight: "bold" },
   colProduct: { flex: 1.5, paddingLeft: 5 },
   colDesc: { flex: 2, fontSize: 9, color: "#555" },
   colQty: { flex: 0.5, textAlign: "center" },
   colPrice: { flex: 1, textAlign: "right", paddingRight: 5 },
   summaryContainer: { marginTop: 40, flexDirection: "row", justifyContent: "flex-end" },
   summaryBox: { width: 160 },
   summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
   totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1pt solid #000" },
   totalLabel: { fontSize: 14, fontWeight: "bold" },
   totalAmount: { fontSize: 14, fontWeight: "bold" },
   footer: { position: "absolute", bottom: 40, left: 40, right: 40, borderTop: "0.5pt solid #EEE", paddingTop: 10, textAlign: "center", fontSize: 8, color: "#AAA" }
});

interface Props {
   data: InvoiceData | null;
}

const InvoicePDF: React.FC<Props> = ({ data }) => {
   if (!data) return null;

   const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

   return (
      <Document>
         <Page size="A4" style={styles.page}>
            <View style={styles.header}>
               <View>
                  <Text style={styles.invoiceTitle}>INVOICE</Text>
                  <Text style={styles.infoText}>No: {data.invoiceNumber}</Text>
               </View>
               <View style={{ textAlign: "right" }}>
                  <Text style={styles.sectionTitle}>Date</Text>
                  <Text style={styles.infoText}>{data.date}</Text>
               </View>
            </View>

            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Bill To</Text>
               <Text style={styles.clientName}>{data.clientName}</Text>
            </View>

            <View style={styles.table}>
               <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.colProduct, styles.headerText]}>Item</Text>
                  <Text style={[styles.colDesc, styles.headerText]}>Description</Text>
                  <Text style={[styles.colQty, styles.headerText]}>Qty</Text>
                  <Text style={[styles.colPrice, styles.headerText]}>Unit Price</Text>
               </View>

               {data.items.map((item, i) => (
                  <View key={i} style={styles.tableRow}>
                     <Text style={styles.colProduct}>{item.name}</Text>
                     <Text style={styles.colDesc}>{item.description}</Text>
                     <Text style={styles.colQty}>{item.quantity}</Text>
                     <Text style={styles.colPrice}>${item.price.toFixed(2)}</Text>
                  </View>
               ))}
            </View>

            <View style={styles.summaryContainer}>
               <View style={styles.summaryBox}>
                  <View style={styles.summaryRow}>
                     <Text>Subtotal</Text>
                     <Text>${subtotal.toFixed(2)}</Text>
                  </View>
                  <View style={styles.totalRow}>
                     <Text style={styles.totalLabel}>Total Amount</Text>
                     <Text style={styles.totalAmount}>${subtotal.toFixed(2)}</Text>
                  </View>
               </View>
            </View>

            <Text style={styles.footer}>
               Thank you for your business.
            </Text>
         </Page>
      </Document>
   );
};

export default InvoicePDF;