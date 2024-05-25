"use client";

import { Box, Button, Divider } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import { getProducts } from "../actions/productActions";
import { getUsers } from "../actions/userActions";
import AdminDashboard from "../ui/AdminDashboard";
import ShowProducts from "./showProducts";
import ShowUsers from "./showUsers";

export default function AdminLayout({ children }: PropsWithChildren) {
  const [showProducts, setShowProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (showProducts) {
      getProducts().then((data) => setProducts(data));
    } else {
      getUsers().then((data) => setUsers(data));
    }
  }, [showProducts]);

  const handleShowProducts = () => {
    setShowProducts(true);
    
  };

  const handleShowUsers = () => {
    setShowProducts(false);
  };

  return (
      <Box
        component="main"
        sx={{ background: "#F9F1EC", padding: "10px 20px" }}
      >
        <Box
          sx={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#881c1c",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          <Button
            disableTouchRipple
            sx={{
              color: "#881c1c",
              fontSize: "16px",
              fontWeight: "bold",
              position: "relative",
              "&:hover": {
                background: "inherit",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                background: "#881c1c",
                bottom: 5,
                left: 8,
                transition: "width 0.6s ease-in-out",
              },
              "&:focus::after, &:active::after": {
                width: "85%",
              },
            }}
            onClick={handleShowProducts}
          >
            Products
          </Button>
          |
          <Button
            disableTouchRipple
            sx={{
              color: "#881c1c",
              fontSize: "16px",
              fontWeight: "bold",
              position: "relative",
              "&:hover": {
                background: "inherit",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                background: "#881c1c",
                bottom: 5,
                left: 8,
                transition: "width 0.6s ease-in-out",
              },
              "&:focus::after, &:active::after": {
                width: "75%",
              },
            }}
            onClick={handleShowUsers}
          >
            Users
          </Button>
        </Box>
        <Divider />
        <AdminDashboard users={users} />
        {children}
        {showProducts ? (
          <ShowProducts products={products} />
        ) : (
          <ShowUsers users={users} />
        )}
      </Box>
  );
}
