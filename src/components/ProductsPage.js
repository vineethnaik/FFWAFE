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
  Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, LinkedIn, ShoppingCart } from '@mui/icons-material';
import NavBar from './NavBar';
import { SearchContext } from './SearchContext';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  minWidth: 260,
  maxWidth: 320,
  marginRight: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    marginRight: 0,
    marginBottom: theme.spacing(4),
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  marginBottom: theme.spacing(3),
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1B5E20',
  color: 'white',
  padding: theme.spacing(6, 0),
  marginTop: theme.spacing(8),
}));

const categories = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Bakery', 'Other'];
const practices = ['Organic', 'Conventional', 'Regenerative', 'Biodynamic', 'Hydroponic'];

// Static demo catalog (restored)
const products = [
  {
    name: 'Organic Tomatoes',
    farm: 'Sunshine Farms',
    location: 'Riverside, CA',
    price: '₹60',
    unit: '/ kg',
    fairPrice: true,
    organic: true,
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
        const res = await fetch(`${API}/crops`);
        if (res.ok) {
          const rows = await res.json();
          // map backend schema to UI product card
          const mapped = rows.map(r => ({
            name: r.cropName,
            farm: r.farmer?.name || 'Farmer',
            location: r.location,
            price: `₹${r.price}`,
            unit: '/ unit',
            fairPrice: true,
            organic: false,
            image: r.imageUrl && r.imageUrl.startsWith('http') ? r.imageUrl : (r.imageUrl ? `${BACKEND_ORIGIN}${r.imageUrl}` : undefined)
          }));
          setServerProducts(mapped);
        }
      } catch (_) {}
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
    // Single-item checkout: replace cart with just this item
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ pt: 6, pb: 2 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filters */}
          <Grid item xs={12} md={3}>
            <Sidebar elevation={2}>
              <Typography variant="h6" gutterBottom>Filters</Typography>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>Categories</Typography>
                <FormGroup>
                  {categories.map((cat) => (
                    <FormControlLabel
                      key={cat}
                      control={<Checkbox checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} />}
                      label={cat}
                    />
                  ))}
                </FormGroup>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>Price Range</Typography>
                <Slider
                  value={priceRange}
                  min={30}
                  max={180}
                  onChange={(e, val) => setPriceRange(val)}
                  valueLabelDisplay="auto"
                  sx={{ mt: 1, mb: 1 }}
                />
                <Box display="flex" justifyContent="space-between">
                  <TextField size="small" value={priceRange[0]} sx={{ width: 60 }} />
                  <Typography sx={{ mx: 1 }}>to</Typography>
                  <TextField size="small" value={priceRange[1]} sx={{ width: 60 }} />
                </Box>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>Farming Practices</Typography>
                <FormGroup>
                  {practices.map((practice) => (
                    <FormControlLabel
                      key={practice}
                      control={<Checkbox checked={selectedPractices.includes(practice)} onChange={() => handlePracticeChange(practice)} />}
                      label={practice}
                    />
                  ))}
                </FormGroup>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>Location</Typography>
                <TextField size="small" placeholder="Enter location" fullWidth />
              </Box>
            </Sidebar>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight={700} color="#225c2b">All Products</Typography>
              <Box display="flex" gap={2}>
                <FormControl size="small">
                  <InputLabel>Sort</InputLabel>
                  <Select value={sort} label="Sort" onChange={e => setSort(e.target.value)}>
                    <MenuItem value="Newest">Newest</MenuItem>
                    <MenuItem value="PriceLow">Price: Low to High</MenuItem>
                    <MenuItem value="PriceHigh">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small">
                  <InputLabel>View</InputLabel>
                  <Select value={view} label="View" onChange={e => setView(e.target.value)}>
                    <MenuItem value="Grid">Grid View</MenuItem>
                    <MenuItem value="List">List View</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Grid container spacing={3}>
              {filteredProducts.map((product, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <ProductCard>
                    <Box sx={{ p: 2, pb: 0, display: 'flex', justifyContent: 'space-between' }}>
                      {product.fairPrice && <Chip label="Fair Price" color="primary" size="small" sx={{ fontWeight: 700 }} />}
                      {product.organic && <Chip label="Organic" color="success" size="small" sx={{ fontWeight: 700 }} />}
                    </Box>
                    <Box sx={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f3f3f3' }}>
                      <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 8 }} />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" fontWeight={700}>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>{product.farm} • {product.location}</Typography>
                      <Typography variant="h6" color="success.main" fontWeight={700}>{product.price} <Typography component="span" color="text.secondary" fontSize={16}>{product.unit}</Typography></Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button variant="contained" color="success" fullWidth startIcon={<ShoppingCart />} onClick={() => handleViewProduct(product)}>
                        View Product
                      </Button>
                    </CardActions>
                  </ProductCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* Product Details Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ maxHeight: 200, borderRadius: 12 }} />
              </Box>
              <DialogContentText>
                <strong>Farm:</strong> {selectedProduct.farm}<br />
                <strong>Location:</strong> {selectedProduct.location}<br />
                <strong>Price:</strong> {selectedProduct.price} {selectedProduct.unit}<br />
                {selectedProduct.fairPrice && <Chip label="Fair Price" color="primary" size="small" sx={{ fontWeight: 700, ml: 1 }} />}
                {selectedProduct.organic && <Chip label="Organic" color="success" size="small" sx={{ fontWeight: 700, ml: 1 }} />}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => handleAddToCart(selectedProduct)} color="success" variant="outlined">Add to Cart</Button>
              <Button onClick={() => handleBuyNow(selectedProduct)} color="success" variant="contained">Buy Now</Button>
              <Button onClick={handleCloseModal} color="primary">Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Added to cart successfully! Get ready for payment.
        </Alert>
      </Snackbar>
      {/* Footer */}
      <Footer>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                About AgriZen
              </Typography>
              <Typography variant="body2">
                Connecting farmers with buyers directly, promoting fair pricing and sustainable agriculture.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Link component={RouterLink} to="/about" color="inherit" display="block">About Us</Link>
              <Link component={RouterLink} to="/products" color="inherit" display="block">Products</Link>
              <Link component={RouterLink} to="/home" color="inherit" display="block">Home</Link>
              <Link component={RouterLink} to="/new-arrival" color="inherit" display="block">New Arrival</Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Connect With Us
              </Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton color="inherit">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} AgriZen. All rights reserved.
          </Typography>
        </Container>
      </Footer>
    </Box>
  );
};

export default ProductsPage; 