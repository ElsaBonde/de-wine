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
    <Box sx={{width: {xs: "100%", md: "30%"}}}>
      <Link
        href="/admin/products/new"
        color="text.secondary"
        sx={{ textDecoration: "none" }}
      >
        <CardActionArea
          sx={{
            background: "#1F1724",
            borderRadius: "8px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "3px",
              background:
                "linear-gradient(to right, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
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
            background:
              "linear-gradient(to right, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
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
              background:
                "linear-gradient(to bottom, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "3px",
              height: "100%",
              background:
                "linear-gradient(to top, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
              zIndex: 1,
            }}
          />
          <CardContent>
            <Typography
              variant="h5"
              sx={{ color: "white", fontFamily: "josefin sans" }}
            >
              Add New Product
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Box>
  );
}
