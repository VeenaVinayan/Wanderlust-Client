import React,{ useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { getDashboard } from "../../services/Admin/Dashboard";
import Barchart from '../Charts/Barchart';
import Piechart from '../Charts/Piechart';
import { TMonthBooking , TBookingPerPackages} from '../../types/bookingTypes';

const AdminDashboard: React.FC = () => {
  const [ dashboard, setDashboard] = useState({
      total:0,
      totalBooking:0,
      profit:0
  });
 const [topPackages, setTopPackages ] = useState<TBookingPerPackages[]>([])
 const [ bookingPerMonth, setBookingPerMonth] = useState<TMonthBooking[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getDashboard();
      console.log("values :::",data.summary);
      setDashboard(data.data.summary);
      setBookingPerMonth(data.data.bookingsPerMonth);
      if(data.data.topPackages){
         setTopPackages(data.data.topPackages);
      }
     
    })();
  },[]);

return (
 <> 
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
    {[
      {
        title: "Total Profit",
        value: `₹${Math.ceil(dashboard.profit)}`,
        iconColor: "bg-green-100 text-green-600",
        textColor: "text-green-600",
        note: "↑ 10% of Total"
      },
      {
        title: "Total Revenue",
        value: `₹${dashboard.total}`,
        iconColor: "bg-blue-100 text-blue-600",
        textColor: "text-blue-600",
        note: "↑ Calculated from Bookings"
      },
      {
        title: "Total Booking",
        value: dashboard.totalBooking,
        iconColor: "bg-purple-100 text-purple-600",
        textColor: "text-purple-600",
        note: "↑ All Completed Trips"
      },
      {
        title: "Trending Package",
        value: topPackages[0]?.packageName || "Not Available",
        iconColor: "bg-yellow-100 text-yellow-600",
        textColor: "text-yellow-600",
        note: "↑ Based on Bookings"
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex items-center gap-4"
      >
        <div className={`${item.iconColor} rounded-full p-3`}>
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {item.title}
          </h2>
          <p className="text-2xl font-bold text-gray-800">{item.value}</p>
          <span className={`text-xs ${item.textColor}`}>{item.note}</span>
        </div>
      </div>
    ))}
  </div>

  {/* Section Title */}
  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">Travel Analytics Overview</h2>

  {/* Chart Section */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Bookings</h3>
      <Barchart data={bookingPerMonth} />
    </div>
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 5 Packages</h3>
      <Piechart data={topPackages} />
    </div>
  </div>
</div>



 </>
);
};

export default AdminDashboard;
