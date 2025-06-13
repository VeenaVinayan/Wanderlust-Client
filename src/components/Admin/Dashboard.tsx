import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { getDashboard } from "../../services/Admin/Dashboard";
const AdminDashboard: React.FC = () => {
 
  const [totalProfit, setTotalProfit] = useState<number>(0);
  
  useEffect(() => {
    (async () => {
      const data = await getDashboard();
      console.log(data.data);
      setTotalProfit(Math.ceil(data.data));
    })();
  },[]);

  return (
   <div className="w-64 h-64 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 border border-gray-200">
      {/* Icon */}
      <div className="bg-green-100 text-green-600 rounded-full p-3">
        <TrendingUp className="w-6 h-6" />
      </div>
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Total Profit
        </h2>
        <p className="text-2xl font-bold text-gray-800">
          ₹{totalProfit}
        </p>
        <span className="text-xs text-green-600">↑  10%  of  Total</span>
      </div>
    </div>
  );
};

export default AdminDashboard;
