
import React, { useState, useEffect } from "react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Badge, BadgeIndianRupee, ChartBar, ChartPie, Download, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { calculateCompoundInterest, CompoundInterestResult, formatCurrency, formatIndianLargeNumber } from "@/utils/calculatorUtils";
import { downloadPdf } from "@/utils/pdfGenerator";
import { sendResultsByEmail } from "@/utils/emailSender";
import CompoundInterestExplanation from "./CompoundInterestExplanation";

const CompoundInterestCalculator = () => {
  // Input state
  const [principal, setPrincipal] = useState<number>(100000);
  const [annualContribution, setAnnualContribution] = useState<number>(60000);
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");
  const [interestRate, setInterestRate] = useState<number>(8);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("quarterly");
  const [years, setYears] = useState<number>(10);
  const [chartType, setChartType] = useState<string>("area");

  // Results and email state
  const [results, setResults] = useState<CompoundInterestResult[]>([]);
  const [emailAddress, setEmailAddress] = useState<string>("");

  // Calculate results when inputs change
  useEffect(() => {
    const calculationResults = calculateCompoundInterest({
      principal,
      annualContribution,
      contributionFrequency,
      interestRate,
      compoundingFrequency,
      years
    });
    setResults(calculationResults);
  }, [principal, annualContribution, contributionFrequency, interestRate, compoundingFrequency, years]);

  // Handle form input changes
  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setPrincipal(value);
  };

  const handleAnnualContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAnnualContribution(value);
  };

  const handleInterestRateChange = (values: number[]) => {
    setInterestRate(values[0]);
  };

  const handleYearsChange = (values: number[]) => {
    setYears(values[0]);
  };

  // Handle download PDF
  const handleDownloadPDF = () => {
    downloadPdf(results, {
      principal,
      annualContribution,
      contributionFrequency,
      interestRate,
      compoundingFrequency,
      years
    });
  };

  // Handle send email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAddress) return;

    await sendResultsByEmail(
      emailAddress, 
      results,
      {
        principal,
        annualContribution,
        contributionFrequency,
        interestRate,
        compoundingFrequency,
        years
      }
    );
  };

  // Format for chart
  const chartData = results.map(result => ({
    year: `Year ${result.year}`,
    principal: result.totalDeposited,
    interest: result.interestEarned,
    total: result.investmentValue
  }));

  // Prepare data for pie chart
  const finalResult = results[results.length - 1] || { totalDeposited: 0, interestEarned: 0 };
  const pieData = [
    { name: "Principal Invested", value: finalResult.totalDeposited },
    { name: "Interest Earned", value: finalResult.interestEarned }
  ];
  
  // Pie chart colors
  const COLORS = ["#245e4f", "#7ac9a7"];

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Inputs */}
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BadgeIndianRupee className="h-6 w-6" />
              <span>Compound Interest Calculator</span>
            </CardTitle>
            <CardDescription className="text-white/80">
              Project your investment growth over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="principal">Initial Investment (₹)</Label>
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={handlePrincipalChange}
                  className="focus:ring-primary focus:border-primary"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualContribution">Annual Contribution (₹)</Label>
                <Input
                  id="annualContribution"
                  type="number"
                  value={annualContribution}
                  onChange={handleAnnualContributionChange}
                  className="focus:ring-primary focus:border-primary"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contributionFrequency">Contribution Frequency</Label>
                <Select 
                  value={contributionFrequency} 
                  onValueChange={setContributionFrequency}
                >
                  <SelectTrigger id="contributionFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <span className="text-sm font-medium">{interestRate}%</span>
                </div>
                <Slider
                  id="interestRate"
                  min={1}
                  max={20}
                  step={0.1}
                  value={[interestRate]}
                  onValueChange={handleInterestRateChange}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
                <Select 
                  value={compoundingFrequency} 
                  onValueChange={setCompoundingFrequency}
                >
                  <SelectTrigger id="compoundingFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annually">Annually</SelectItem>
                    <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="years">Investment Period (Years)</Label>
                  <span className="text-sm font-medium">{years} years</span>
                </div>
                <Slider
                  id="years"
                  min={1}
                  max={40}
                  step={1}
                  value={[years]}
                  onValueChange={handleYearsChange}
                  className="py-4"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results and Charts */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle>Investment Growth Projection</CardTitle>
            <CardDescription className="text-white/80">
              Visualize how your investment grows over time
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-secondary/20 rounded-lg p-4 text-center">
                <h3 className="text-sm font-medium text-gray-600">Total Investment</h3>
                <p className="text-2xl font-bold text-primary mt-2">
                  {formatCurrency(finalResult.totalDeposited)}
                </p>
              </div>
              <div className="bg-accent/20 rounded-lg p-4 text-center">
                <h3 className="text-sm font-medium text-gray-600">Interest Earned</h3>
                <p className="text-2xl font-bold text-primary mt-2">
                  {formatCurrency(finalResult.interestEarned)}
                </p>
              </div>
              <div className="bg-primary/20 rounded-lg p-4 text-center">
                <h3 className="text-sm font-medium text-gray-600">Final Value</h3>
                <p className="text-2xl font-bold text-primary mt-2">
                  {formatCurrency(finalResult.investmentValue)}
                </p>
              </div>
            </div>

            {/* Chart Type Selection */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant={chartType === "area" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("area")}
                  className="flex items-center gap-1"
                >
                  <ChartBar className="h-4 w-4" /> Area
                </Button>
                <Button 
                  variant={chartType === "pie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("pie")}
                  className="flex items-center gap-1"
                >
                  <ChartPie className="h-4 w-4" /> Pie
                </Button>
                <Button 
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                  className="flex items-center gap-1"
                >
                  <ChartBar className="h-4 w-4" /> Bar
                </Button>
              </div>

              <div className="flex space-x-2">
                {/* Download PDF Button */}
                <Button 
                  variant="outline" 
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                
                {/* Email Results Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1"
                    >
                      <Mail className="h-4 w-4" /> Email Results
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Email Your Results</DialogTitle>
                      <DialogDescription>
                        We'll send you a detailed report with your compound interest calculations.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSendEmail} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Send Results</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Charts */}
            <div className="h-80 mt-4">
              {chartType === "area" && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fontSize: 12 }}
                      interval={Math.ceil(years / 10)}
                    />
                    <YAxis 
                      tickFormatter={(value) => formatIndianLargeNumber(value)} 
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="principal"
                      name="Principal Invested"
                      stackId="1"
                      stroke="#245e4f"
                      fill="#245e4f"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="interest"
                      name="Interest Earned"
                      stackId="1"
                      stroke="#7ac9a7"
                      fill="#7ac9a7"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {chartType === "bar" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData.filter((_, index) => index % Math.ceil(years / 10) === 0)}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tickFormatter={(value) => formatIndianLargeNumber(value)} 
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="principal" 
                      name="Principal Invested"
                      stackId="a" 
                      fill="#245e4f" 
                    />
                    <Bar 
                      dataKey="interest" 
                      name="Interest Earned"
                      stackId="a" 
                      fill="#7ac9a7" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {chartType === "pie" && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Content */}
      <CompoundInterestExplanation />
    </div>
  );
};

export default CompoundInterestCalculator;
