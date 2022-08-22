// import "./Chart.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer

} from "recharts";

export default function BarChart2(props) {
  
const data = [
  {
    name: "Jan",
    SYP: props["barcharinfo"]["0"],
 
  },
  {
    name: "Feb",
    SYP: props["barcharinfo"]["1"],

  },
  {
    name: "Mar",
    SYP:props["barcharinfo"]["2"],
 
  },
  {
    name: "Apr",
    SYP: props["barcharinfo"]["3"],
 
  },
  {
    name: "May",
    SYP: props["barcharinfo"]["4"],
    
  },
  {
    name: "June",
    SYP: props["barcharinfo"]["5"],
 
  },
  {
    name: "July",
    SYP: props["barcharinfo"]["6"],
  },
  {
    name: "Aug",
    SYP: props["barcharinfo"]["7"],
  },
  {
    name: "Sept",
    SYP: props["barcharinfo"]["8"],
  },
  {
    name: "Oct",
    SYP: props["barcharinfo"]["9"],
  },
  {
    name: "Nov",
    SYP: props["barcharinfo"]["10"],
  },
  {
    name: "Dec",
    SYP: props["barcharinfo"]["11"],
  }
];

  return (
    <ResponsiveContainer width="95%" height={500}>
    <BarChart
      width={700}
      height={500}
      data={data}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="SYP" fill="#11324D" />
    </BarChart>
    </ResponsiveContainer>
  );
}
