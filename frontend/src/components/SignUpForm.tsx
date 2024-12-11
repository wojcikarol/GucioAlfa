import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Alert, Box, Paper, Snackbar } from "@mui/material";

// Import the car image as a normal image
import carImage from '../assets/car-image.png'; // path to your PNG image

interface Account {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
}

const SignUpForm: React.FC = () => {
  const [account, setAccount] = useState<Account>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showSnackbar, setShowSnackbar] = useState<boolean>(true); // For "Welcome" message
  const [carIconVisible, setCarIconVisible] = useState<boolean>(false); // For the car icon animation
  const navigate = useNavigate();

  const handleChangeRoute = () => {
    navigate("/login"); // Redirect to login page after successful sign up
  };

  const validate = (): Errors | null => {
    const validationErrors: Errors = {};

    if (account.username.trim() === "") {
      validationErrors.username = "Username is required!";
    }
    if (account.email.trim() === "") {
      validationErrors.email = "Email is required!";
    }
    if (account.password.trim() === "") {
      validationErrors.password = "Password is required!";
    }

    return Object.keys(validationErrors).length === 0 ? null : validationErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    axios
      .post("http://localhost:3100/api/user/create", {
        name: account.username,
        email: account.email,
        password: account.password,
      })
      .then((response) => {
        handleChangeRoute();
      })
      .catch((error) => {
        const errorMessages: Errors = {};
        errorMessages.password =
          "The username already exists or there was an error with registration!";
        setErrors(errorMessages || {});
        console.log(error);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const closeSnackbar = () => {
    setShowSnackbar(false); // Close snackbar after timeout
  };

  // Trigger the animation effect after the component mounts
  React.useEffect(() => {
    setCarIconVisible(true);
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #000000, #434343)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        flexDirection: "column", // Center the content vertically
      }}
    >
      {/* Snackbar for "Welcome" message */}
      <Snackbar
        open={showSnackbar}
        onClose={closeSnackbar}
        message="Welcome to SmartParking! Please sign up."
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#222",
            color: "white",
            fontSize: "1rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
          },
        }}
      />

      {/* Car Image with animation */}
      {carIconVisible && (
        <Box
          sx={{
            animation: "fadeIn 1s ease-out",
            marginBottom: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={carImage} // Use the imported car image here
            alt="Car Icon"
            width="300"
            height="100"
            style={{
              transition: "transform 0.5s ease",
              transform: carIconVisible ? "scale(1.1)" : "scale(1)",
            }}
          />
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
          SmartParking Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Username"
              value={account.username}
              name="username"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Email"
              value={account.email}
              name="email"
              onChange={handleChange}
              type="email"
              fullWidth
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Password"
              value={account.password}
              name="password"
              onChange={handleChange}
              type="password"
              fullWidth
              variant="outlined"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Box>

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
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Register
          </Button>

          {/* Error Messages */}
          {Object.values(errors).some((error) => error) && (
            <Box mt={2}>
              {Object.values(errors).map((error, index) =>
                error ? (
                  <Alert severity="error" key={index}>
                    {error}
                  </Alert>
                ) : null
              )}
            </Box>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default SignUpForm;
