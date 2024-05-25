import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  orderNumber,
  totalAmountAllOrders,
} from "../actions/orderActions";
import { userNumber } from "../actions/userActions";

export default function AdminDashboard() {
  const [usersCount, setUsersCount] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);


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
    const fetchAndSetTotalAmount = async () => {
      const total = await totalAmountAllOrders();

      if (total !== null) {
        setTotalAmount(Math.round(Number(total) * 100) / 100);
      } else {
        setTotalAmount(0);
      }
    };

    fetchAndSetTotalAmount();
  }, []);

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
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
         
        >
          <Box
            sx={{
              background: "white",
              borderRadius: "8px",
             
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
            }}
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
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
        
        >
          <Box
            sx={{
              background: "white",
              borderRadius: "8px",
              
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
            }}
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
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
         
        >
          <Box
            sx={{
              background: "white",
              borderRadius: "8px",
            
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
            }}
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
              {totalAmount}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
            >
              Amount earned
            </Typography>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </>
  );
}