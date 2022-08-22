// import "./Chart.css";
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function BarChart2(props) {
  // console.log(props["monthsInfo"]["1"]["paymentsValueInMonth"]);
 

const data = [
  {
    name: 'Jan',
    SYP: props["monthsInfo"]["1"]["paymentsValueInMonth"],
  },
  {
    name: 'Feb',
    SYP:  props["monthsInfo"]["2"]["paymentsValueInMonth"],
  },
  {
    name: 'Mar',
    SYP:  props["monthsInfo"]["3"]["paymentsValueInMonth"],
  },
  {
    name: 'Apr',
    SYP:  props["monthsInfo"]["4"]["paymentsValueInMonth"],
  },
  {
    name: 'May',
    SYP:  props["monthsInfo"]["5"]["paymentsValueInMonth"],
  },
  {
    name: 'June',
    SYP:  props["monthsInfo"]["6"]["paymentsValueInMonth"],
  },
  {
    name: 'July',
    SYP:  props["monthsInfo"]["7"]["paymentsValueInMonth"],
  },
  {
    name: 'Aug',
    SYP:  props["monthsInfo"]["8"]["paymentsValueInMonth"],
  },
  {
    name: 'Sept',
    SYP:  props["monthsInfo"]["9"]["paymentsValueInMonth"],
  },
  {
    name: 'Oct',
    SYP:  props["monthsInfo"]["10"]["paymentsValueInMonth"],
  },
  {
    name: 'Nov',
    SYP:  props["monthsInfo"]["11"]["paymentsValueInMonth"],
  },
  {
    name: 'Dec',
    SYP:  props["monthsInfo"]["12"]["paymentsValueInMonth"],
  },
];

  return (
    <ResponsiveContainer width="95%" height={500}>
      <BarChart width={700} height={500} data={data}>
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
