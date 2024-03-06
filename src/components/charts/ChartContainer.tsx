import React from "react";
import { BarChart, PieChart, BubbleChart, ScatterChart } from "../ChartJS";
import summarys from "../../data/summary_part.json";

function ChartContainer() {
  return <div>ChartContainer</div>;
}

export function StyledBarChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold mb-2">ACCESIONES</h3>
      <BarChart />
      <p>Total: {summarys.total[0].cantidad}</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {summarys.acciones.map((summary, item) => (
          <li
            key={item}
            className="bg-sky-500/20 p-2 rounded-md text-stone-500"
          >
            {summary.estado}: {summary.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StyledPieChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold mb-2">ACCESIONES</h3>
      <PieChart />
    </div>
  );
}

export function StyledBubbleChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold mb-2">BubbleChart</h3>
      <BubbleChart />
    </div>
  );
}
export function StyledScatterChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold mb-2">Scatter</h3>

      <ScatterChart />
    </div>
  );
}
