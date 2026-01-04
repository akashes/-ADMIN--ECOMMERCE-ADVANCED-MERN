import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToExcel = (orders) => {
  const worksheet = XLSX.utils.json_to_sheet(
    orders.map(order => ({
      "Order ID": order._id,
      "Name": order.name,
      "Email": order.email,
      "Phone": order.delivery_address?.mobile,
      "Total": order.total,
      "Payment Method": order.payment_method.toUpperCase(),
      "Payment Status": order.payment_status,
      "Order Status": order.order_status,
      "Date": new Date(order.createdAt).toLocaleDateString(),
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  XLSX.writeFile(workbook, "Orders.xlsx");
};

export const exportToPDF = (orders) => {
  const doc = new jsPDF();
  doc.text("Orders Report", 14, 15);

  const tableColumn = [
    "Order ID",
    "Name",
    "Email",
    "Total",
    "Payment",
    "Order Status",
    "Date",
  ];
  const tableRows = [];

  orders.forEach(order => {
    tableRows.push([
      order._id,
      order.name,
      order.email,
      order.total,
      order.payment_method.toUpperCase(),
      order.order_status,
      new Date(order.createdAt).toLocaleDateString(),
    ]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("Orders.pdf");
};
