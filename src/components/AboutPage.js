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

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'ESLAVATH VINAATH NAIK',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'JYOTSNA TALASILA',
      role: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'BHARGAVI',
      role: 'Backend Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        About AgriZen
      </Typography>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Button variant="contained" color="success" onClick={() => navigate('/home')}>Go to Home</Button>
      </Box>
      
      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          AgriZen is dedicated to revolutionizing the agricultural marketplace by creating a direct connection between farmers and buyers. 
          Our platform empowers farmers to showcase their products while providing buyers with access to fresh, high-quality agricultural goods.
        </Typography>
        <Typography variant="body1" paragraph>
          We believe in sustainable farming practices and fair trade, ensuring that both farmers and consumers benefit from our marketplace.
        </Typography>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {teamMembers.map((member) => (
            <Grid item xs={12} md={4} key={member.name}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom>
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph>
          We envision a future where technology bridges the gap between farmers and consumers, 
          creating a more sustainable and efficient agricultural ecosystem. Through AgriZen, 
          we aim to support local farming communities while providing consumers with access 
          to fresh, high-quality produce.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage; 