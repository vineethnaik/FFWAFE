import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Rating,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShoppingCart, Verified } from '@mui/icons-material';
import NavBar from './NavBar';
import { SearchContext } from './SearchContext';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

// Premium styled components matching ProductsPage
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

const NewBadge = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #E91E63 0%, #F06292 100%)',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '0.75rem',
  padding: '4px 12px',
  boxShadow: '0 2px 8px rgba(233, 30, 99, 0.3)',
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

const newArrivalProducts = [
  {
    name: 'Organic Tomatoes',
    farm: 'Sunshine Farms',
    location: 'Riverside, CA',
    price: '₹45',
    unit: '/ kg',
    image: 'https://images.unsplash.com/photo-1546094097-24607dd23f8e?w=500&auto=format&fit=crop&q=60',
    rating: 4.5,
    reviews: 128,
    category: 'Vegetables',
    organic: true,
    fairPrice: true,
    isNew: true
  },
  {
    name: 'Fresh Spinach',
    farm: 'Green Valley Farm',
    location: 'Sonoma, CA',
    price: '₹30',
    unit: '/ bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60',
    rating: 4.2,
    reviews: 95,
    category: 'Vegetables',
    organic: true,
    fairPrice: false,
    isNew: true
  },
  {
    name: 'Organic Apples',
    farm: 'Apple Orchard',
    location: 'Fresno, CA',
    price: '₹60',
    unit: '/ kg',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&auto=format&fit=crop&q=60',
    rating: 4.8,
    reviews: 203,
    category: 'Fruits',
    organic: true,
    fairPrice: true,
    isNew: true
  },
  {
    name: 'Fresh Strawberries',
    farm: 'Berry Good Farms',
    location: 'Santa Cruz, CA',
    price: '₹75',
    unit: '/ basket',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=60',
    rating: 4.6,
    reviews: 167,
    category: 'Fruits',
    organic: false,
    fairPrice: true,
    isNew: true
  }
];

const categories = ['Vegetables', 'Fruits'];

const API = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const BACKEND_ORIGIN = API.replace(/\/?api\/?$/, '');

const NewArrivalPage = () => {
  const { search } = useContext(SearchContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [serverProducts, setServerProducts] = useState([]);

  // Fetch crops from backend - both NEW_ARRIVAL and SEEDS_SAPLINGS (new seeds & saplings)
  useEffect(() => {
    async function loadCrops() {
      try {
        const [newArrivalRes, seedsRes] = await Promise.all([
          fetch(`${API}/admin/crops/category/NEW_ARRIVAL`),
          fetch(`${API}/admin/crops/category/SEEDS_SAPLINGS`)
        ]);
        
        let allRows = [];
        if (newArrivalRes.ok) {
          const rows = await newArrivalRes.json();
          allRows = [...allRows, ...rows];
        }
        if (seedsRes.ok) {
          const rows = await seedsRes.json();
          allRows = [...allRows, ...rows];
        }
        
        const mapped = allRows.map(r => {
          let imageUrl = null;
          if (r.imageUrl) {
            if (r.imageUrl.startsWith('http://') || r.imageUrl.startsWith('https://')) {
              imageUrl = r.imageUrl;
            } else {
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
            image: imageUrl,
            rating: 4.5,
            reviews: Math.floor(Math.random() * 200) + 50,
            category: r.cropType || 'Vegetables',
            organic: false,
            fairPrice: true,
            isNew: true
          };
        });
        setServerProducts(mapped);
      } catch (err) {
        console.error('Failed to load new arrival crops:', err);
      }
    }
    loadCrops();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Combine server products with demo products
  const allProducts = serverProducts.length > 0 ? [...serverProducts, ...newArrivalProducts] : newArrivalProducts;

  let filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const price = parseFloat(product.price.replace('₹', ''));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  if (sortBy === 'price-asc') {
    filteredProducts = filteredProducts.sort((a, b) => parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', '')));
  } else if (sortBy === 'price-desc') {
    filteredProducts = filteredProducts.sort((a, b) => parseFloat(b.price.replace('₹', '')) - parseFloat(a.price.replace('₹', '')));
  } else if (sortBy === 'rating') {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
  } else {
    filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

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
                  min={0}
                  max={200}
                  onChange={handlePriceChange}
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
                New Arrivals
              </Typography>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel sx={{ fontFamily: "'Inter', sans-serif" }}>Sort</InputLabel>
                <Select 
                  value={sortBy} 
                  label="Sort" 
                  onChange={handleSortChange}
                  sx={{ 
                    borderRadius: 2,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <MenuItem value="name" sx={{ fontFamily: "'Inter', sans-serif" }}>Name</MenuItem>
                  <MenuItem value="price-asc" sx={{ fontFamily: "'Inter', sans-serif" }}>Price: Low to High</MenuItem>
                  <MenuItem value="price-desc" sx={{ fontFamily: "'Inter', sans-serif" }}>Price: High to Low</MenuItem>
                  <MenuItem value="rating" sx={{ fontFamily: "'Inter', sans-serif" }}>Rating</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Grid container spacing={3}>
              {filteredProducts.map((product, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <ProductCard>
                    <Box sx={{ p: 1.5, pb: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {product.isNew && (
                          <NewBadge label="New" size="small" />
                        )}
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
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        style={{ 
                          borderRadius: 12,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }} 
                      />
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
                  {selectedProduct.isNew && (
                    <NewBadge label="New" size="small" />
                  )}
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
                <strong>Category:</strong> {selectedProduct.category}<br />
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
            </DialogActions>
          </>
        )}
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Added to cart successfully! Get ready for payment.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewArrivalPage;
