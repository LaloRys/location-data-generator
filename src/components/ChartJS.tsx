"use client";

import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import summarys from "../data/summary_part.json";

// defaults.maintainAspectRatio = false;
defaults.responsive = true;

// defaults.plugins.legend.position = "bottom";
// defaults.plugins.legend.align = "start";
// defaults.plugins.legend.labels.boxWidth = 20;
// defaults.plugins.legend.labels.boxHeight = 20;
// defaults.plugins.legend.labels.padding = 20;
defaults.plugins.legend.labels.usePointStyle = true;
defaults.plugins.legend.labels.pointStyle = "circle";

defaults.plugins.title.display = true;
// defaults.plugins.title.text = "Grafica";
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const lineData = [
  {
    label: "Jan",
    revenue: 64854,
    cost: 32652,
  },
  {
    label: "Feb",
    revenue: 78654,
    cost: 45632,
  },
  {
    label: "Mar",
    revenue: 98654,
    cost: 65432,
  },
  {
    label: "Apr",
    revenue: 45632,
    cost: 32654,
  },
  {
    label: "May",
    revenue: 32654,
    cost: 45632,
  },
  {
    label: "Jun",
    revenue: 45632,
    cost: 32654,
  },
  {
    label: "Jul",
    revenue: 32654,
    cost: 45632,
  },
  {
    label: "Aug",
    revenue: 45632,
    cost: 32654,
  },
  {
    label: "Sep",
    revenue: 32654,
    cost: 45632,
  },
  {
    label: "Oct",
    revenue: 45632,
    cost: 32654,
  },
  {
    label: "Nov",
    revenue: 32654,
    cost: 45632,
  },
  {
    label: "Dec",
    revenue: 45632,
    cost: 32654,
  },
];

export function LineChart({ data }: any) {
  return (
    <>
      <Line
        data={{
          labels: lineData.map((data) => data.label),
          datasets: [
            {
              label: "Revenue",
              data: lineData.map((data) => data.revenue),
              backgroundColor: "#064FF0",
              borderColor: "#064FF0",
            },
            {
              label: "Cost",
              data: lineData.map((data) => data.cost),
              backgroundColor: "#FF3030",
              borderColor: "#Ff3030",
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.4,
            },
          },
        }}
      />
    </>
  );
}

export function PieChart() {
  const Colors = [
    "rgba(54, 162, 235, 0.4)",
    "rgba(255, 206, 86, 0.4)",
    "rgba(75, 192, 192, 0.4)",
    "rgba(153, 102, 255, 0.4)",
    "rgba(255, 159, 64, 0.4)",
    "rgba(255, 0, 0, 0.4)",
    "rgba(255, 153, 0, 0.4)",
    "rgba(255, 255, 0, 0.4)",
    "rgba(0, 255, 0, 0.4)",
    "rgba(0, 255, 255, 0.4)",
    "rgba(0, 153, 255, 0.4)",
    "rgba(255, 0, 255, 0.4)",
    "rgba(255, 102, 204, 0.4)",
    "rgba(255, 102, 0, 0.4)",
    "rgba(0, 255, 153, 0.4)",
  ];

  // const labels = summarys.acciones.map((summary) => summary.estado);
  const labels = summarys.acciones.map((summary) => summary.descripcion);
  const data = summarys.acciones.map((summary) => summary.cantidad);

  return (
    <>
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: Colors,
              borderColor: Colors,
              borderRadius: 3,
              // borderWidth: 1,
              hoverBorderWidth: 2,

              // barPercentage: 0.5,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              text: `Total: `,
              position: "bottom",
              align: "start",
              font: {
                size: 16,
                weight: "lighter",
                style: "normal",
              },
            },
            legend: {
              position: "bottom",
            },
            tooltip: {
              // mode: "index",
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "#fff",
              bodyColor: "#fff",
              bodyFont: {
                weight: "normal",
              },
              footerColor: "#fff",
              footerFont: {
                weight: "bold",
              },
              padding: 8,
            },
          },
        }}
      />
    </>
  );
}

export function BarChart() {
  const Colors = [
    "rgba(54, 162, 235, 0.4)",
    "rgba(255, 206, 86, 0.4)",
    "rgba(75, 192, 192, 0.4)",
    "rgba(153, 102, 255, 0.4)",
    "rgba(255, 159, 64, 0.4)",
    "rgba(255, 0, 0, 0.4)",
    "rgba(255, 153, 0, 0.4)",
    "rgba(255, 255, 0, 0.4)",
    "rgba(0, 255, 0, 0.4)",
    "rgba(0, 255, 255, 0.4)",
    "rgba(0, 153, 255, 0.4)",
    "rgba(255, 0, 255, 0.4)",
    "rgba(255, 102, 204, 0.4)",
    "rgba(255, 102, 0, 0.4)",
    "rgba(0, 255, 153, 0.4)",
  ];

  const labels = summarys.acciones.map((summary) => summary.estado);
  const data = summarys.acciones.map((summary) => summary.cantidad);
  return (
    <>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Cantidad",
              data: data,
              backgroundColor: Colors,
              borderColor: Colors,
              borderRadius: 8,
              borderWidth: 1,
              hoverBorderWidth: 2,

              // barPercentage: 0.5,
            },
          ],
        }}
      />
    </>
  );
}
