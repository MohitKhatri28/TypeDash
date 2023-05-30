import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
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

export default function PasswordReset() {
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
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
        console.log(email);
        setError("Fill the details correctly.");
    } 

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
                Password Reset
            </Typography>
            <Typography component="p" variant="body">
                Enter your email to reset your password. You will be sent a link to reset it.
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
                <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={submitPressed}
                sx={{ mt: 3, mb: 2 }}
                >
                Send Reset Email
                </Button>
                <Grid container>
                <Grid item>
                    <Link to="/login" variant="body2">
                    {"Already have an account? Login"}
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
