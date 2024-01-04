import { Copyright, Label, Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize input fields with data from local storage on component mount
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername) setUsername(storedUsername);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleInputChange = (e, setFunction) => {
    const value = e.target.value;
    setFunction(value);
    localStorage.setItem(e.target.name, value);
  };

  const handleSubmit = async () => {
    try {
      const data = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      });
      const data2 = await data.json();
      if (data2.token) {
        console.log(data2.token);
        localStorage.setItem('token', data2.token);
        navigate('/');
      } else {
        toast.error("Incorrect Credentials", { position: toast.POSITION.BOTTOM_RIGHT });
        localStorage.removeItem('token');
      }
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  console.log(username)
  console.log(password)

  return (
    <>
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
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <p style={{margin:"0"}}>Username</p>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
            />
            <FormControl sx={{ width: "100%" }} variant="outlined">
            <p>Password</p>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
            </FormControl>


            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;