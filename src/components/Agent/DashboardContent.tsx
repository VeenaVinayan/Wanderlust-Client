import React from 'react';

const AgentDashboard : React.FC= () => {
  // Dummy data
  const data = {
    totalPackages: 8,
    totalBookings: 120,
    totalAmount: 480000,
    bookingsPerMonth: [
      { month: '2025-01', count: 10 },
      { month: '2025-02', count: 15 },
      { month: '2025-03', count: 25 },
      { month: '2025-04', count: 30 },
      { month: '2025-05', count: 40 },
    ],
    mostBookedPackage: {
      name: 'Kerala Backwater Tour',
      bookings: 50,
      image:
        'https://via.placeholder.com/100x60.png?text=Package+Image',
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Agent Dashboard</h1>

      {/* Profile Overview */}
      {/* <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Profile Overview</h2>
        <p>Name: <span className="font-medium">John Agent</span></p>
        <p>Email: john.agent@example.com</p>
      </div> */}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">
          <h3 className="font-semibold">Total Packages</h3>
          <p className="text-2xl">{data.totalPackages}</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">
          <h3 className="font-semibold">Total Bookings</h3>
          <p className="text-2xl">{data.totalBookings}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow">
          <h3 className="font-semibold">Total Revenue</h3>
          <p className="text-2xl">₹{data.totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Bookings Per Month */}
      {/* <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Bookings Per Month</h2>
        <ul className="space-y-1">
          {data.bookingsPerMonth.map((item) => (
            <li key={item.month} className="flex justify-between">
              <span>{item.month}</span>
              <span>{item.count} bookings</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Most Booked Package */}
      {/* <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Most Booked Package</h2>
        <div className="flex items-center space-x-4">
          <img
            src={data.mostBookedPackage.image}
            alt="Most Booked"
            className="w-24 h-16 object-cover rounded-md"
          />
          <div>
            <h3 className="text-lg font-medium">{data.mostBookedPackage.name}</h3>
            <p>{data.mostBookedPackage.bookings} bookings</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AgentDashboard;
