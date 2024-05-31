import { getProductById } from "@/app/actions/productActions";
import AddButton from "@/app/ui/AddButton";
import RandomProducts from "@/app/ui/RandomProducts";
import "@fontsource/josefin-sans";
import "@fontsource/karla";
import CheckIcon from "@mui/icons-material/Check";
import EastIcon from "@mui/icons-material/East";
import { Box, CardMedia, Divider, Link, Typography } from "@mui/material";
import NextLink from "next/link";

type PageProps = { params: { slug: string } };

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductById(params.slug);

  if (!product) {
    return (
      <main>
        <h1>Product does not exist...</h1>
      </main>
    );
  } else if (product.isArchived) {
    return (
      <main>
        <h1>Product has been discontinued... 😭</h1>
      </main>
    );
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          padding: "30px 20px",
          background: "white ",
          display: "flex",
          flexDirection: "column",
          marginX: { xs: "0px", md: "100px" },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "josefin sans",
              marginBottom: "10px",
              color: "#3d3d3dc3",
              fontSize: "18px",
            }}
          >
            <Link component={NextLink} href="/" sx={{color: "#3d3d3dc3", textDecoration: "none"}}>
              Home
            </Link>{" "}
            /{" "}
            {product.categories.map((category, index) => (
              <span key={category.id}>
                <Link component={NextLink} href={`/category/${category.title}`} sx={{color: "#3d3d3dc3", textDecoration: "none"}}>
                  {category.title}
                </Link>
                {index !== product.categories.length - 1 && " & "}
              </span>
            ))}{" "}
            / {product.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "20px",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "80%" }, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                objectFit: "cover",
                height: "100%",
                transition: "transform 0.8s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          </Box>

          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Box
              component="div"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box component="div">
                {" "}
                <Typography variant="h4" sx={{ fontFamily: "josefin sans" }}>
                  {product.title}
                </Typography>
                <Box sx={{ display: "flex", gap: "15px" }}>
                  <Typography
                    sx={{
                      fontFamily: "josefin sans",
                      color: "#1F1724",
                      marginBottom: "10px",
                      fontSize: "22px",
                    }}
                  >
                    {product.price.toString()}$
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <AddButton product={product} isProductPage={true} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#3d3d3dc3",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "josefin sans",
                    paddingLeft: "2px",
                    paddingTop: "5px",
                  }}
                >
                  Buy now, pay in 30 days.
                </Typography>
                <EastIcon sx={{ fontSize: "15px" }} />
              </Box>
            </Box>
            <Typography sx={{ marginTop: "15px", fontFamily: "josefin sans" }}>
              {product.description}
            </Typography>
            <Box>
            <Typography sx={{ fontFamily: "josefin sans", fontStyle: "italic", marginTop: "15px", color: "#3d3d3dc3",}}>
              Categories: {product.categories.map((category) => category.title).join(", ")}
              </Typography>
            <Divider sx={{ margin: "20px 0px" }} />
            </Box>
            <Box
              sx={{
                background: "#eee7e7c3",
                borderRadius: "8px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Box sx={{ display: "flex", gap: "5px" }}>
                <CheckIcon sx={{ color: "#1F1724", paddingRight: "5px" }} />
                <Typography sx={{ fontFamily: "josefin sans" }}>
                  Free shipping on orders over 100$
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "5px" }}>
                <CheckIcon sx={{ color: "#1F1724", paddingRight: "5px" }} />
                <Typography sx={{ fontFamily: "josefin sans" }}>
                  Free returns on unopened packages
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "5px" }}>
                <CheckIcon sx={{ color: "#1F1724", paddingRight: "5px" }} />
                <Typography sx={{ fontFamily: "josefin sans" }}>
                  Always delivery within 1-3 days
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "10px 20px", marginX: { xs: "0px", md: "100px" } }}>
        <Divider />
      </Box>
      <Box sx={{ marginX: { xs: "0px", md: "100px" } }}>
        <RandomProducts currentProductId={product.id as string} />
      </Box>
    </>
  );
}
