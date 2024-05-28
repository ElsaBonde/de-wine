import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrders, orderNumber } from "../actions/orderActions";
import { getProducts } from "../actions/productActions";
import { getUsers, userNumber } from "../actions/userActions";
import ShowOrders from "../admin/showOrders";
import ShowProducts from "../admin/showProducts";
import ShowUsers from "../admin/showUsers";

export default function AdminDashboard() {
  const [usersCount, setUsersCount] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [showOrders, setShowOrders] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (showProducts) {
      getProducts().then((data) => setProducts(data));
    } else if (showUsers) {
      getUsers().then((data) => setUsers(data));
    } else {
      getOrders().then((data) => setOrders(data));
    }
  }, [showProducts]);

  //david kan man göra detta på ett bättre sätt eller duger det?
  useEffect(() => {
    const fetchAndSetUserNumber = async () => {
      const userCount = await userNumber();
      setUsersCount(userCount);
    };

    fetchAndSetUserNumber();
  }, []);

  useEffect(() => {
    const fetchAndSetOrderNumber = async () => {
      const orderCount = await orderNumber();
      setOrdersCount(orderCount);
    };

    fetchAndSetOrderNumber();
  }, []);

  useEffect(() => {
    const fetchAndSetTotalProducts = async () => {
      const products = await getProducts();
      setProductsCount(products.length);
    };
    fetchAndSetTotalProducts();
  }, []);

  const handleShowUsers = () => {
    setShowUsers(true);
    setShowProducts(false);
    setShowOrders(false);
  };

  const handleShowProducts = () => {
    setShowProducts(true);
    setShowUsers(false);
    setShowOrders(false);
  };

  const handleShowOrders = () => {
    setShowOrders(true);
    setShowProducts(false);
    setShowUsers(false);
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ color: "#881c1c", fontFamily: "josefin sans", marginTop: "30px" }}
      >
        Dashboard
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          marginTop: "0px",
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              background: "white",
              borderRadius: "8px",

              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
              cursor: "pointer",
            }}
            onClick={handleShowUsers}
          >
            <PeopleIcon
              sx={{
                fontSize: "60px",
                background: "#F1DDCF",
                color: "white",
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
              >
                {usersCount}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
              >
                Users
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              background: "white",
              borderRadius: "8px",

              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
              cursor: "pointer",
            }}
            onClick={handleShowOrders}
          >
            <ShoppingCartIcon
              sx={{
                fontSize: "60px",
                background: "#F1DDCF",
                color: "white",
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
              >
                {ordersCount}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
              >
                Orders
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              background: "white",
              borderRadius: "8px",

              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
              cursor: "pointer",
            }}
            onClick={handleShowProducts}
          >
            <AttachMoneyIcon
              sx={{
                fontSize: "60px",
                background: "#F1DDCF",
                color: "white",
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
              >
                {productsCount}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
              >
                Products
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {showProducts ? (
        <ShowProducts products={products} />
      ) : showUsers ? (
        <ShowUsers users={users} />
      ) : showOrders ? (
        <ShowOrders orders={orders} />
      ) : null}
    </>
  );
}
