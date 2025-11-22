import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Slider,
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  FormControl,
  Paper,
  Container,
  IconButton,
  Link,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Rating,
  Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn, 
  ShoppingCart,
  Verified
} from '@mui/icons-material';
import NavBar from './NavBar';
import { SearchContext } from './SearchContext';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

// Premium styled components
const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  borderRadius: 20,
  minWidth: 260,
  maxWidth: 320,
  marginRight: theme.spacing(4),
  background: 'linear-gradient(135deg, #ffffff 0%, #f8faf9 100%)',
  boxShadow: '0 4px 20px rgba(46, 125, 50, 0.08)',
  border: '1px solid rgba(46, 125, 50, 0.1)',
  [theme.breakpoints.down('md')]: {
    marginRight: 0,
    marginBottom: theme.spacing(4),
    maxWidth: '100%',
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  marginBottom: theme.spacing(3),
  background: '#ffffff',
  border: '1px solid rgba(46, 125, 50, 0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(46, 125, 50, 0.15)',
    borderColor: 'rgba(46, 125, 50, 0.3)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #2E7D32 0%, #66BB6A 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#2E7D32',
  height: 6,
  '& .MuiSlider-thumb': {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    border: '3px solid #2E7D32',
    boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
    },
  },
  '& .MuiSlider-track': {
    backgroundColor: '#2E7D32',
    border: 'none',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#E8F5E9',
  },
}));

const OrganicBadge = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '0.75rem',
  padding: '4px 12px',
  boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const FairPriceBadge = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '0.75rem',
  padding: '4px 12px',
  boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const ProductImageBox = styled(Box)(({ theme }) => ({
  height: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f8faf9 0%, #e8f5e9 100%)',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
  },
  '&:hover img': {
    transform: 'scale(1.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '10px 24px',
  fontWeight: 600,
  textTransform: 'none',
  fontFamily: "'Poppins', sans-serif",
  background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
    boxShadow: '0 6px 20px rgba(46, 125, 50, 0.4)',
    transform: 'translateY(-2px)',
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1B5E20',
  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
  color: 'white',
  padding: theme.spacing(6, 0, 4),
  marginTop: theme.spacing(8),
  width: '100%',
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  background: 'rgba(255, 255, 255, 0.1)',
  margin: theme.spacing(0, 1),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-3px) scale(1.1)',
  },
}));

const categories = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Bakery', 'Other'];
const practices = ['Organic', 'Conventional', 'Regenerative', 'Biodynamic', 'Hydroponic'];

// Generate random ratings for demo products
const generateRating = () => (Math.random() * 2 + 3).toFixed(1);

// Static demo catalog with ratings
const products = [
  {
    name: 'Organic Tomatoes',
    farm: 'Sunshine Farms',
    location: 'Riverside, CA',
    price: '₹60',
    unit: '/ kg',
    fairPrice: true,
    organic: true,
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Fresh Strawberries',
    farm: 'Berry Good Farms',
    location: 'Santa Cruz, CA',
    price: '₹120',
    unit: '/ basket',
    fairPrice: true,
    organic: false,
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Organic Kale',
    farm: 'Green Valley Farm',
    location: 'Sonoma, CA',
    price: '₹80',
    unit: '/ bunch',
    fairPrice: false,
    organic: true,
    rating: 4.3,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Fresh Potatoes',
    farm: 'Earthy Roots',
    location: 'Boise, ID',
    price: '₹40',
    unit: '/ kg',
    fairPrice: true,
    organic: false,
    rating: 4.6,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Brinjal (Eggplant)',
    farm: 'Purple Fields',
    location: 'Fresno, CA',
    price: '₹55',
    unit: '/ kg',
    fairPrice: false,
    organic: true,
    rating: 4.4,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Green Peas',
    farm: 'Spring Valley',
    location: 'Salinas, CA',
    price: '₹90',
    unit: '/ kg',
    fairPrice: true,
    organic: false,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Carrots',
    farm: 'Orange Acres',
    location: 'Bakersfield, CA',
    price: '₹50',
    unit: '/ bunch',
    fairPrice: false,
    organic: true,
    rating: 4.5,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Cabbage',
    farm: 'Leafy Greens',
    location: 'Watsonville, CA',
    price: '₹35',
    unit: '/ head',
    fairPrice: true,
    organic: false,
    rating: 4.2,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Cauliflower',
    farm: 'White Harvest',
    location: 'Gilroy, CA',
    price: '₹70',
    unit: '/ head',
    fairPrice: false,
    organic: true,
    rating: 4.6,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Onions',
    farm: 'Golden Fields',
    location: 'Walla Walla, WA',
    price: '₹30',
    unit: '/ kg',
    fairPrice: true,
    organic: false,
    rating: 4.3,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80',
  },
];

const API = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const BACKEND_ORIGIN = API.replace(/\/?api\/?$/, '');

const ProductsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [serverProducts, setServerProducts] = useState([]);
  const [selectedPractices, setSelectedPractices] = useState([]);
  const [priceRange, setPriceRange] = useState([30, 180]);
  const [sort, setSort] = useState('Newest');
  const [view, setView] = useState('Grid');
  const { search } = useContext(SearchContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Handle filters
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const handlePracticeChange = (practice) => {
    setSelectedPractices((prev) =>
      prev.includes(practice) ? prev.filter((p) => p !== practice) : [...prev, practice]
    );
  };

  useEffect(() => {
    async function load() {
      try {
        // Fetch all crops, but filter to show Vegetables from NEW_ARRIVAL and all PRODUCTS
        const [allCropsRes, newArrivalRes] = await Promise.all([
          fetch(`${API}/crops`),
          fetch(`${API}/admin/crops/category/NEW_ARRIVAL`)
        ]);
        
        let allRows = [];
        if (allCropsRes.ok) {
          const rows = await allCropsRes.json();
          // Filter for PRODUCTS category or null category
          const products = rows.filter(r => !r.category || r.category === 'PRODUCTS');
          allRows = [...allRows, ...products];
        }
        if (newArrivalRes.ok) {
          const rows = await newArrivalRes.json();
          // Filter for Vegetables from NEW_ARRIVAL
          const vegetables = rows.filter(r => r.cropType === 'Vegetables');
          allRows = [...allRows, ...vegetables];
        }
        
        // Remove duplicates based on crop ID
        const uniqueRows = allRows.filter((r, index, self) => 
          index === self.findIndex((t) => t.id === r.id)
        );
        
        // map backend schema to UI product card
        const mapped = uniqueRows.map(r => {
          let imageUrl = null;
          if (r.imageUrl) {
            if (r.imageUrl.startsWith('http://') || r.imageUrl.startsWith('https://')) {
              imageUrl = r.imageUrl;
            } else {
              // Construct full URL for relative paths
              // Remove leading slash if present, then add it back with BACKEND_ORIGIN
              const cleanPath = r.imageUrl.startsWith('/') ? r.imageUrl : `/${r.imageUrl}`;
              imageUrl = `${BACKEND_ORIGIN}${cleanPath}`;
            }
          }
          
          return {
            name: r.cropName,
            farm: r.farmer?.name || 'Farmer',
            location: r.location,
            price: `₹${r.price}`,
            unit: '/ unit',
            fairPrice: true,
            organic: false,
            rating: parseFloat(generateRating()),
            reviews: Math.floor(Math.random() * 200) + 50,
            image: imageUrl
          };
        });
        setServerProducts(mapped);
      } catch (err) {
        console.error('Failed to load crops:', err);
      }
    }
    load();
  }, []);

  // Show server results first, then demo catalog as fallback content
  const allProducts = serverProducts.length ? [...serverProducts, ...products] : products;

  // Filtering logic
  let filteredProducts = allProducts.filter(product =>
    (search === '' ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.farm.toLowerCase().includes(search.toLowerCase()) ||
      product.location.toLowerCase().includes(search.toLowerCase())) &&
    (selectedCategories.length === 0 || selectedCategories.some(cat => product.name.toLowerCase().includes(cat.toLowerCase()))) &&
    (selectedPractices.length === 0 || selectedPractices.some(prac => product.organic && prac === 'Organic')) &&
    (parseFloat(product.price.replace('₹', '')) >= priceRange[0] && parseFloat(product.price.replace('₹', '')) <= priceRange[1])
  );

  // Sorting logic
  if (sort === 'PriceLow') {
    filteredProducts = filteredProducts.sort((a, b) => parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', '')));
  } else if (sort === 'PriceHigh') {
    filteredProducts = filteredProducts.sort((a, b) => parseFloat(b.price.replace('₹', '')) - parseFloat(a.price.replace('₹', '')));
  }

  // Modal handlers
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarOpen(true);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/payment');
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9', fontFamily: "'Poppins', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 4, flex: 1 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filters */}
          <Grid item xs={12} md={3}>
            <Sidebar elevation={0}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: '#2E7D32',
                  fontFamily: "'Poppins', sans-serif",
                  mb: 3
                }}
              >
                Filters
              </Typography>
              <Box mb={3}>
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600}
                  sx={{ 
                    color: '#1B5E20',
                    fontFamily: "'Poppins', sans-serif",
                    mb: 1.5
                  }}
                >
                  Categories
                </Typography>
                <FormGroup>
                  {categories.map((cat) => (
                    <FormControlLabel
                      key={cat}
                      control={
                        <Checkbox 
                          checked={selectedCategories.includes(cat)} 
                          onChange={() => handleCategoryChange(cat)}
                          sx={{
                            color: '#2E7D32',
                            '&.Mui-checked': {
                              color: '#2E7D32',
                            },
                          }}
                        />
                      }
                      label={cat}
                      sx={{ 
                        fontFamily: "'Inter', sans-serif",
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.9rem',
                        }
                      }}
                    />
                  ))}
                </FormGroup>
              </Box>
              <Box mb={3}>
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600}
                  sx={{ 
                    color: '#1B5E20',
                    fontFamily: "'Poppins', sans-serif",
                    mb: 1.5
                  }}
                >
                  Price Range
                </Typography>
                <StyledSlider
                  value={priceRange}
                  min={30}
                  max={180}
                  onChange={(e, val) => setPriceRange(val)}
                  valueLabelDisplay="auto"
                  sx={{ mt: 2, mb: 2 }}
                />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <TextField 
                    size="small" 
                    value={`₹${priceRange[0]}`} 
                    sx={{ 
                      width: 80,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontFamily: "'Inter', sans-serif",
                      }
                    }} 
                    disabled
                  />
                  <Typography sx={{ mx: 1, color: '#666', fontFamily: "'Inter', sans-serif" }}>to</Typography>
                  <TextField 
                    size="small" 
                    value={`₹${priceRange[1]}`} 
                    sx={{ 
                      width: 80,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontFamily: "'Inter', sans-serif",
                      }
                    }} 
                    disabled
                  />
                </Box>
              </Box>
              <Box mb={3}>
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600}
                  sx={{ 
                    color: '#1B5E20',
                    fontFamily: "'Poppins', sans-serif",
                    mb: 1.5
                  }}
                >
                  Farming Practices
                </Typography>
                <FormGroup>
                  {practices.map((practice) => (
                    <FormControlLabel
                      key={practice}
                      control={
                        <Checkbox 
                          checked={selectedPractices.includes(practice)} 
                          onChange={() => handlePracticeChange(practice)}
                          sx={{
                            color: '#2E7D32',
                            '&.Mui-checked': {
                              color: '#2E7D32',
                            },
                          }}
                        />
                      }
                      label={practice}
                      sx={{ 
                        fontFamily: "'Inter', sans-serif",
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.9rem',
                        }
                      }}
                    />
                  ))}
                </FormGroup>
              </Box>
              <Box mb={2}>
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600}
                  sx={{ 
                    color: '#1B5E20',
                    fontFamily: "'Poppins', sans-serif",
                    mb: 1.5
                  }}
                >
                  Location
                </Typography>
                <TextField 
                  size="small" 
                  placeholder="Enter location" 
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontFamily: "'Inter', sans-serif",
                    }
                  }}
                />
              </Box>
            </Sidebar>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center" 
              mb={4}
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={2}
            >
              <Typography 
                variant="h4" 
                fontWeight={700} 
                sx={{ 
                  color: '#1B5E20',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                All Products
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ fontFamily: "'Inter', sans-serif" }}>Sort</InputLabel>
                  <Select 
                    value={sort} 
                    label="Sort" 
                    onChange={e => setSort(e.target.value)}
                    sx={{ 
                      borderRadius: 2,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <MenuItem value="Newest" sx={{ fontFamily: "'Inter', sans-serif" }}>Newest</MenuItem>
                    <MenuItem value="PriceLow" sx={{ fontFamily: "'Inter', sans-serif" }}>Price: Low to High</MenuItem>
                    <MenuItem value="PriceHigh" sx={{ fontFamily: "'Inter', sans-serif" }}>Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ fontFamily: "'Inter', sans-serif" }}>View</InputLabel>
                  <Select 
                    value={view} 
                    label="View" 
                    onChange={e => setView(e.target.value)}
                    sx={{ 
                      borderRadius: 2,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <MenuItem value="Grid" sx={{ fontFamily: "'Inter', sans-serif" }}>Grid View</MenuItem>
                    <MenuItem value="List" sx={{ fontFamily: "'Inter', sans-serif" }}>List View</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Grid container spacing={3}>
              {filteredProducts.map((product, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <ProductCard>
                    <Box sx={{ p: 1.5, pb: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {product.organic && (
                          <OrganicBadge 
                            icon={<Verified sx={{ fontSize: 14, color: '#fff !important' }} />}
                            label="Organic" 
                            size="small" 
                          />
                        )}
                        {product.fairPrice && (
                          <FairPriceBadge label="Fair Price" size="small" />
                        )}
                      </Box>
                    </Box>
                    <ProductImageBox>
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          style={{ 
                            borderRadius: 12,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.target.src = 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      ) : (
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: '#999',
                          fontSize: '0.9rem'
                        }}>
                          No Image
                        </div>
                      )}
                    </ProductImageBox>
                    <CardContent sx={{ p: 2 }}>
                      <Typography 
                        variant="h6" 
                        fontWeight={700}
                        sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          color: '#1B5E20',
                          mb: 0.75,
                          fontSize: '1rem'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#666',
                          fontFamily: "'Inter', sans-serif",
                          mb: 1,
                          fontSize: '0.85rem'
                        }}
                      >
                        {product.farm} • {product.location}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <Rating 
                          value={product.rating || 4.5} 
                          precision={0.1} 
                          readOnly 
                          size="small"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: '#FFB300',
                            },
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#666',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.8rem'
                          }}
                        >
                          ({product.reviews || 0} reviews)
                        </Typography>
                      </Stack>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: '#2E7D32',
                          fontWeight: 700,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {product.price} 
                        <Typography 
                          component="span" 
                          sx={{ 
                            color: '#999',
                            fontSize: '0.9rem',
                            fontWeight: 400,
                            fontFamily: "'Inter', sans-serif",
                            ml: 0.5
                          }}
                        >
                          {product.unit}
                        </Typography>
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 1.5, pt: 0 }}>
                      <StyledButton 
                        variant="contained" 
                        fullWidth 
                        startIcon={<ShoppingCart />} 
                        onClick={() => handleViewProduct(product)}
                      >
                        View Product
                      </StyledButton>
                    </CardActions>
                  </ProductCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* Product Details Modal */}
      <Dialog 
        open={modalOpen} 
        onClose={handleCloseModal} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            fontFamily: "'Poppins', sans-serif",
          }
        }}
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: '#1B5E20' }}>
              {selectedProduct.name}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  style={{ 
                    maxHeight: 250, 
                    borderRadius: 16,
                    width: '100%',
                    objectFit: 'cover'
                  }} 
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                  <Rating 
                    value={selectedProduct.rating || 4.5} 
                    precision={0.1} 
                    readOnly 
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#FFB300',
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#666', fontFamily: "'Inter', sans-serif" }}>
                    {selectedProduct.rating} ({selectedProduct.reviews || 0} reviews)
                  </Typography>
                </Stack>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {selectedProduct.organic && (
                    <OrganicBadge 
                      icon={<Verified sx={{ fontSize: 14, color: '#fff !important' }} />}
                      label="Organic Certified" 
                      size="small" 
                    />
                  )}
                  {selectedProduct.fairPrice && (
                    <FairPriceBadge label="Fair Price" size="small" />
                  )}
                </Box>
              </Box>
              <DialogContentText sx={{ fontFamily: "'Inter', sans-serif", mb: 2 }}>
                <strong>Farm:</strong> {selectedProduct.farm}<br />
                <strong>Location:</strong> {selectedProduct.location}<br />
                <strong>Price:</strong> {selectedProduct.price} {selectedProduct.unit}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button 
                onClick={() => handleAddToCart(selectedProduct)} 
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  borderColor: '#2E7D32',
                  color: '#2E7D32',
                  '&:hover': {
                    borderColor: '#1B5E20',
                    background: 'rgba(46, 125, 50, 0.1)',
                  }
                }}
              >
                Add to Cart
              </Button>
              <Button 
                onClick={() => handleBuyNow(selectedProduct)} 
                variant="contained"
                sx={{
                  borderRadius: 2,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                  }
                }}
              >
                Buy Now
              </Button>
              <Button 
                onClick={handleCloseModal} 
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#666',
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ 
            width: '100%',
            fontFamily: "'Inter', sans-serif",
            borderRadius: 2,
          }}
        >
          Added to cart successfully! Get ready for payment.
        </Alert>
      </Snackbar>
      {/* Sticky Footer */}
      <Footer>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  mb: 2
                }}
              >
                About AgriZen
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  fontFamily: "'Inter', sans-serif",
                  opacity: 0.9,
                  lineHeight: 1.8
                }}
              >
                Connecting farmers with buyers directly, promoting fair pricing and sustainable agriculture. 
                Your trusted marketplace for fresh, organic produce.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  mb: 2
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link 
                  component={RouterLink} 
                  to="/about" 
                  color="inherit" 
                  sx={{ 
                    fontFamily: "'Inter', sans-serif",
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                    }
                  }}
                >
                  About Us
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/products" 
                  color="inherit"
                  sx={{ 
                    fontFamily: "'Inter', sans-serif",
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Products
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/home" 
                  color="inherit"
                  sx={{ 
                    fontFamily: "'Inter', sans-serif",
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Home
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/new-arrival" 
                  color="inherit"
                  sx={{ 
                    fontFamily: "'Inter', sans-serif",
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                    }
                  }}
                >
                  New Arrival
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  mb: 2
                }}
              >
                Connect With Us
              </Typography>
              <Box sx={{ mt: 1 }}>
                <SocialIconButton aria-label="Facebook" href="https://facebook.com" target="_blank">
                  <Facebook />
                </SocialIconButton>
                <SocialIconButton aria-label="Twitter" href="https://twitter.com" target="_blank">
                  <Twitter />
                </SocialIconButton>
                <SocialIconButton aria-label="Instagram" href="https://instagram.com" target="_blank">
                  <Instagram />
                </SocialIconButton>
                <SocialIconButton aria-label="LinkedIn" href="https://linkedin.com" target="_blank">
                  <LinkedIn />
                </SocialIconButton>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
          <Typography 
            variant="body2" 
            align="center"
            sx={{ 
              fontFamily: "'Inter', sans-serif",
              opacity: 0.8
            }}
          >
            © {new Date().getFullYear()} AgriZen. All rights reserved. | Premium Farmer Marketplace
          </Typography>
        </Container>
      </Footer>
    </Box>
  );
};

export default ProductsPage;
