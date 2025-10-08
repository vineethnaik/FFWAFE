import React, { useContext, useState } from 'react';
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
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShoppingCart } from '@mui/icons-material';
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

const newArrivalProducts = [
  {
    name: 'Organic Tomatoes',
    price: 45,
    image: 'https://images.unsplash.com/photo-1546094097-24607dd23f8e?w=500&auto=format&fit=crop&q=60',
    rating: 4.5,
    category: 'Vegetables',
    isNew: true
  },
  {
    name: 'Fresh Spinach',
    price: 30,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60',
    rating: 4.2,
    category: 'Vegetables',
    isNew: true
  },
  {
    name: 'Organic Apples',
    price: 60,
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&auto=format&fit=crop&q=60',
    rating: 4.8,
    category: 'Fruits',
    isNew: true
  },
  {
    name: 'Fresh Strawberries',
    price: 75,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=60',
    rating: 4.6,
    category: 'Fruits',
    isNew: true
  }
];

const categories = ['Vegetables', 'Fruits'];

const NewArrivalPage = () => {
  const { search } = useContext(SearchContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  let filteredProducts = newArrivalProducts
    .filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );

  if (sortBy === 'price-asc') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
  } else {
    filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ pt: 6, pb: 2 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filters */}
          <Grid item xs={12} md={3}>
            <Sidebar elevation={2}>
              <Typography variant="h6" gutterBottom>Filters</Typography>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>Category</Typography>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={selectedCategory} label="Category" onChange={handleCategoryChange}>
                    <MenuItem value="all">All</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>Price Range</Typography>
                <Slider
                  value={priceRange}
                  min={0}
                  max={200}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  sx={{ mt: 1, mb: 1 }}
                />
                <Box display="flex" justifyContent="space-between">
                  <TextField size="small" value={priceRange[0]} sx={{ width: 60 }} />
                  <Typography sx={{ mx: 1 }}>to</Typography>
                  <TextField size="small" value={priceRange[1]} sx={{ width: 60 }} />
                </Box>
              </Box>
            </Sidebar>
          </Grid>
          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={3}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Grid container spacing={3}>
              {filteredProducts.map((product, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <ProductCard>
                    <Box sx={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f3f3f3' }}>
                      <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 8 }} />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" fontWeight={700}>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>{product.category}</Typography>
                      <Typography variant="h6" color="success.main" fontWeight={700}>₹{product.price}</Typography>
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
                <strong>Category:</strong> {selectedProduct.category}<br />
                <strong>Price:</strong> ₹{selectedProduct.price}<br />
                <strong>Rating:</strong> {selectedProduct.rating}
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
    </Box>
  );
};

export default NewArrivalPage; 