import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { userNumber } from "../actions/userActions";

export default function AdminDashboard() {
  const [usersCount, setUsersCount] = useState<number>(0);

  useEffect(() => {
    const fetchAndSetUserNumber = async () => {
      const count = await userNumber();
      setUsersCount(count);
    };

    fetchAndSetUserNumber();
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
          marginTop: "30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ background: "white", borderRadius: "8px" }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            <>
              <PeopleIcon
                sx={{
                  fontSize: "60px",
                  background: "#F1DDCF",
                  color: "white",
                  borderRadius: "50%",
                }}
              />
            </>
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
          sx={{ background: "white", borderRadius: "8px" }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            <>
              <ShoppingCartIcon
                sx={{
                  fontSize: "60px",
                  background: "#F1DDCF",
                  color: "white",
                  borderRadius: "50%",
                }}
              />
            </>
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
              >
                produkter
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
          sx={{ background: "white", borderRadius: "8px" }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            <>
              <AttachMoneyIcon
                sx={{
                  fontSize: "60px",
                  background: "#F1DDCF",
                  color: "white",
                  borderRadius: "50%",
                }}
              />
            </>
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "#881c1c", fontFamily: "josefin sans" }}
              >
                8733279523907
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
