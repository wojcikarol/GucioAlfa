import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { LineChart } from "@mui/x-charts/LineChart";
import serverConfig from "../server-config";
import Loader from "./shared/Loader";

interface IParkingSlot {
  slotId: string;
  isOccupied: boolean;
  lastUpdated?: Date;
}

interface DataModel {
  temperature: number;
  pressure: number;
  humidity: number;
  readingDate: string;
}

function Home() {
  const [parkingData, setParkingData] = useState<IParkingSlot[] | null>(null);
  const [sensorData, setSensorData] = useState<DataModel[] | null>(null);
  const [loaderState, setLoaderState] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoaderState(true);
    try {
      // Fetch parking data
      const parkingResponse = await fetch(`${serverConfig.serverUrl}/api/data/getAll`);
      const parkingData = await parkingResponse.json();
      setParkingData(parkingData);

      // Fetch sensor data (mock or real API endpoint for line chart)
      const sensorResponse = await fetch(`${serverConfig.serverUrl}/api/sensorData`);
      const sensorData = await sensorResponse.json();
      setSensorData(sensorData);

      setLoaderState(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoaderState(false);
    }
  };

  const prepareChartData = () => {
    if (!parkingData) return [];

    const occupied = parkingData.filter((slot) => slot.isOccupied).length;
    const available = parkingData.length - occupied;

    return [
      { name: "Occupied", value: occupied },
      { name: "Available", value: available },
    ];
  };

  const prepareSensorChartData = () => {
    return sensorData || [];
  };

  const COLORS = ["#FF0000", "#00FF00"]; // Colors for pie chart

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      {loaderState ? (
        <Loader />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1>Smart Parking Dashboard</h1>

          {/* Pie Chart for Parking Status */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <PieChart width={400} height={400}>
              <Pie
                data={prepareChartData()}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
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

          {/* Line Chart for Sensor Data */}
          <div style={{ width: "100%", marginTop: "20px" }}>
            {sensorData && sensorData.length > 0 ? (
              <LineChart
                width={1000}
                height={300}
                series={[
                  {
                    data: prepareSensorChartData().map((item) =>
                      item.pressure !== undefined ? item.pressure / 10 : null
                    ),
                    label: "Pressure x10 [hPa]",
                  },
                  {
                    data: prepareSensorChartData().map((item) =>
                      item.humidity !== undefined ? item.humidity : null
                    ),
                    label: "Humidity [%]",
                  },
                  {
                    data: prepareSensorChartData().map((item) =>
                      item.temperature !== undefined ? item.temperature : null
                    ),
                    label: "Temperature [°C]",
                  },
                ]}
                xAxis={[
                  {
                    scaleType: "point",
                    data: prepareSensorChartData().map((item) =>
                      new Date(item.readingDate).toLocaleString()
                    ),
                  },
                ]}
              />
            ) : (
              <h2>No sensor data available</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
