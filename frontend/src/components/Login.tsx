import React, { Component, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Alert, Box, Paper, Snackbar } from "@mui/material";
import axios from "axios";

// Import the car image (replace with the correct path to your image)
import carImage from '../assets/car-image.png'; // Replace with the actual path to your image

interface Account {
  username: string;
  password: string;
}

interface Errors {
  username?: string;
  password?: string;
  general?: string;
}

interface State {
  account: Account;
  errors: Errors;
  showSnackbar: boolean;
  imageVisible: boolean; // Control image visibility for animation
}

class Login extends Component<{}, State> {
  state: State = {
    account: {
      username: "",
      password: ""
    },
    errors: {},
    showSnackbar: true, // To control the "Witaj ponownie" message
    imageVisible: false // Control the image's fade-in animation
  };

  validate = (): Errors | null => {
    const errors: Errors = {};

    const { account } = this.state;
    if (account.username.trim() === "") {
      errors.username = "Username is required!";
    }
    if (account.password.trim() === "") {
      errors.password = "Password is required!";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    axios
        .post("http://localhost:3100/api/user/auth", {
            login: this.state.account.username,
            password: this.state.account.password
        })
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            window.location.href = "/";
        })
        .catch((error) => {
            const errors: Errors = { general: "Invalid username or password" };
            this.setState({ errors });
        });
};


  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const account = { ...this.state.account };
    const { name, value } = event.currentTarget;
    account[name as keyof Account] = value;
    this.setState({ account });
  };

  closeSnackbar = () => {
    this.setState({ showSnackbar: false });
  };

  componentDidMount() {
    // Trigger the image fade-in animation after component mounts
    setTimeout(() => {
      this.setState({ imageVisible: true });
    }, 500); // Delay the image animation for a smoother effect
  }

  render() {
    return (
      <Box
        sx={{
          background: "linear-gradient(135deg, #000000, #434343)",
          height: "100vh",
          display: "flex",
          flexDirection: "column", // Use column layout for vertical stacking
          justifyContent: "center",
          alignItems: "center",
          padding: 2
        }}
      >
        {/* Snackbar for "Witaj ponownie" */}
        <Snackbar
  open={this.state.showSnackbar}
  onClose={this.closeSnackbar}
  message="Witaj ponownie!"
  autoHideDuration={3000}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  sx={{
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#222",
      color: "white",
      fontSize: "1rem",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
      display: "flex",         
      justifyContent: "center", 
      alignItems: "center",    
      textAlign: "center",  
    }
  }}
/>



        {/* Car Image Animation */}
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
            SmartParking Login
          </Typography>
          {this.state.errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {this.state.errors.general}
            </Alert>
          )}
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Username"
              value={this.state.account.username}
              name="username"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!this.state.errors.username}
              helperText={this.state.errors.username}
              InputLabelProps={{
                shrink: true
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              value={this.state.account.password}
              name="password"
              onChange={this.handleChange}
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!this.state.errors.password}
              helperText={this.state.errors.password}
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
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }
}

export default Login;
