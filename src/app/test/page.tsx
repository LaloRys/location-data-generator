import axios from "axios";
import React from "react";
import dynamic from "next/dynamic";
import { BarChart, LineChart, PieChart } from "@/components/ChartJS";
import summarys from "../../data/summary_part.json";
import TableData from "@/components/tables/Table";
import data from "../../data/DATA_PRT.json";

// async function getData() {
//   const response = await axios.get("http://localhost:3000/api/data");
//   // console.log("Respuesta", response);
//   return response;
// }

const DynamicMap = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});
console.log(data);

async function TestPage() {
  // const data = await getData();
  // console.log(data.data.data);

  return (
    <section className=" w-full h-[calc(100vh-60px)] p-8 ">
      <h2 className="text-2xl font-semibold mb-4">Resumen del Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold mb-2">Maps</h3>
          <div className="grid grid-cols-1 h-96">
            <DynamicMap data={data} />
          </div>
        </div>
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
        <div className="bg-white p-4 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold mb-2">ACCESIONES</h3>
          <PieChart />
        </div>
      </div>
      <div>
        <div className="mt-6">
          <TableData />
        </div>

        <div className="grid grid-cols-3 gap-5 mx-4 mt-4">
          {data.map((item: any, index: any) => (
            <div
              key={index}
              className="bg-slate-100 py-2 px-4 flex-col items-center justify-center rounded-md shadow-lg"
            >
              <h2>
                Accession ID:{" "}
                <span className="font-bold">{item["Accession ID"]}</span>
              </h2>
              <p>
                Institutecode:{" "}
                <span className="font-bold">{item.institutecode} </span>
              </p>
              <p>
                Accession Prefix:{" "}
                <span className="font-bold">{item["Accession Prefix"]} </span>
              </p>
              <p>
                Ubicación:{" "}
                <span className="font-bold">{item["UBICACIÓN"]} </span>
              </p>
              <p>
                Elevation:{" "}
                <span className="font-bold">{item["ELEVATION"]} </span>
              </p>
              <p>
                Commetns: <span className="font-bold">{item["COMMENTS"]} </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestPage;
