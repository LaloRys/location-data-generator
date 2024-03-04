import axios from "axios";
import React from "react";
import dynamic from "next/dynamic";

async function getData() {
  const response = await axios.get("http://localhost:3000/api/data");
  // console.log("Respuesta", response);
  return response;
}

const DynamicMap = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

async function TestPage() {
  const data = await getData();
  // console.log(data.data.data);

  return (
    <div>
      <DynamicMap data={data.data.data} />

      <div className="grid grid-cols-3 gap-5 mx-4">
        {data.data.data.map((item: any, index: any) => (
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
              Ubicación: <span className="font-bold">{item["UBICACIÓN"]} </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestPage;
