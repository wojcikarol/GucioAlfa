import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Alert, Box, Paper, Snackbar, Select, MenuItem } from "@mui/material";
import axios from "axios";

interface CarData {
    carId: string;
    type: string;
    model: string;
    registration: string;
    parkingSlot: string;
}

interface ParkingSlot {
    slotId: string;
    isOccupied: boolean;
}

const Reservation: React.FC = () => {
    const [formData, setFormData] = useState<Omit<CarData, "carId"> & { reservationDuration: string }>({
        type: "",
        model: "",
        registration: "",
        parkingSlot: "",
        reservationDuration: "",
    });

    const [availableSlots, setAvailableSlots] = useState<ParkingSlot[]>([]);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    useEffect(() => {
        fetchAvailableSlots();
    }, []);

    const fetchAvailableSlots = async () => {
        try {
            const response = await axios.get<ParkingSlot[]>("http://localhost:3100/api/data");
            const available = response.data.filter((slot) => !slot.isOccupied);
            setAvailableSlots(available);
        } catch (error) {
            console.error("Error fetching parking slots:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name as string]: value as string,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3100/api/cars", formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                alert("Reservation successful!");
            }
        } catch (error) {
            alert("Error making reservation.");
        }
    };

    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #000000, #434343)",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
            }}
        >
            <Snackbar
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                message="Reservation successful!"
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: "#222",
                        color: "white",
                        fontSize: "1rem",
                        borderRadius: "8px",
                    },
                }}
            />

            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    maxWidth: 500,
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: 3,
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                >
                    Add Car Reservation
                </Typography>

                {responseMessage && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        {responseMessage}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Car Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        sx={{
                            backgroundColor: "#333", // Ciemne tło
                            color: "white", // Biały tekst
                            borderRadius: "4px",
                        }}
                        InputProps={{
                            style: {
                                color: "white", // Kolor tekstu
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white", // Kolor etykiety
                            },
                        }}
                        placeholder="Enter car type"
                    />
                    <TextField
                        label="Car Model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        sx={{
                            backgroundColor: "#333",
                            color: "white",
                            borderRadius: "4px",
                        }}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        placeholder="Enter car model"
                    />
                    <TextField
                        label="Car Registration"
                        name="registration"
                        value={formData.registration}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        sx={{
                            backgroundColor: "#333",
                            color: "white",
                            borderRadius: "4px",
                        }}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        placeholder="Enter car registration"
                    />
                    <Select
                        value={formData.parkingSlot}
                        onChange={handleChange}
                        name="parkingSlot"
                        fullWidth
                        displayEmpty
                        variant="outlined"
                        sx={{
                            mb: 2,
                            backgroundColor: "#333",
                            color: "white",
                            borderRadius: "4px",
                        }}
                        required
                        inputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    backgroundColor: "#333", // Ciemne tło
                                    color: "white", // Biały tekst
                                },
                            },
                        }}
                    >
                        <MenuItem value="" disabled>
                            <em style={{ color: "white" }}>-- Select a Slot --</em>
                        </MenuItem>
                        {availableSlots.map((slot) => (
                            <MenuItem
                                key={slot.slotId}
                                value={slot.slotId}
                                style={{
                                    backgroundColor: "#444",
                                    color: "white",
                                }}
                            >
                                {slot.slotId}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        label="Reservation Duration (minutes)"
                        name="reservationDuration"
                        type="number"
                        value={formData.reservationDuration || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        inputProps={{
                            step: 15, // Przesuwanie co 15 minut
                        }}
                        sx={{
                            backgroundColor: "#333",
                            color: "white",
                            borderRadius: "4px",
                        }}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        placeholder="Enter duration in minutes"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            mt: 2,
                            py: 1.2,
                            background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                            color: "white",
                            fontWeight: "bold",
                            ":hover": {
                                background: "linear-gradient(135deg, #a777e3, #6e8efb)",
                            },
                        }}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Reservation;
