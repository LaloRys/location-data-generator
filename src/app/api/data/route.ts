import { NextResponse } from "next/server";
import data from "@/data/DATA_PRT.json";

export async function GET() {
  return NextResponse.json({
    message: "Hola",
    data: data,
  });
}
