import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TBookingPerPackages } from "../../types/bookingTypes";
type Props ={
   data: TBookingPerPackages[];
}
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a28fd0"];

const PackagePieChart = ({ data }:Props) => {
  return (
    <div className="w-full h-[400px] m-5">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="packageName"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PackagePieChart;

