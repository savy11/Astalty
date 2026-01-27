"use client";
import Header from '../components/header';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";


// #region Sample data
const data = [
  {
    name: "Jun 25",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Jul 25",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Aug 25",
    uv: 2000,
    pv: 19800,
    amt: 2290,
  },
  {
    name: "Sept 25",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Oct 25",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Nov 25",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Dec 25",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
// #endregion

export default function Page() {
  return (
    <div className="xl:w-auto w-full">
      <Header activeKey="Dashboard" />

      <div className="p-4 flex gap-4">
        <div className="w-1/2 border border-gray-200 rounded-lg p-4 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Billing</h1>

          <LineChart
            style={{
              width: "100%",
              maxWidth: "700px",
              height: "100%",
              maxHeight: "70vh",
              aspectRatio: 1.618,
            }}
            responsive
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="w-1/2 border border-gray-200 rounded-lg p-4 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Revenue</h1>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
