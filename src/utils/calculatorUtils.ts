
// Utility functions for the compound interest calculator

export interface CompoundInterestResult {
  year: number;
  investmentValue: number;
  interestEarned: number;
  totalDeposited: number;
  annualContribution: number;
}

export interface CompoundInterestParams {
  principal: number;
  annualContribution: number;
  contributionFrequency: string;
  interestRate: number;
  compoundingFrequency: string;
  years: number;
}

export const calculateCompoundInterest = (params: CompoundInterestParams): CompoundInterestResult[] => {
  const { principal, annualContribution, contributionFrequency, interestRate, compoundingFrequency, years } = params;
  
  // Convert interest rate from percentage to decimal
  const rate = interestRate / 100;
  
  // Determine number of times interest is compounded per year
  let compoundsPerYear: number;
  switch (compoundingFrequency) {
    case 'annually':
      compoundsPerYear = 1;
      break;
    case 'semi-annually':
      compoundsPerYear = 2;
      break;
    case 'quarterly':
      compoundsPerYear = 4;
      break;
    case 'monthly':
      compoundsPerYear = 12;
      break;
    case 'daily':
      compoundsPerYear = 365;
      break;
    default:
      compoundsPerYear = 12; // Default to monthly
  }
  
  // Determine contribution per compounding period
  let contributionsPerYear: number;
  switch (contributionFrequency) {
    case 'annually':
      contributionsPerYear = 1;
      break;
    case 'semi-annually':
      contributionsPerYear = 2;
      break;
    case 'quarterly':
      contributionsPerYear = 4;
      break;
    case 'monthly':
      contributionsPerYear = 12;
      break;
    default:
      contributionsPerYear = 12; // Default to monthly
  }
  
  const contributionPerPeriod = annualContribution / contributionsPerYear;
  const periodsPerContribution = compoundsPerYear / contributionsPerYear;
  
  const results: CompoundInterestResult[] = [];
  let totalValue = principal;
  let totalContributions = principal;
  
  for (let year = 0; year <= years; year++) {
    if (year === 0) {
      results.push({
        year,
        investmentValue: totalValue,
        interestEarned: 0,
        totalDeposited: principal,
        annualContribution: 0
      });
      continue;
    }

    let yearStart = totalValue;
    
    // Calculate compounding for this year
    for (let period = 0; period < contributionsPerYear; period++) {
      // Add contribution
      totalValue += contributionPerPeriod;
      totalContributions += contributionPerPeriod;
      
      // Compound interest for this period
      for (let i = 0; i < periodsPerContribution; i++) {
        totalValue *= (1 + (rate / compoundsPerYear));
      }
    }
    
    results.push({
      year,
      investmentValue: totalValue,
      interestEarned: totalValue - totalContributions,
      totalDeposited: totalContributions,
      annualContribution: annualContribution
    });
  }
  
  return results;
};

// Format numbers as Indian Rupees
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// Format large numbers in readable format (like 1 crore, 10 lakhs)
export const formatIndianLargeNumber = (num: number): string => {
  if (num >= 10000000) { // 1 crore
    return `${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) { // 1 lakh
    return `${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(2)} K`;
  }
  return num.toString();
};
