'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';

export default function DownloadReportButton({ report, monthName, year }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text('FUSION GYM', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`Monthly Financial Report - ${monthName} ${year}`, pageWidth / 2, 30, { align: 'center' });
    
    doc.setLineWidth(0.5);
    doc.line(14, 35, pageWidth - 14, 35);

    // Summary Section
    doc.setFontSize(12);
    doc.text('Financial Summary', 14, 45);
    doc.setFontSize(10);
    
    const summaryData = [
      ['Total Fees Collected', `Rs. ${report.totalFees.toFixed(2)}`],
      ['Total Expenses', `Rs. ${report.totalExpenses.toFixed(2)}`],
      ['Supplement Gross Revenue', `Rs. ${report.supplementRevenue.toFixed(2)}`],
      ['Supplement COGS', `Rs. ${report.supplementCost.toFixed(2)}`],
      ['Net Supplement Profit', `Rs. ${report.netSupplementProfit.toFixed(2)}`],
      ['TOTAL NET PROFIT', `Rs. ${report.profit.toFixed(2)}`]
    ];

    autoTable(doc, {
      startY: 50,
      head: [['Category', 'Amount']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [127, 255, 0], textColor: [0, 0, 0], fontStyle: 'bold' },
      margin: { top: 10, left: 14, right: 14 },
    });

    let currentY = doc.lastAutoTable.finalY + 15;

    // Monthly Fees Table
    doc.setFontSize(12);
    doc.text('Monthly Fee Payments (For this month)', 14, currentY);
    
    const feePayments = report.validPayments.filter(p => p.payment_type !== 'ADMISSION');
    const feeData = feePayments.map(p => [
      p.member_name,
      p.date,
      `Rs. ${p.amount}`,
      `${p.months_covered} Months`,
      p.mode
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Member Name', 'Payment Date', 'Amount', 'Coverage', 'Mode']],
      body: feeData.length > 0 ? feeData : [['No data', '', '', '', '']],
      theme: 'striped',
      headStyles: { fillColor: [40, 40, 40] }
    });

    currentY = doc.lastAutoTable.finalY + 15;
    
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }

    // Admission Fees Table
    doc.setFontSize(12);
    doc.text('New Admissions (For this month)', 14, currentY);
    
    const admissionPayments = report.validPayments.filter(p => p.payment_type === 'ADMISSION');
    const admissionData = admissionPayments.map(p => [
      p.member_name,
      p.date,
      `Rs. ${p.amount}`,
      p.mode
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Member Name', 'Payment Date', 'Amount', 'Mode']],
      body: admissionData.length > 0 ? admissionData : [['No data', '', '', '']],
      theme: 'striped',
      headStyles: { fillColor: [80, 40, 80] }
    });

    currentY = doc.lastAutoTable.finalY + 15;
    
    // Check if new page is needed for Expenses
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }

    // Expenses Table
    doc.setFontSize(12);
    doc.text('Expenses Breakdown', 14, currentY);
    
    const expensesData = report.expenses.map(e => [
      e.date,
      e.category,
      e.description || '-',
      `Rs. ${e.amount.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Date', 'Category', 'Description', 'Amount']],
      body: expensesData.length > 0 ? expensesData : [['No data', '', '', '']],
      theme: 'striped',
      headStyles: { fillColor: [200, 40, 40] }
    });

    currentY = doc.lastAutoTable.finalY + 15;
    
    // Check if new page is needed for Supplements
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }

    // Supplements Table
    doc.setFontSize(12);
    doc.text('Supplements Sold', 14, currentY);
    
    const supplementsData = report.supplements.map(s => {
      const cogs = s.cost_at_sale * s.quantity_sold;
      const profit = s.price - cogs;
      return [
        s.date,
        s.buyer_name,
        s.item,
        s.quantity_sold,
        `Rs. ${s.price.toFixed(2)}`,
        `Rs. ${profit.toFixed(2)}`
      ];
    });

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Date', 'Buyer Name', 'Item', 'Qty', 'Sell Price', 'Profit']],
      body: supplementsData.length > 0 ? supplementsData : [['No data', '', '', '', '', '']],
      theme: 'striped',
      headStyles: { fillColor: [0, 150, 200] }
    });

    // Save PDF
    doc.save(`Fusion_Gym_Report_${monthName}_${year}.pdf`);
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary" style={{ padding: '0.5rem 1rem', marginRight: '1rem', whiteSpace: 'nowrap' }}>
      <Download size={18} />
      Export PDF
    </button>
  );
}
