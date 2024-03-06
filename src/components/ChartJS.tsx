"use client";

import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import {
  Bar,
  Doughnut,
  Line,
  Radar,
  Bubble,
  Scatter,
  PolarArea,
} from "react-chartjs-2";
import summarys from "../data/summary_part.json";
import data from "../data/DATA_PRT.json";

const Colors = [
  "rgba(54, 162, 235, 0.4)",
  "rgba(255, 206, 86, 0.4)",
  "rgba(75, 192, 192, 0.4)",
  "rgba(153, 102, 255, 0.4)",
  "rgba(255, 159, 64, 0.4)",
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

const lineData = [
  {
    label: "Jan",
    revenue: 64854,
    cost: 32652,
  },
];

export function BubbleChart() {
  const labels = data.map((label) => label["Accession Prefix"]);

  // Define la estructura de un punto de datos
  interface Ubicacion {
    Latitude: number;
    Longitude: number;
  }

  // Define la estructura de un punto de datos con recuento
  interface UbicacionConRecuento extends Ubicacion {
    count: number;
  }

  // Función para contar las ubicaciones repetidas
  const contarUbicacionesRepetidas = (
    data: Ubicacion[]
  ): UbicacionConRecuento[] => {
    // Objeto para almacenar las ubicaciones y su recuento
    const ubicaciones: { [key: string]: number } = {};

    // Recorrer los datos y contar las ubicaciones repetidas
    data.forEach((item) => {
      const key = `${item.Latitude},${item.Longitude}`; // Clave única basada en latitud y longitud
      ubicaciones[key] = (ubicaciones[key] || 0) + 1; // Incrementar el recuento
    });

    // Crear un nuevo objeto con latitud, longitud y recuento
    const ubicacionesConRecuento: UbicacionConRecuento[] = Object.keys(
      ubicaciones
    ).map((key) => {
      const [latitud, longitud] = key.split(",").map(parseFloat); // Parsear latitud y longitud como números
      return {
        x: latitud,
        y: longitud,
        r: ubicaciones[key],
      };
    });

    return ubicacionesConRecuento;
  };

  // Filtrar los datos para excluir objetos con valores null en Latitude y Longitude
  const datosFiltrados = data.filter(
    (item) => item.Latitude !== null && item.Longitude !== null
  );

  // Obtener las ubicaciones con recuento
  const locations = contarUbicacionesRepetidas(datosFiltrados);

  // Normalizar los valores de r
  const maxCount = Math.max(...locations.map((location) => location.r));
  const locationsNormalized = locations.map((location) => ({
    x: location.x,
    y: location.y,
    r: location.r / maxCount,
  }));

  return (
    <Bubble
      data={{
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: locationsNormalized,
            backgroundColor: Colors,
            borderColor: Colors,
            borderWidth: 1,
          },
        ],
      }}
    ></Bubble>
  );
}

export function ScatterChart() {
  const labels = data.map((label) => label["Accession Prefix"]);

  // Define la estructura de un punto de datos
  interface Ubicacion {
    Latitude: number;
    Longitude: number;
  }

  // Define la estructura de un punto de datos con recuento
  interface UbicacionConRecuento extends Ubicacion {
    count: number;
  }

  // Función para contar las ubicaciones repetidas
  const contarUbicacionesRepetidas = (
    data: Ubicacion[]
  ): UbicacionConRecuento[] => {
    // Objeto para almacenar las ubicaciones y su recuento
    const ubicaciones: { [key: string]: number } = {};

    // Recorrer los datos y contar las ubicaciones repetidas
    data.forEach((item) => {
      const key = `${item.Latitude},${item.Longitude}`; // Clave única basada en latitud y longitud
      ubicaciones[key] = (ubicaciones[key] || 0) + 1; // Incrementar el recuento
    });

    // Crear un nuevo objeto con latitud, longitud y recuento
    const ubicacionesConRecuento: UbicacionConRecuento[] = Object.keys(
      ubicaciones
    ).map((key) => {
      const [latitud, longitud] = key.split(",").map(parseFloat); // Parsear latitud y longitud como números
      return {
        // x: [latitud, longitud],
        x: 5,
        y: ubicaciones[key],
      };
    });

    return ubicacionesConRecuento;
  };

  // Filtrar los datos para excluir objetos con valores null en Latitude y Longitude
  const datosFiltrados = data.filter(
    (item) => item.Latitude !== null && item.Longitude !== null
  );

  // Obtener las ubicaciones con recuento
  const locations = contarUbicacionesRepetidas(datosFiltrados);

  return (
    <Scatter
      data={{
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: locations,
            backgroundColor: Colors,
            borderColor: Colors,
            borderWidth: 1,
          },
          // {
          //   label: "Dataset 2",
          //   data: [
          //     { x: 25, y: 15, r: 20 },
          //     { x: 30, y: 20, r: 25 },
          //     { x: 35, y: 10, r: 30 },
          //   ],
          //   backgroundColor: "rgba(54, 162, 235, 0.2)",
          //   borderColor: "rgba(54, 162, 235, 1)",
          //   borderWidth: 1,
          // },
        ],
      }}
    ></Scatter>
  );
}

export function LineChart({ data }: any) {
  return (
    <>
      <Line
        data={{
          labels: lineData.map((data) => data.label),
          datasets: [
            {
              label: "Location",
              data: lineData.map((data) => data.revenue),
              backgroundColor: "#064FF0",
              borderColor: "#064FF0",
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
              borderRadius: 2,
              // borderWidth: 1,
              hoverBorderWidth: 2,

              // barPercentage: 0.5,
            },
          ],
        }}
      />
    </>
  );
}

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
