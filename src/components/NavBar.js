import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  InputBase,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  Tooltip,
  Divider
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Home as HomeIcon,
  LocalFlorist as ProductsIcon,
  NewReleases as NewArrivalIcon,
  Park as SeedIcon,
  Info as AboutIcon,
  ShoppingCart as CartIcon,
  Favorite as WishlistIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from './SearchContext';
import { CartContext } from './CartContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #2E7D32 60%, #66bb6a 100%)',
  boxShadow: '0 4px 16px rgba(46,125,50,0.10)',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginRight: theme.spacing(4),
  letterSpacing: 2,
  fontSize: 28,
  color: '#fff',
  textShadow: '0 2px 8px rgba(46,125,50,0.15)',
  fontFamily: 'Montserrat, sans-serif',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: '0 8px',
  fontWeight: 600,
  letterSpacing: 1,
  borderRadius: 20,
  padding: '6px 18px',
  transition: 'background 0.2s, color 0.2s',
  '&:hover': {
    background: 'rgba(255,255,255,0.15)',
    color: '#225c2b',
  },
}));

const IconCircle = styled(IconButton)(({ theme }) => ({
  color: 'white',
  background: 'rgba(46,125,50,0.08)',
  margin: '0 4px',
  borderRadius: '50%',
  transition: 'background 0.2s',
  '&:hover': {
    background: '#fff',
    color: '#225c2b',
  },
}));

const SearchBox = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: alpha(theme.palette.common.white, 0.95),
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 280,
  border: `2px solid ${theme.palette.success.main}`,
  boxShadow: '0 2px 8px rgba(46,125,50,0.10)',
  transition: 'box-shadow 0.2s, border-color 0.2s',
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: '0 0 0 3px rgba(46,125,50,0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 140,
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const pages = [
  { name: 'Home', path: '/home' },
  { name: 'Products', path: '/products' },
  { name: 'New Arrival', path: '/new-arrival' },
  { name: 'Seeds & Saplings', path: '/seeds-saplings' },
  { name: 'About Us', path: '/about' },
];

function NavBar() {
  const navigate = useNavigate();
  const { cart } = React.useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const user = { name: 'Vineeth', role: 'Farmer' };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          {/* Modern Logo */}
          <Logo variant="h5" component="div" onClick={() => handleNavigation('/home')} style={{ cursor: 'pointer' }}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/plant-under-sun.png" alt="logo" style={{height: 36, marginRight: 8}} />
            AgriZen
          </Logo>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavigation(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavButton
                key={page.name}
                onClick={() => handleNavigation(page.path)}
                sx={{ my: 2, display: 'block' }}
              >
                {page.name}
              </NavButton>
            ))}
          </Box>

          {/* Search Box */}
          <SearchBox>
            <SearchIcon sx={{ ml: 1, color: 'text.secondary' }} />
            <SearchInput
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
            />
          </SearchBox>

          {/* User Greeting */}
          <Typography sx={{ color: '#fff', fontWeight: 500, mx: 2, display: { xs: 'none', md: 'block' } }}>
            Hi, {user.name}!
          </Typography>

          {/* Cart and Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconCircle
              size="large"
              aria-label="cart"
              onClick={() => handleNavigation('/cart')}
            >
              <Badge badgeContent={cart.length} color="error">
                <CartIcon />
              </Badge>
            </IconCircle>
            <IconCircle
              size="large"
              aria-label="profile"
              onClick={() => setProfileOpen(true)}
            >
              <AccountCircleIcon />
            </IconCircle>
          </Box>
        </Toolbar>
      </Container>
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cart Items</DialogTitle>
        <DialogContent>
          {cart.length === 0 ? (
            <DialogContentText>Your cart is empty.</DialogContentText>
          ) : (
            cart.map((item, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 1, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span><strong>{item.name}</strong> — {item.price} {item.unit}</span>
                <Button size="small" color="error" onClick={() => { setCartOpen(false); navigate('/cart'); }}>Remove</Button>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartOpen(false)} color="primary">Close</Button>
          {cart.length > 0 && (
            <Button onClick={() => { setCartOpen(false); navigate('/payment'); }} color="success" variant="contained">Proceed to Payment</Button>
          )}
        </DialogActions>
      </Dialog>
      {/* Profile Dialog */}
      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          {/* Dummy user details for now */}
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <AccountCircleIcon sx={{ fontSize: 60, color: '#2E7D32', mb: 1 }} />
            <Typography variant="h6" gutterBottom>Vineeth Naik</Typography>
            <Typography variant="body2" color="text.secondary">vineeth@example.com</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2"><strong>Role:</strong> Farmer</Typography>
            <Typography variant="body2"><strong>Location:</strong> Hyderabad, India</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setProfileOpen(false)} color="primary">Close</Button>
          <Button
            onClick={() => {
              try {
                localStorage.removeItem('userId');
                localStorage.removeItem('role');
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                localStorage.removeItem('farmerId');
              } catch (e) {}
              setProfileOpen(false);
              navigate('/login');
            }}
            color="error"
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </StyledAppBar>
  );
}

export default NavBar; 