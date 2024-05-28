import React, { useState } from 'react';
import PenroseLSystemSketch from './lback';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!email.match(emailPattern)) {
      newErrors.email = 'Invalid email address';
    }

    if (!phone.match(phonePattern)) {
      newErrors.phone = 'Invalid phone number (must be 10 digits)';
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', { email, phone, password });
      // Clear form fields after submission
      setEmail('');
      setPhone('');
      setPassword('');
    }
  };


  
const sendSMS = async () => {
  const body = 'Thank you for being a part of our three handed whist community ---Team THREE HANDED WHIST ';
    const from ='+13343397091';
    const to =phone; 
    if (body && from && to) {
    try {
      const response = await axios.get('http://localhost:5000/api/send-sms', {
        params: { body, from, to },
      });
      console.log('SMS sent, SID:', response.data.sid);
      alert('INVITATION SENT');
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }
};

  return (
    <div >
      <PenroseLSystemSketch />
      <Container maxWidth="xs" sx={{marginLeft:'20px',height:'500px' }}>
        <Box
          sx={{
            padding: 3,
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#FFFFFF'
            ,height:'500px',
          }}
        >
          <Typography variant="h4" component="h2"  gutterBottom>
            <div style={{fontSize:'60'}}>
            Login
            </div>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
            <Box sx={{ marginBottom: 2}} >
              <TextField
                label="Phone Number"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: '10px' }}
              onClick={sendSMS}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default LoginForm;
