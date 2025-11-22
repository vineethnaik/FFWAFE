import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Charan Teja',
      role: 'Team Member',
      image: '/images/charan-teja.jpg'
    },
    {
      name: 'T. Mohanth',
      role: 'Team Member',
      image: '/images/mohanth.jpg'
    },
    {
      name: 'E. Vineeth Naik',
      role: 'Team Member',
      image: '/images/vineeth-naik.jpg'
    }
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9' }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1B5E20', fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
          About AgriZen
        </Typography>
      
      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1B5E20' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
          AgriZen is dedicated to revolutionizing the agricultural marketplace by creating a direct connection between farmers and buyers. 
          Our platform empowers farmers to showcase their products while providing buyers with access to fresh, high-quality agricultural goods.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
          We believe in sustainable farming practices and fair trade, ensuring that both farmers and consumers benefit from our marketplace.
        </Typography>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1B5E20' }}>
          Our Team
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <Card 
                sx={{ 
                  height: '100%', 
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ 
                      width: 150, 
                      height: 150, 
                      mx: 'auto', 
                      mb: 2,
                      border: '4px solid #2E7D32',
                      boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)'
                    }}
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      e.target.src = 'https://via.placeholder.com/150?text=' + encodeURIComponent(member.name.split(' ')[0]);
                    }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1B5E20' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Inter', sans-serif" }}>
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1B5E20' }}>
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
          We envision a future where technology bridges the gap between farmers and consumers, 
          creating a more sustainable and efficient agricultural ecosystem. Through AgriZen, 
          we aim to support local farming communities while providing consumers with access 
          to fresh, high-quality produce.
        </Typography>
      </Box>
    </Container>
    </Box>
  );
};

export default AboutPage; 