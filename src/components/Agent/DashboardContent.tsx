import React ,{ useEffect , useState } from 'react';
import { getDashboard } from '../../services/Agent/AgentService';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import  Barchart  from '../Charts/Barchart';
import Piechart from '../Charts/Piechart';
import { TMonthBooking, TBookingPerPackages } from '../../types/bookingTypes';

const AgentDashboard : React.FC= () => {
  const agent = useSelector((state: RootState) => state.userData);
  const [dashBoard, setDashboard] = useState({
         totalPackages: 0,
         totalBookings:0,
         totalCancelledBookings:0,
         totalAmount:0,
         profit:0,
         totalClients:0
  });
  type ChartValues = {
    bookingsPerMonth: TMonthBooking[];
    packageBookingCounts: TBookingPerPackages[]; 
  };
 
  const [chartValues, setChartValues] = useState<ChartValues>({
    bookingsPerMonth: [],
    packageBookingCounts: [],
  });
  
  const convertToMonths = (data: { month: string; totalBookings: number }[]): TMonthBooking[] => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthsPerBooking = data.map((value) => {
      const monthIndex = Number(value.month) - 1;
      if (monthIndex >= 0 && monthIndex < months.length) {
        return {
          month: months[monthIndex],
          totalBookings: value.totalBookings,
        };
      }
      return undefined;
    }).filter((item): item is TMonthBooking => item !== undefined);
    console.log("Values :", monthsPerBooking);
    return monthsPerBooking;
  };
  useEffect(() => {
    const fetchData = async () => {
    const data = await getDashboard(agent.id);
    const { totalPackages, totalAmount, totalBookings,totalClients,bookingsPerMonth, packageBookingCounts,totalCancelledBookings} = data;
    const bookingPermonths = convertToMonths(bookingsPerMonth);
    setDashboard({
      totalPackages,
      totalAmount,
      totalBookings,
      totalCancelledBookings,
      profit : Math.ceil(totalAmount * 0.15) || 0,
      totalClients,
    });
    setChartValues({
       bookingsPerMonth : bookingPermonths,
       packageBookingCounts,
    })
  };
    fetchData();
  },[]);
  return (
    <> 
      <h2 className='shadow-md font-semibold text-gray-500 text-center'>Performanace Overview</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 sm:p-6">
        <div className="bg-blue-100 text-blue-900 p-4 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-sm font-medium mb-1">Total Packages</h3>
          <p className="text-2xl font-bold">{dashBoard.totalPackages}</p>
        </div>

        <div className="bg-green-100 text-green-900 p-4 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-sm font-medium mb-1">Total Bookings</h3>
          <p className="text-2xl font-bold">{dashBoard.totalBookings}</p>
        </div>

        <div className="bg-yellow-100 text-yellow-900 p-4 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold">{dashBoard.totalAmount}</p>
        </div>

        <div className="bg-amber-100 text-amber-900 p-4 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-sm font-medium mb-1">Total Profit</h3>
          <p className="text-2xl font-bold">{dashBoard.profit}</p>
        </div>

        <div className="bg-indigo-100 text-indigo-900 p-4 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-sm font-medium mb-1">Total Clients</h3>
          <p className="text-2xl font-bold">{dashBoard.totalClients}</p>
        </div>

        <div className="bg-pink-100 text-pink-900 p-4 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-sm font-medium mb-1">Total Cancellations</h3>
          <p className="text-2xl font-bold">{dashBoard.totalCancelledBookings}</p>
        </div>
      </div>
   { chartValues.bookingsPerMonth.length >0 && chartValues.packageBookingCounts.length >0 && ( 
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mt-5">
     <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Travel Analytics Overview</h2>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">Monthly Bookings</h2>
          <Barchart data={chartValues.bookingsPerMonth} />
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3">Bookings by Package</h2>
          <Piechart data={chartValues.packageBookingCounts} />
        </div>
      </div>
    </div>
  )}
  </>
  );
};

export default AgentDashboard;
