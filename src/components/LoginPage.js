import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.email && formData.password) {
      const storedRole = (localStorage.getItem('role') || 'BUYER').toUpperCase();
      const rolesToTry = storedRole === 'FARMER' ? ['FARMER', 'BUYER'] : ['BUYER', 'FARMER'];

      async function attempt(role) {
        const payload = { email: formData.email, password: formData.password, role };
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.success ? data : null;
      }

      try {
        let data = null;
        for (const role of rolesToTry) {
          // try with preferred role, then alternate
          // eslint-disable-next-line no-await-in-loop
          const result = await attempt(role);
          if (result) { data = result; break; }
        }
        if (data) {
          localStorage.setItem('userId', String(data.userId));
          localStorage.setItem('role', data.role);
          if (data.name) localStorage.setItem('name', data.name);
          if (data.email) localStorage.setItem('email', data.email);

          // ensure farmerId exists for farmer portal
          if (data.role === 'FARMER') {
            let farmerId = localStorage.getItem('farmerId');
            if (!farmerId) {
              try {
                const byEmail = await fetch(`${API_BASE_URL}/farmers/by-email?email=${encodeURIComponent(formData.email)}`);
                if (byEmail.ok) {
                  const f = await byEmail.json();
                  farmerId = f.id;
                  localStorage.setItem('farmerId', farmerId);
                } else {
                  // create farmer if not found
                  const createRes = await fetch(`${API_BASE_URL}/farmers`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: localStorage.getItem('name') || 'Farmer', email: formData.email })
                  });
                  if (createRes.ok) {
                    const f = await createRes.json();
                    farmerId = f.id;
                    localStorage.setItem('farmerId', farmerId);
                  }
                }
              } catch (_) {}
            }
          }

          setSuccess('Login successful! Redirecting...');
          if (data.role === 'FARMER') {
            setTimeout(() => navigate('/farmer-dashboard'), 800);
          } else {
            setTimeout(() => navigate('/home'), 800);
          }
        } else {
          setError('Login failed. Please check your credentials.');
        }
      } catch (err) {
        setError('Could not connect to server.');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" color="#225c2b" fontWeight="bold" gutterBottom align="center">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" paragraph>
            Sign in to continue to AgriZen
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign In
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/register')}
                sx={{ color: '#2E7D32' }}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 