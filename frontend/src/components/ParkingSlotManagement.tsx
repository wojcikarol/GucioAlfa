import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

interface ParkingSlot {
  _id: string;
  slotId: string;
  isOccupied: boolean;
}

const ParkingSlotManagement: React.FC = () => {
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:3100"; 

 
  const fetchParkingSlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/data`);
      setParkingSlots(response.data);
    } catch (err) {
      setError("Failed to fetch parking slots.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
  const updateSlotStatus = async (slotId: string, isOccupied: boolean) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/data/${slotId}`, {
        isOccupied,
      });
      if (response.status === 200) {
        setSuccessMessage(`Slot ${slotId} updated successfully.`);
        fetchParkingSlots(); 
      }
    } catch (err) {
      setError("Failed to update parking slot status.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchParkingSlots();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>

      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Manage Parking Slots
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Slot ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parkingSlots.map((slot) => (
              <TableRow key={slot._id}>
                <TableCell>{slot.slotId}</TableCell>
                <TableCell>{slot.isOccupied ? "Occupied" : "Available"}</TableCell>
                <TableCell>{new Date().toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={slot.isOccupied ? "error" : "success"}
                    onClick={() =>
                      updateSlotStatus(slot.slotId, !slot.isOccupied)
                    }
                  >
                    {slot.isOccupied ? "Set Available" : "Set Occupied"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ParkingSlotManagement;
