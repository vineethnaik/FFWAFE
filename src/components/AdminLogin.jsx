import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, AdminPanelSettings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  background: 'linear-gradient(135deg, #ffffff 0%, #f8faf9 100%)',
  boxShadow: '0 8px 32px rgba(46, 125, 50, 0.15)',
  maxWidth: 450,
  margin: '0 auto',
}));

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Verify username and password are both exactly "admin"
      if (formData.username.trim() !== 'admin' || formData.password !== 'admin') {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      // If credentials are correct, proceed with backend authentication
      const email = 'admin@agrizen.com';
      const payload = { 
        email: email,
        password: formData.password, 
        role: 'ADMIN' 
      };
      
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        // Check if role is ADMIN (handle both string and enum serialization)
        const userRole = data.role?.toString() || data.role;
        if (data && data.success && userRole === 'ADMIN') {
          localStorage.setItem('userId', String(data.userId));
          localStorage.setItem('role', 'ADMIN');
          localStorage.setItem('name', data.name || 'Admin');
          localStorage.setItem('email', data.email || email);
          
          // Navigate directly to admin dashboard after successful login
          navigate('/admin-dashboard', { replace: true });
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Could not connect to server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: '#f8faf9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #f8faf9 100%)',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <Container maxWidth="sm">
        <StyledPaper elevation={3}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <AdminPanelSettings 
              sx={{ 
                fontSize: 60, 
                color: '#2E7D32', 
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(46, 125, 50, 0.2))'
              }} 
            />
            <Typography 
              variant="h4" 
              fontWeight={700} 
              sx={{ 
                color: '#1B5E20',
                fontFamily: "'Poppins', sans-serif",
                mb: 1
              }}
            >
              Admin Portal
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Creator Access Only
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, fontFamily: "'Inter', sans-serif" }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: "'Inter', sans-serif",
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: "'Inter', sans-serif",
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                  boxShadow: '0 6px 20px rgba(46, 125, 50, 0.4)',
                },
              }}
            >
              {loading ? 'Logging in...' : 'Login as Admin'}
            </Button>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default AdminLogin;

