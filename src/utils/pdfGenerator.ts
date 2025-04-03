
import { jsPDF } from "jspdf";
import { CompoundInterestResult } from "./calculatorUtils";
import autoTable from "jspdf-autotable";

export const generatePdf = (
  results: CompoundInterestResult[],
  params: {
    principal: number;
    annualContribution: number;
    contributionFrequency: string;
    interestRate: number;
    compoundingFrequency: string;
    years: number;
  }
) => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString("en-IN");

  // Add header with logo and title
  doc.setFillColor(36, 94, 79); // #245e4f (primary color)
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("FinWise Growth Hub", 20, 20);
  
  doc.setFontSize(16);
  doc.text("Compound Interest Calculator Results", 20, 30);

  // Add report date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Generated on: ${currentDate}`, 150, 45);

  // Add input parameters section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(36, 94, 79); // #245e4f
  doc.text("Your Investment Details", 20, 55);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51); // #333333

  // Parameters table
  const paramTable = [
    ["Initial Investment", `₹${params.principal.toLocaleString("en-IN")}`],
    ["Annual Contribution", `₹${params.annualContribution.toLocaleString("en-IN")}`],
    ["Contribution Frequency", params.contributionFrequency],
    ["Interest Rate", `${params.interestRate}%`],
    ["Compounding Frequency", params.compoundingFrequency],
    ["Investment Period", `${params.years} Years`],
  ];

  autoTable(doc, {
    startY: 60,
    head: [["Parameter", "Value"]],
    body: paramTable,
    theme: "grid",
    headStyles: {
      fillColor: [36, 94, 79], // primary color
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: { fontSize: 10 },
  });

  // Summary section
  const finalResult = results[results.length - 1];
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(36, 94, 79);
  doc.text("Investment Summary", 20, doc.lastAutoTable.finalY + 20);

  const summaryTable = [
    ["Total Amount Invested", `₹${finalResult.totalDeposited.toLocaleString("en-IN")}`],
    ["Interest Earned", `₹${finalResult.interestEarned.toLocaleString("en-IN")}`],
    ["Final Investment Value", `₹${finalResult.investmentValue.toLocaleString("en-IN")}`],
  ];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 25,
    body: summaryTable,
    theme: "grid",
    styles: { fontSize: 12 },
    columnStyles: {
      0: { fontStyle: "bold" },
      1: { halign: "right" },
    },
  });

  // Year-by-year breakdown
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(36, 94, 79);
  doc.text("Year-by-Year Breakdown", 20, doc.lastAutoTable.finalY + 20);

  // Convert results into table data (skip initial state)
  const tableData = results.slice(1).map((item) => [
    item.year,
    `₹${item.totalDeposited.toLocaleString("en-IN")}`,
    `₹${item.interestEarned.toLocaleString("en-IN")}`,
    `₹${item.investmentValue.toLocaleString("en-IN")}`,
  ]);

  // Add results table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 25,
    head: [["Year", "Total Invested", "Interest Earned", "Investment Value"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [36, 94, 79], // primary color
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: { fontSize: 9 },
  });

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      "This is an estimation based on consistent returns. Actual investment performance may vary.",
      20,
      doc.internal.pageSize.height - 20
    );
    doc.text(
      "© FinWise Growth Hub | finwisehub.com",
      doc.internal.pageSize.width - 75,
      doc.internal.pageSize.height - 20
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 30,
      doc.internal.pageSize.height - 10
    );
  }

  return doc;
};

export const downloadPdf = (
  results: CompoundInterestResult[],
  params: {
    principal: number;
    annualContribution: number;
    contributionFrequency: string;
    interestRate: number;
    compoundingFrequency: string;
    years: number;
  }
) => {
  const doc = generatePdf(results, params);
  doc.save("FinWise-Compound-Interest-Results.pdf");
};
