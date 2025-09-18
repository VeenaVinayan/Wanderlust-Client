import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { TMonthBooking } from '../../types/bookingTypes';
type Props = {
  data: TMonthBooking[];
};
const Barchart = ({data} : Props) => {
   return (
    <div className="w-full h-[400px] m-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

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
          <YAxis
            tick={{ fontSize: 12 }}
            domain={[0, 20]} 
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
