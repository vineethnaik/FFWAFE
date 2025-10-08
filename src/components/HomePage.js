import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Home as HomeIcon,
  LocalFlorist as ProductsIcon,
  NewReleases as NewArrivalIcon,
  Park as SeedIcon,
  Info as AboutIcon,
  ShoppingCart as CartIcon,
  Favorite as WishlistIcon,
  Logout as LogoutIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  LocalShipping as LocalShippingIcon,
  EmojiNature as EmojiNatureIcon,
  MonetizationOn as MonetizationOnIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import NavBar from './NavBar';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#2E7D32',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  margin: '0 4px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginRight: theme.spacing(4),
}));

const CarouselImage = styled('img')({
  width: '100%',
  height: '500px',
  objectFit: 'cover',
});

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1B5E20',
  color: 'white',
  padding: theme.spacing(6, 0),
  marginTop: theme.spacing(8),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);

  const handleLogout = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <EmojiNatureIcon sx={{ fontSize: 40, color: '#388e3c' }} />,
      title: 'Direct from Farmers',
      desc: 'Fresh, authentic produce delivered straight from local farms to your doorstep.'
    },
    {
      icon: <MonetizationOnIcon sx={{ fontSize: 40, color: '#388e3c' }} />,
      title: 'Best Prices',
      desc: 'No middlemen. Enjoy fair prices and support sustainable agriculture.'
    },
   
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#388e3c' }} />,
      title: 'Trusted & Secure',
      desc: 'Verified sellers, secure payments, and a satisfaction guarantee.'
    },
  ];

  const testimonials = [
    {
      name: 'Ravi Kumar',
      role: 'Buyer',
      text: 'AgriZen made it so easy to get fresh veggies at great prices. I love supporting local farmers!',
      avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dindian%2Bfarmer&psig=AOvVaw3nqtwT36omErG_e5dY-WaF&ust=1760027404585000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC0rJKDlZADFQAAAAAdAAAAABAE.jpeg'
    },
    {
      name: 'Lakshmi Devi',
      role: 'Farmer',
      text: 'I can sell my produce directly and get paid fairly. The platform is simple and effective.',
      avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dindian%2Bfarmer&psig=AOvVaw3nqtwT36omErG_e5dY-WaF&ust=1760027404585000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC0rJKDlZADFQAAAAAdAAAAABAE'
    }
  ];

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Modern Agriculture',
      description: 'Discover the latest in agricultural technology'
    },
    {
      image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Sustainable Farming',
      description: 'Learn about eco-friendly farming practices'
    },
    {
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Organic Produce',
      description: 'Explore our organic farming methods'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f6fff7' }}>
      <NavBar />
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: 420,
          background: `linear-gradient(rgba(46,125,50,0.7), rgba(46,125,50,0.7)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80') center/cover`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight={800} letterSpacing={2} mb={2} sx={{ fontSize: { xs: 32, md: 48 } }}>
            Welcome to AgriZen
          </Typography>
          <Typography variant="h5" mb={4} sx={{ fontWeight: 400 }}>
            India's trusted marketplace for fresh, sustainable, and fairly-priced agricultural products.
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ px: 5, py: 1.5, fontSize: 20, borderRadius: 8, boxShadow: '0 4px 24px rgba(46,125,50,0.15)' }}
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} color="#225c2b" align="center" mb={6}>
          Why Choose AgriZen?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card elevation={3} sx={{ borderRadius: 4, p: 2, textAlign: 'center', minHeight: 220 }}>
                <Box mb={2}>{f.icon}</Box>
                <Typography variant="h6" fontWeight={700} mb={1}>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Testimonials Section */}
      <Box sx={{ bgcolor: '#e8f5e9', py: 8 }}>
        <Container>
          <Typography variant="h4" fontWeight={700} color="#225c2b" align="center" mb={6}>
            What Our Users Say
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((t, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card elevation={0} sx={{ borderRadius: 4, p: 4, textAlign: 'center', bgcolor: '#fff' }}>
                  <Stack alignItems="center" spacing={2}>
                    <Avatar src={t.avatar} sx={{ width: 64, height: 64 }} />
                    <Typography variant="body1" fontStyle="italic">"{t.text}"</Typography>
                    <Typography variant="subtitle2" color="text.secondary">- {t.name}, {t.role}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 