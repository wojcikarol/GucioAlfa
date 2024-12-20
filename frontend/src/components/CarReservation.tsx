import React, { Component, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Alert, Box, Paper, Snackbar } from "@mui/material";
import axios from "axios";


import carImage from '../assets/car-image.png';

interface Reservation {
  userId: string;
  slotId: string;
  startDate: string;
  endDate: string;
}

interface Errors {
  userId?: string;
  slotId?: string;
  startDate?: string;
  endDate?: string;
  general?: string;
}

interface State {
  reservation: Reservation;
  errors: Errors;
  showSnackbar: boolean;
  imageVisible: boolean;
}

class CarReservation extends Component<{}, State> {
  state: State = {
    reservation: {
      userId: "",
      slotId: "",
      startDate: "",
      endDate: ""
    },
    errors: {},
    showSnackbar: false,
    imageVisible: false
  };

  validate = (): Errors | null => {
    const errors: Errors = {};

    const { reservation } = this.state;
    if (!reservation.userId.trim()) {
      errors.userId = "User ID is required!";
    }
    if (!reservation.slotId.trim()) {
      errors.slotId = "Slot ID is required!";
    }
    if (!reservation.startDate.trim()) {
      errors.startDate = "Start date is required!";
    }
    if (!reservation.endDate.trim()) {
      errors.endDate = "End date is required!";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    axios
      .post("http://localhost:3100/api/reservations", this.state.reservation)
      .then(() => {
        this.setState({ showSnackbar: true });
        this.resetForm();
      })
      .catch((error) => {
        const errors: Errors = { general: "Failed to make a reservation. Please try again." };
        this.setState({ errors });
      });
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reservation = { ...this.state.reservation };
    const { name, value } = event.currentTarget;
    reservation[name as keyof Reservation] = value;
    this.setState({ reservation });
  };

  resetForm = () => {
    this.setState({
      reservation: {
        userId: "",
        slotId: "",
        startDate: "",
        endDate: ""
      }
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ imageVisible: true });
    }, 500);
  }

  render() {
    return (
      <Box
        sx={{
          background: "linear-gradient(135deg, #000000, #434343)",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2
        }}
      >
        <Snackbar
          open={this.state.showSnackbar}
          onClose={() => this.setState({ showSnackbar: false })}
          message="Reservation successful!"
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#222",
              color: "black",
              fontSize: "1rem",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }
          }}
        />

        {this.state.imageVisible && (
          <Box
            sx={{
              animation: "fadeIn 1s ease-out",
              marginBottom: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: this.state.imageVisible ? 1 : 0,
              transition: "opacity 1s ease"
            }}
          >
            <img src={carImage} alt="Car" style={{ width: "150px", height: "auto" }} />
          </Box>
        )}

        <Paper
          elevation={5}
          sx={{
            padding: 4,
            maxWidth: 400,
            width: "100%",
           
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 3,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)"
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
           
            align="center"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Car Reservation
          </Typography>
          {this.state.errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {this.state.errors.general}
            </Alert>
          )}
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="User ID"
            
              value={this.state.reservation.userId}
              name="userId"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              
              error={!!this.state.errors.userId}
              helperText={this.state.errors.userId}
              InputLabelProps={{
                shrink: true
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Slot ID"
              value={this.state.reservation.slotId}
              name="slotId"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!this.state.errors.slotId}
              helperText={this.state.errors.slotId}
              InputLabelProps={{
                shrink: true
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Start Date"
              value={this.state.reservation.startDate}
              name="startDate"
              onChange={this.handleChange}
              type="datetime-local"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!this.state.errors.startDate}
              helperText={this.state.errors.startDate}
              InputLabelProps={{
                shrink: true
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="End Date"
              value={this.state.reservation.endDate}
              name="endDate"
              onChange={this.handleChange}
              type="datetime-local"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!this.state.errors.endDate}
              
              helperText={this.state.errors.endDate}
              InputLabelProps={{
                shrink: true
              }}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                ":hover": {
                  background: "linear-gradient(135deg, #a777e3, #6e8efb)",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)"
                }
              }}
            >
              Reserve
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }
}

export default CarReservation;
