import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serverConfig from "../server-config";
import Loader from "./shared/Loader";
import ParkingStatusChart from "./ParkingStatusChart";
import carImage from "../assets/car-image.png"; // Statyczny obraz samochodu
import parkingImage from "../assets/parking-image.jpg"; // Statyczny obraz parkingu

function Home() {
  const [parkingData, setParkingData] = useState(null);
  const [loaderState, setLoaderState] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchParkingData();
  }, []);

  const fetchParkingData = () => {
    setLoaderState(true);
    fetch(`${serverConfig.serverUrl}data/`)
      .then((response) => response.json())
      .then((data) => {
        setParkingData(data);
        setLoaderState(false);
      })
      .catch((error) => {
        console.error("Error fetching parking data:", error);
        setLoaderState(false);
      });
  };

  const handleParkingImageClick = () => {
    navigate("/parking-state");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/sign-up");
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      {loaderState ? (
        <Loader />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ marginBottom: "40px", color: "#333" }}>Smart Parking Dashboard</h1>

          {/* Kafelki */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "20px",
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            {/* Lewy górny kafelek: Zdjęcie samochodu + Login i Sign Up */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={carImage}
                alt="Car"
                style={{
                  maxWidth: "80%",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
              <button
                onClick={handleLoginClick}
                style={{
                  width: "80%",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginBottom: "10px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#007BFF")}
              >
                Login
              </button>
              <button
                onClick={handleSignUpClick}
                style={{
                  width: "80%",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e7e34")}
                onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#28a745")}
              >
                Sign Up
              </button>
            </div>

            {/* Prawy górny kafelek: Wykres kołowy */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {parkingData && <ParkingStatusChart parkingData={parkingData} />}
            </div>

            {/* Lewy dolny kafelek: Zdjęcie parkingu z przejściem */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                cursor: "pointer",
              }}
              onClick={handleParkingImageClick}
            >
              <img
                src={parkingImage}
                alt="Parking"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
              <p style={{ marginTop: "10px", textAlign: "center", fontWeight: "600", color: "#555" }}>
                Go to Parking State
              </p>
            </div>

            {/* Prawy dolny kafelek: Mapa */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
              }}
            >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d10256.908754280794!2d20.97792172259469!3d50.007096842271096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sat%20tarn%C3%B3w!5e0!3m2!1spl!2spl!4v1733076182077!5m2!1spl!2spl"
            width="100%"
            height="370px"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map of Tarnów"
          ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
