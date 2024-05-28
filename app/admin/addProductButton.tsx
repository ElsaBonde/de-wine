import {
    Box,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    Link,
  } from "@mui/material";
  import Image from "next/image";
  
  export default function AddProductCard() {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Link
          href="/admin/product/new"
          color="text.secondary"
          sx={{ textDecoration: "none" }}
        >
          <CardActionArea sx={{ background: "white", borderRadius: "8px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/AddImage.png"
                alt="addImage"
                width={100}
                height={100}
                style={{ width: "75%", height: "auto", marginTop: "15px" }}
              />
            </Box>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontFamily: "josefin sans", color: "black" }}
              >
                Click to add new product
              </Typography>
              <Box sx={{ filter: "blur(2px)" }}>
                <Typography sx={{ color: "black" }}>ID</Typography>
  
                <Typography
                  sx={{
                    fontFamily: "josefin sans",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  123 :-
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "josefin sans" }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis,
                  in a mollitia vel nulla sequi quam expedita? Incidunt possimus
                  exercitationem nisi ab expedita veritatis harum iste, minus
                  unde. Voluptatibus. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Assumenda mollitia.
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Link>
      </Grid>
    );
  }
  