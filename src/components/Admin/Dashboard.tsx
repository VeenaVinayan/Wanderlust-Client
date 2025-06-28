import React,{ useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { getDashboard } from "../../services/Admin/Dashboard";
import Barchart from '../Charts/Barchart';
import Piechart from '../Charts/Piechart';

const AdminDashboard: React.FC = () => {
  const [ dashboard, setDashboard] = useState({
      total:0,
      totalBooking:0,
      profit:0
  })
  const packages =[
     {name:"Delicious Calicut" ,value: 5},
      {name:"Gokarana Splash" ,value: 2},
      {name:"Kedarkana Trek" ,value: 3},
      {name:"Heritage Fortkochi",value : 4},
      
  ];
  const [ bookingPerMonth, setBookingPerMonth] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getDashboard();
      console.log("values :::",data.summary);
      setDashboard(data.data.summary);
      setBookingPerMonth(data.data.bookingsPerMonth);
    })();
  },[]);

  return (
  <div> 
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Total Profit */}
  <div className="w-full h-64 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 border border-gray-200">
    <div className="bg-green-100 text-green-600 rounded-full p-3">
      <TrendingUp className="w-6 h-6" />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Total Profit
      </h2>
      <p className="text-2xl font-bold text-gray-800">
        ₹{Math.ceil(dashboard.profit)}
      </p>
      <span className="text-xs text-green-600">↑ 10% of Total</span>
    </div>
  </div>

  {/* Total Revenue */}
  <div className="w-full h-64 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 border border-gray-200">
    <div className="bg-blue-100 text-blue-600 rounded-full p-3">
      <TrendingUp className="w-6 h-6" />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Total Revenue
      </h2>
      <p className="text-2xl font-bold text-gray-800">
        ₹{dashboard.total}
      </p>
      <span className="text-xs text-blue-600">↑ Calculated from Bookings</span>
    </div>
  </div>

  {/* Total Booking */}
  <div className="w-full h-64 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 border border-gray-200">
    <div className="bg-purple-100 text-purple-600 rounded-full p-3">
      <TrendingUp className="w-6 h-6" />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Total Booking
      </h2>
      <p className="text-2xl font-bold text-gray-800">
        {dashboard.totalBooking}
      </p>
      <span className="text-xs text-purple-600">↑ All Completed Trips</span>
    </div>
  </div>
</div>
<h2 className="text-2xl font-bold text-gray-800 mb-6 px-5">Travel Analytics Overview</h2>
<div className="flex flex-row items-center justify-center mt-10">

<div >
    <Barchart data={bookingPerMonth} />
</div>
<div>
    <Piechart data={packages} />
</div>
</div>
</div> 
  );
};

export default AdminDashboard;
