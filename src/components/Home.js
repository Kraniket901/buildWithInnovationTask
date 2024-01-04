import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Badge, ButtonGroup, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState("");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  const { addToCart, removeFromCart, totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      const data = await fetch('https://dummyjson.com/products');
      const data2 = await data.json();
      if (data2) setData(data2.products);
    }
    getAllProducts();
  }, []);

  const handleClick = async () => {
    const data = await fetch(`https://dummyjson.com/products/search?q=${searchedData}`);
    const data2 = await data.json();
    if (data2) setFilteredData(data2.products);
  }
  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  useEffect(() => {
    setFilteredData(data);
    const filteredData2 = data.filter(item => (
      (!priceFilter.min || item.price >= parseInt(priceFilter.min, 10)) &&
      (!priceFilter.max || item.price <= parseInt(priceFilter.max, 10))
    ));
    setFilteredData(filteredData2);
  }, [priceFilter, data]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 50px",backgroundColor: "#cdcdcda8", flexWrap:"wrap" }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', m: '10px 0', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Your Product"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e) => setSearchedData(e.target.value)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon onClick={handleClick} />
          </IconButton>
        </Paper>
        <FormControl sx={{ m: 1, width: "400px" }}>
          <InputLabel id="demo-simple-select-filled-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={`${priceFilter.min}-${priceFilter.max}`}
            label="Filter"
            onChange={(e) => {
              const [min, max] = e.target.value.split('-');
              setPriceFilter({ min, max });
            }}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"1-100"}>1 Rs - 100 Rs</MenuItem>
            <MenuItem value={"100-500"}>100 Rs - 500 Rs</MenuItem>
            <MenuItem value={"500-1000"}>500 Rs - 1000 Rs</MenuItem>
            <MenuItem value={"1000-10000"}>1000 Rs - 10,000 Rs</MenuItem>
          </Select>
        </FormControl>
        <Link to="/cart" style={{color:"gray", textDecoration:"none"}}>Cart<IconButton aria-label="cart">
          <StyledBadge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon style={{ fontSize: "30px" }} />
          </StyledBadge>
        </IconButton></Link>
        <Button variant='contained' onClick={handleLogout} color='error'>Logout</Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {
          filteredData.map((item, index) => {
            return (
              <Card sx={{ width: 345, backgroundColor: "#cdcdcda8", m: '20px 10px' }} key={index}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={item.thumbnail}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <ButtonGroup variant="text" aria-label="outlined button group">
                    <Button size='small'>{item.brand}</Button>
                    <Button size='small'>{item.category}</Button>
                  </ButtonGroup>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Rating name="read-only" value={item.rating} readOnly />
                </CardContent>
                <CardActions>
                  <Button variant='contained' color='success' onClick={() => addToCart(item.title)} size='small'>Add To Cart</Button>
                  <Button variant='contained' color='error' onClick={() => removeFromCart(item.title)} size='small'>Add To Cart</Button>
                </CardActions>
              </Card>
            )
          })
        }
      </div>
    </div >
  )
}

export default Home;