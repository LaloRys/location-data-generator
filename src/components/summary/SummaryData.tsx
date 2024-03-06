"use client";

import summarys from "../../data/summary_part.json";
import data from "../../data/DATA_PRT.json";

export function CountingSummary() {
  // Función para contar las ubicaciones repetidas
  const contarUbicacionesRepetidas = (data: any) => {
    // Objeto para almacenar las ubicaciones y su recuento
    const ubicaciones: { [key: string]: { count: number; UBICACIÓN: string } } =
      {};

    // Recorrer los datos y contar las ubicaciones repetidas
    data.forEach((item: any) => {
      const key = `${item.Latitude},${item.Longitude}`; // Clave única basada en latitud y longitud
      ubicaciones[key] = ubicaciones[key] || {
        count: 0,
        UBICACIÓN: item.UBICACIÓN,
      }; // Inicializar el objeto si no existe
      ubicaciones[key].count++; // Incrementar el recuento
    });

    // Crear un nuevo objeto con latitud, longitud, recuento y nombre de ubicación
    const ubicacionesConRecuento = Object.keys(ubicaciones).map((key) => {
      const [latitud, longitud] = key.split(",").map(parseFloat); // Parsear latitud y longitud como números
      return {
        location: `${latitud}, ${longitud}`,
        count: ubicaciones[key].count,
        name: ubicaciones[key].UBICACIÓN,
      };
    });

    return ubicacionesConRecuento;
  };

  // Filtrar los datos para excluir objetos con valores null en Latitude, Longitude y UBICACIÓN
  const datosFiltrados = data.filter(
    (item) =>
      item.Latitude !== null && item.Longitude !== null && item.UBICACIÓN
  );

  // Obtener las ubicaciones con recuento
  const locations = contarUbicacionesRepetidas(datosFiltrados);

  console.log(locations);
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-xl"
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      <h3 className="text-lg font-semibold mb-2">Counting summary</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {locations.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ borderRight: "1px solid #ddd" }}>{item.name}</td>
              <td style={{ borderRight: "1px solid #ddd" }}>{item.location}</td>
              <td className="text-end">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
