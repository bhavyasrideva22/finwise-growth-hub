
import { toast } from "sonner";
import { CompoundInterestResult } from "./calculatorUtils";
import { generatePdf } from "./pdfGenerator";

// This is a client-side simulation of email sending
// In a real project, this would call a backend API endpoint
export const sendResultsByEmail = async (
  email: string,
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
  // Show loading toast
  toast.loading("Preparing email...");
  
  try {
    // In a real application, this would make an API call to send the email with PDF attachment
    // For this demo, we'll simulate a successful email send after a short delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success notification
    toast.success(`Results sent to ${email}`, {
      description: "Check your inbox for your compound interest calculation results."
    });
    
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    toast.error("Failed to send email", { 
      description: "Please try again or download the PDF directly."
    });
    return false;
  }
};
