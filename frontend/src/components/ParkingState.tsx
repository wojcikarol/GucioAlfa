import React, { useEffect, useState } from "react";
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
} from "@mui/material";

interface ParkingSlot {
  _id: string;
  slotId: string;
  isOccupied: boolean;
  lastUpdated: string;
  reservationEndTime: string | null;
  reservedBy: User | null;
}

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  isAdmin: boolean;
}

interface Car {
  _id: string;
  carId: string;
  type: string;
  model: string;
  registration: string;
}

const ParkingSlotManagement: React.FC = () => {
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParkingSlots = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/data");
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const slots: ParkingSlot[] = await response.json();
      setParkingSlots(slots);
    } catch (err) {
      console.error("Error fetching parking slots:", err);
      setError("Failed to fetch parking slot details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingSlots();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Parking Slot Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Slot ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Reserved By</TableCell>
              <TableCell>Reservation End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parkingSlots.map((slot) => (
              <TableRow key={slot._id}>
                <TableCell>{slot.slotId}</TableCell>
                <TableCell>{slot.isOccupied ? "Occupied" : "Available"}</TableCell>
                <TableCell>{new Date(slot.lastUpdated).toLocaleString()}</TableCell>
                <TableCell>
                  {slot.reservedBy
                    ? `${slot.reservedBy.name} (${slot.reservedBy.email})`
                    : "Not Reserved"}
                </TableCell>
                <TableCell>
                  {slot.reservationEndTime
                    ? new Date(slot.reservationEndTime).toLocaleString()
                    : "No End Time"}
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
