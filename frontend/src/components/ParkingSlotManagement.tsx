import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  CircularProgress,
  Tooltip,
} from '@mui/material';

interface ParkingSlot {
  slotId: string;
  isOccupied: boolean;
  lastUpdated: string;
}

interface Car {
  carId: string;
  type: string;
  model: string;
  registration: string;
}

interface User {
  email: string;
  name: string;
  role: string;
}

interface SlotDetails {
  parkingSlot: ParkingSlot;
  car: Car | null;
  user: User | null;
}

const ParkingSlotManagement: React.FC = () => {
  const [slotDetails, setSlotDetails] = useState<SlotDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch parking slots with related car and user information
  const fetchParkingSlotDetails = async () => {
    setLoading(true);
    try {
      const API_BASE_URL = 'http://localhost:3100'; // Or use environment variables
  
      const slotsResponse = await fetch(`${API_BASE_URL}/api/data`);
      if (!slotsResponse.ok) {
        throw new Error(`Slots API Error: ${slotsResponse.status}`);
      }
      const slots = await slotsResponse.json();
  
      const carsResponse = await fetch(`${API_BASE_URL}/api/cars`);
      if (!carsResponse.ok) {
        throw new Error(`Cars API Error: ${carsResponse.status}`);
      }
      const cars = await carsResponse.json();
  
      const usersResponse = await fetch(`${API_BASE_URL}/api/user`);
      if (!usersResponse.ok) {
        throw new Error(`Users API Error: ${usersResponse.status}`);
      }
      const users = await usersResponse.json();
  
      const details = slots.map((slot) => {
        const car = cars.find((c) => c.carId === slot.slotId) || null;
        const user = users.find((u) => car && u.email === car.registration) || null;
        return { parkingSlot: slot, car, user };
      });
  
      setSlotDetails(details);
    } catch (error) {
      console.error('Error fetching slot details:', error.message);
      setError('Failed to fetch parking slot details.');
    } finally {
      setLoading(false);
    }
  };
  
   
  

  useEffect(() => {
    fetchParkingSlotDetails();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
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
              <TableCell>Car Details</TableCell>
              <TableCell>User Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slotDetails.map(({ parkingSlot, car, user }) => (
              <TableRow key={parkingSlot.slotId}>
                <TableCell>{parkingSlot.slotId}</TableCell>
                <TableCell>
                  {parkingSlot.isOccupied ? (
                    <Tooltip title="Occupied">
                      <Typography color="error">Occupied</Typography>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Available">
                      <Typography color="success">Available</Typography>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>{new Date(parkingSlot.lastUpdated).toLocaleString()}</TableCell>
                <TableCell>
                  {car ? (
                    <Box>
                      <Typography>Type: {car.type}</Typography>
                      <Typography>Model: {car.model}</Typography>
                      <Typography>Reg: {car.registration}</Typography>
                    </Box>
                  ) : (
                    'No Car Assigned'
                  )}
                </TableCell>
                <TableCell>
                  {user ? (
                    <Box>
                      <Typography>Name: {user.name}</Typography>
                      <Typography>Email: {user.email}</Typography>
                      <Typography>Role: {user.role}</Typography>
                    </Box>
                  ) : (
                    'No User Assigned'
                  )}
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
