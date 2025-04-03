
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FinWise Growth Hub</h3>
            <p className="text-sm">
              Empowering financial decision-making through interactive calculators and educational resources.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculators</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/" className="hover:text-accent transition-colors">
                  Compound Interest Calculator
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">
              Have questions or suggestions? Email us at:
              <br />
              <a href="mailto:info@finwisehub.com" className="hover:text-accent transition-colors">
                info@finwisehub.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm">
          <p>© {currentYear} FinWise Growth Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
