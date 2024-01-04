import React from 'react';
import { useCart } from './CartContext';
import { Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

const CartPage = () => {
  const { cart, clearCart } = useCart();
  return (<>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 50px",backgroundColor: "#cdcdcda8" }}>
        <Link to={'/'} style={{display:"flex", justifyContent:"center", alignItems:"center", textDecoration:"none", color:"gray"}}><HomeIcon style={{fontSize:"30px", color:"gray", marginRight:"1rem"}}/>Home</Link>
        <Button variant='contained' onClick={()=>{clearCart()}} color='error'>Clear Cart</Button>
      </div>
    <div style={{padding:"20px"}}>
      <List sx={style}>
      {Object.entries(cart).map(([product, quantity], index) => (
        <div key={index}>
          <ListItem>
          <ListItemText primary={product} />
          <ListItemText style={{display:"flex", justifyContent:"end"}} primary={quantity} />
        </ListItem>
        <Divider component="li" />
        </div>
      ))}
      </List>
    </div>
    </>);
};

export default CartPage;
