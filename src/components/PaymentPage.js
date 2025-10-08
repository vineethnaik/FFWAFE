import React, { useContext, useState } from 'react';
import {
  Box, Container, Typography, List, ListItem, ListItemText, Divider, Button,
  TextField, Dialog, DialogContent, DialogActions, RadioGroup,
  FormControlLabel, Radio, Fade, Zoom
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { CartContext } from './CartContext';

const DUMMY_QR = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=dummyrazorpay@upi&pn=AgriZen';

function generatePaymentId() {
  const ts = Date.now();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AGZ-${ts}-${rand}`;
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    card: '',
    expiry: '',
    cvv: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [qrPaid, setQrPaid] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  const total = cart.reduce((sum, item) => {
    let price = 0;
    if (typeof item.price === 'string') {
      price = parseFloat(item.price.replace('₹', ''));
    } else {
      price = item.price;
    }
    return sum + price;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (paymentMethod === 'cod') {
      if (!form.name || !form.email) {
        setFormError('Please fill all required fields.');
        return;
      }
      setFormError('');
      const newPaymentId = generatePaymentId();
      setPaymentId(newPaymentId);
      try {
        await fetch('http://localhost:8080/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: newPaymentId,
            name: form.name,
            email: form.email,
            amount: total,
            method: paymentMethod
          })
        });
      } catch (err) {
        // Optionally handle error
      }
      setDialogOpen(true);
    } else {
      const newPaymentId = generatePaymentId();
      setPaymentId(newPaymentId);
      try {
        await fetch('http://localhost:8080/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: newPaymentId,
            name: form.name,
            email: form.email,
            amount: total,
            method: paymentMethod
          })
        });
      } catch (err) {
        // Optionally handle error
      }
      setQrPaid(true);
    }
  };

  // ✅ Changed redirect path here:
  const handleDialogClose = () => {
    setDialogOpen(false);
    clearCart();
    setQrPaid(false);
    navigate('/home'); // ← Redirects to HomePage.js
  };

  const SuccessDialog = ({ open, onClose, isQrPayment }) => (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogContent sx={{ p: 4, textAlign: 'center' }}>
        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
          <CheckCircleOutlineIcon 
            sx={{ 
              fontSize: 80, 
              color: '#2E7D32',
              mb: 2,
              animation: 'bounce 1s ease infinite'
            }} 
          />
        </Zoom>
        <Fade in={true} style={{ transitionDelay: '200ms' }}>
          <Typography variant="h5" color="#2E7D32" fontWeight="bold" gutterBottom>
            Transaction Successful!
          </Typography>
        </Fade>
        <Fade in={true} style={{ transitionDelay: '300ms' }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            {isQrPayment 
              ? "Your payment has been received successfully. Thank you for your purchase!"
              : "Your order has been placed successfully. Please keep the cash ready for delivery."}
          </Typography>
        </Fade>
        <Fade in={true} style={{ transitionDelay: '400ms' }}>
          <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Items: {cart.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Amount: ₹{total}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Payment ID:</strong> {paymentId}
            </Typography>
          </Box>
        </Fade>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button 
          onClick={onClose} 
          color="success" 
          variant="contained" 
          fullWidth
          sx={{ 
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem'
          }}
        >
          Continue Shopping
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
      <NavBar />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} color="#225c2b" gutterBottom align="center">
          Payment
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" mb={4}>
          Review your cart and pay securely.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {cart.length === 0 ? (
            <ListItem><ListItemText primary="Your cart is empty." /></ListItem>
          ) : (
            cart.map((item, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={item.name} secondary={`${item.price} ${item.unit}`} />
              </ListItem>
            ))
          )}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" align="right" mb={2}>
          Total: <span style={{ color: '#2E7D32' }}>₹{total}</span>
        </Typography>
        {cart.length > 0 && (
          <>
            <RadioGroup row value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} sx={{ mb: 2 }}>
              <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
              <FormControlLabel value="qr" control={<Radio />} label="Razorpay QR Code" />
            </RadioGroup>
            {paymentMethod === 'cod' && (
              <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Name on Card" name="name" value={form.name} onChange={handleChange} required fullWidth />
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} required fullWidth type="email" />
                {formError && <Typography color="error">{formError}</Typography>}
                <Button variant="contained" color="success" fullWidth onClick={handlePay}>Pay Now</Button>
              </Box>
            )}
            {paymentMethod === 'qr' && !qrPaid && (
              <Box sx={{ textAlign: 'center', my: 3 }}>
                <Typography variant="subtitle1" mb={2}>Scan this QR code with any UPI app to pay</Typography>
                <img src={DUMMY_QR} alt="Razorpay QR" style={{ margin: '0 auto', width: 200, height: 200 }} />
                <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={handlePay}>I have paid</Button>
              </Box>
            )}
            {paymentMethod === 'qr' && qrPaid && (
              <SuccessDialog 
                open={true} 
                onClose={handleDialogClose} 
                isQrPayment={true}
              />
            )}
          </>
        )}
        {dialogOpen && (
          <SuccessDialog 
            open={dialogOpen} 
            onClose={handleDialogClose} 
            isQrPayment={false}
          />
        )}
      </Container>
    </Box>
  );
};

export default PaymentPage;
