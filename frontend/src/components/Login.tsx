import React, { Component, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';

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
}

class Login extends Component<{}, State> {
    state: State = {
        account: {
            username: "",
            password: ""
        },
        errors: {}
    };

    validate = (): Errors | null => {
        const errors: Errors = {};

        const { account } = this.state;
        if (account.username.trim() === '') {
            errors.username = 'Username is required!';
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required!';
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        
        axios.post('http://localhost:3100/api/user/auth', {
            login: this.state.account.username,
            password: this.state.account.password
        })
        .then(response => {
           
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        })
        .catch(error => {
            const errors: Errors = { general: 'Invalid username or password' };
            this.setState({ errors });
        });
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const account = { ...this.state.account };
        const { name, value } = event.currentTarget;
        account[name as keyof Account] = value;
        this.setState({ account });
    };

    render() {
        return (
            <Container maxWidth="sm"
            sx={{
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
            
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            label="Username"
                            value={this.state.account.username}
                            name="username"
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        {this.state.errors.username && (
                            <Alert severity="error">
                                {this.state.errors.username}
                            </Alert>
                        )}
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Password"
                            value={this.state.account.password}
                            name="password"
                            onChange={this.handleChange}
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        {this.state.errors.password && (
                            <Alert severity="error">
                                {this.state.errors.password}
                            </Alert>
                        )}
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Zaloguj
                    </Button>
                </form>
            </Container>
        );
    }
}

export default Login;