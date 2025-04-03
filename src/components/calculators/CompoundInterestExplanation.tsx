
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CompoundInterestExplanation = () => {
  return (
    <Card className="mt-8 shadow-md animate-slide-up">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle>Understanding Compound Interest</CardTitle>
        <CardDescription className="text-white/80">
          The eighth wonder of the world that can transform your financial future
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="prose prose-green max-w-none">
          <h2 className="text-2xl font-semibold text-primary mb-4">What is Compound Interest?</h2>
          
          <p className="text-textDark mb-4">
            Compound interest is often called <strong>"the eighth wonder of the world"</strong> for good reason. Unlike simple interest, which only earns interest on the principal amount, compound interest allows you to earn interest on both your principal <em>and</em> on the interest you've already earned. This creates a powerful snowball effect that accelerates your wealth growth over time.
          </p>

          <p className="text-textDark mb-6">
            When Albert Einstein reportedly called compound interest "the most powerful force in the universe," he wasn't exaggerating. Compound interest is the foundation of long-term investing and wealth building, helping even modest investments grow exponentially over extended periods.
          </p>
          
          <div className="bg-secondary/10 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-medium text-primary mb-2">The Magic Formula</h3>
            <p className="text-sm mb-3">For annual compounding, the mathematical formula is:</p>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="font-mono text-center">A = P(1 + r)<sup>t</sup></p>
              <p className="text-xs mt-2">
                <strong>Where:</strong><br />
                A = Final amount<br />
                P = Principal (initial investment)<br />
                r = Interest rate (decimal)<br />
                t = Time period in years
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-primary mb-4">Why Compound Interest is Crucial for Your Financial Goals</h2>
          
          <p className="text-textDark mb-4">
            Understanding and leveraging compound interest is essential for achieving your long-term financial objectives. Here's why:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Wealth Accumulation:</strong> Even modest regular investments can grow to significant amounts over decades thanks to compounding.
            </li>
            <li>
              <strong>Retirement Planning:</strong> Starting early with compound interest working for you means needing to save less overall to reach your retirement goals.
            </li>
            <li>
              <strong>Financial Freedom:</strong> The growth potential of compound interest helps create passive income streams that can support your lifestyle without active work.
            </li>
            <li>
              <strong>Legacy Building:</strong> Long-term compounding allows you to build wealth that can benefit future generations.
            </li>
          </ul>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-medium text-primary">Key Factors Affecting Compound Interest</AccordionTrigger>
              <AccordionContent className="text-textDark">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Time Horizon:</strong> Arguably the most powerful factor. The longer your money compounds, the more dramatic the growth. Starting early is crucial.
                  </li>
                  <li>
                    <strong>Interest Rate:</strong> Higher rates lead to faster growth. Even a 1-2% difference in returns can result in dramatically different outcomes over decades.
                  </li>
                  <li>
                    <strong>Compounding Frequency:</strong> More frequent compounding (daily vs. monthly vs. yearly) results in faster growth, though the difference is often modest.
                  </li>
                  <li>
                    <strong>Regular Contributions:</strong> Adding regular investments accelerates growth by providing more principal for compounding.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-medium text-primary">The Rule of 72: A Quick Mental Calculation</AccordionTrigger>
              <AccordionContent className="text-textDark">
                <p className="mb-3">
                  The Rule of 72 is a simplified way to estimate how long it will take for your investment to double at a given interest rate:
                </p>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="font-medium text-center">Years to double = 72 ÷ Interest Rate (%)</p>
                </div>
                <p className="mt-3">
                  For example, at 8% interest, your investment would double in approximately 72 ÷ 8 = 9 years. At 12%, it would take just 6 years to double.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-medium text-primary">Strategic Investment Applications</AccordionTrigger>
              <AccordionContent className="text-textDark">
                <div className="space-y-3">
                  <h4 className="font-semibold">Systematic Investment Plans (SIPs)</h4>
                  <p>
                    SIPs in mutual funds allow you to invest fixed amounts regularly, benefiting from rupee cost averaging while harnessing the power of compound interest over time.
                  </p>
                  
                  <h4 className="font-semibold">Tax-Advantaged Accounts</h4>
                  <p>
                    In India, instruments like Public Provident Fund (PPF), Employee Provident Fund (EPF), and National Pension Scheme (NPS) offer tax benefits while allowing your money to compound.
                  </p>
                  
                  <h4 className="font-semibold">Dividend Reinvestment</h4>
                  <p>
                    Reinvesting dividends instead of taking them as cash allows those dividends to generate their own returns, significantly boosting long-term performance.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Real-World Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-primary mb-2">The Early Starter</h3>
              <p className="text-sm">
                Raj starts investing ₹10,000 monthly at age 25, earning 8% annually. By 60, he invests ₹42 lakhs but his investment grows to <strong>approximately ₹2.3 crores</strong>, with ₹1.88 crores being interest earned.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-primary mb-2">The Late Starter</h3>
              <p className="text-sm">
                Priya starts the same ₹10,000 monthly investment at age 40, also earning 8%. By 60, she invests ₹24 lakhs but her investment only grows to <strong>approximately ₹59 lakhs</strong>, with ₹35 lakhs being interest.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-primary mb-4">Tips for Maximizing Compound Interest</h2>
          
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>
              <strong>Start Early:</strong> Even small amounts invested early can outperform larger investments made later.
            </li>
            <li>
              <strong>Be Consistent:</strong> Regular contributions through SIPs or automated investments enhance the compounding effect.
            </li>
            <li>
              <strong>Reinvest Earnings:</strong> Allow dividends and interest to be reinvested rather than withdrawn.
            </li>
            <li>
              <strong>Minimize Fees:</strong> High investment fees can significantly reduce your effective compounding rate.
            </li>
            <li>
              <strong>Stay Invested:</strong> Long-term investments allow compound interest to work its full magic.
            </li>
          </ol>

          <div className="bg-primary/10 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-medium text-primary mb-3">The Bottom Line</h3>
            <p className="italic">
              "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it."
            </p>
            <p className="text-right mt-1">- Attributed to Albert Einstein</p>
          </div>

          <p className="text-textDark">
            When it comes to building wealth, time is your greatest ally. The sooner you understand and apply the principle of compound interest, the more it can work in your favor. Use our calculator above to experiment with different scenarios and see firsthand how your investments could grow over time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompoundInterestExplanation;
