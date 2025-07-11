import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const Barchart = ({ data }) => {
  console.log("Values ::", data);
  return (
    <div className="w-full h-[400px] m-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* XAxis for Months */}
          <XAxis
            dataKey="month"
            type="category"
            interval={0}
            tick={{ fontSize: 12 }}
            ticks={[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ]}
          />

          {/* YAxis for Total Bookings */}
          <YAxis
            tick={{ fontSize: 12 }}
            domain={[0, 20]} // optional; change based on your expected range
            ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
            label={{ value: "Total Bookings", angle: -90, position: "insideLeft" }}
          />

          <Tooltip />
          <Bar dataKey="totalBookings" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
