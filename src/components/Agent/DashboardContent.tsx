import React from 'react'

const DashboardContent :React.FC =() => {
  return (
    <div>
         <div className="grid grid-cols-3 gap-6">
            {/* Dashboard Cards */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-700">Total Bookings</h3>
              <p className="text-2xl font-semibold text-blue-600">120</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-700">Earnings</h3>
              <p className="text-2xl font-semibold text-green-600">$4,500</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-700">Active Clients</h3>
              <p className="text-2xl font-semibold text-purple-600">32</p>
            </div>
          </div>
         
    </div>
  )
}
export default DashboardContent;
