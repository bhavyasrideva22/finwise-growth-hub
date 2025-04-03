
import Layout from "@/components/layout/Layout";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Compound Interest Calculator</h1>
          <p className="text-lg text-textDark">
            Plan your financial future with our interactive calculator and visualize the power of compound interest.
          </p>
        </section>
        
        <CompoundInterestCalculator />
      </div>
    </Layout>
  );
};

export default Index;
