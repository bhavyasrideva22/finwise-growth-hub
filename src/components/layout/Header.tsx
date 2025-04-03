
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Calculator size={24} className="text-white" />
          <h1 className="text-xl font-bold text-white">FinWise Growth Hub</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
