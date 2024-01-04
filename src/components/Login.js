import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, CssBaseline, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const handleInputChange = (e, setFunction) => {
    setFunction(e.target.value);
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
        window.location.href = '/';
        setIsAuth(true);
      } else {
        toast.error("Incorrect Credentials", { position: toast.POSITION.BOTTOM_RIGHT });
        localStorage.removeItem('token');
        setIsAuth(false);
      }
    } catch (err) {
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
            {isAuth ? <p>Login Successfull ! Go To <Link style={{color:"blue", textDecoration:"none"}} to={'/'}>HomePage</Link></p>  : ""}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;