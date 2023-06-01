import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, useNavigate} from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Collapse, FormControl, Alert } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        TypeDash
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn(props) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    let navigate = useNavigate();
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //     email: data.get('email'),
    //     password: data.get('password'),
    //     });
    // };

    const submitPressed = (e) => {
        e.preventDefault();
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
        fetch("/api/login", requestOptions)
          .then((response) => {
            if(response.ok) 
              return response.json();
            else {
              setError(response.error);
              return {};
            }

          })
          .then((data) => {
            if ("access_token" in data) {
              setToken(data["access_token"]);
              navigate('/');
            }
            else {
              setError("No access token received from server.")
            } 

            // const options = {
            //   method: "GET",
            //   headers: {
            //     Authorization: "Bearer " + token,
            //   },
            // };


            // fetch("/api/protected", options)
            //   .then((response) => response.json())
            //   .then((data) => console.log(data));
        
          });
    }; 

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Collapse in={error != ""}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setError("");
                  }}
                >
                  {error}
                </Alert>
            </Collapse>
            <Box component="form" sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                />
                <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={submitPressed}
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link to="/password-reset" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
  );
}
