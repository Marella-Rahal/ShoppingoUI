import "./Chart.css";
import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";




export default function PieChart2(props) {
  const data01 = [
    { name: "Food", value: props["InformationCircleChar"]["food"], fill:"aqua"},
    { name: "Clothes", value: props["InformationCircleChar"]["clothes"], fill:"#86E3CE" },
    { name: "Transport", value: props["InformationCircleChar"]["transporation"], fill:'#D0E6A5' },
    { name: "School Cost", value: props["InformationCircleChar"]["schoolCost"], fill:'#FFDD94' },
    { name: "Health Inserunce", value: props["InformationCircleChar"]["healthInsurunce"], fill:'#FA897B'},
    { name: "Entertainment", value: props["InformationCircleChar"]["entertainment"], fill:'#CCABD8'},
    { name: "Others", value: props["InformationCircleChar"]["others"], fill:'grey' }
  ];
  
  console.log(props["InformationCircleChar"])
  return (
    
    <PieChart width={400} height={300} >
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data01}
        cx={200}
        cy={150}
        outerRadius={80}
        fill="#fff"
        label
      />
     
      <Tooltip />
    </PieChart>
  );
}
