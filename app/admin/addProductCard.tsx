import {
  CardActionArea,
  CardContent,
  Grid,
  Link,
  Typography,
  Box
} from "@mui/material";

export default function AddProductCard() {
  return (

      <Grid item>
        <Link
          href="/admin/products/new"
          color="text.secondary"
          sx={{ textDecoration: "none" }}
        >
          <CardActionArea
            sx={{
              background: "#1F1724",             
              alignItems: "center",
              position: "relative",
            }}
          >
            
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "3px",
                height: "100%",
                background: "linear-gradient(to bottom, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "3px",
                background: "linear-gradient(to right, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "3px",
                background: "linear-gradient(to right, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "3px",
                height: "100%",
                background: "linear-gradient(to bottom, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
                zIndex: 1,
              }}
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{ color: "white", fontFamily: "josefin sans" }}
              >
                New Product
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Grid>

  );
}
