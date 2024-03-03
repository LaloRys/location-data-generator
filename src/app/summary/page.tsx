import dynamic from "next/dynamic";
import axios from "axios";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

async function Summary() {
  return (
    <div className="hero min-h-screen bg-neutral text-black">
      <div className="hero-content text-center">
        <h1 className="text-5xl font-bold m-2">Location in the Map</h1>
        <DynamicMap />
      </div>
    </div>
  );
}

export default Summary;
