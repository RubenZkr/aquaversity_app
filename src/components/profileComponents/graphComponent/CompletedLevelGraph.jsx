import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";

export default function CompletedLevelGraph({ progress }) {
  // This represents the completion status of each level.
  const levelCompletionData = progress.map((item) => ({
    ...item,
    completedOn: new Date(item.completedOn).getTime(), // Convert to timestamp
  }));

  console.log(progress + "Hey test");

  return (
    <LineChart
      width={350}
      height={300}
      data={levelCompletionData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="orderNumber"
        type="number"
        domain={[1, 9]}
        allowDecimals={false}
      />
      <YAxis
        dataKey="completedOn"
        type="number"
        domain={["dataMin", "dataMax"]}
        tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
      />
      <Tooltip formatter={(value) => new Date(value).toLocaleDateString()} />
      <Line type="monotone" dataKey="completedOn" stroke="#8884d8" />
    </LineChart>
  );
}
