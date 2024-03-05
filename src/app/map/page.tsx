import React from "react";
import dynamic from "next/dynamic";
import data from "../../data/DATA_PRT.json";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

function Map() {
  return (
    <div className="w-full h-[calc(100vh-60px)] p-8 ">
      <h3 className="text-lg font-semibold mb-2">Map</h3>
      <div className="grid grid-cols-1 h-[calc(100vh-180px)]">
        <DynamicMap data={data} />
      </div>
    </div>
  );
}

export default Map;
