import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { IParkingSlot } from "../models/parkingSlot.model";

// Komponent ParkingStatusChart, który rysuje wykres kołowy
interface ParkingStatusChartProps {
  parkingData: IParkingSlot[];
}

const ParkingStatusChart: React.FC<ParkingStatusChartProps> = ({ parkingData }) => {
  // Funkcja do przygotowania danych do wykresu kołowego
  const prepareChartData = () => {
    const occupied = parkingData.filter((slot) => slot.isOccupied).length;
    const available = parkingData.length - occupied;

    return [
      { name: "Occupied", value: occupied },
      { name: "Available", value: available },
    ];
  };

  // Zaktualizowane ciemniejsze kolory dla wykresu
  const COLORS = ["#8B0000", "#006400"]; // Ciemnoczerwony (#8B0000) dla zajętych, ciemnozielony (#006400) dla dostępnych

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <PieChart width={400} height={400}>
        <Pie
          data={prepareChartData()}
          cx="50%"
          cy="50%"
          outerRadius={150}
          dataKey="value"
          label
        >
          {prepareChartData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ParkingStatusChart;
