"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "../actions/categoryActions";

export default function CategoriesCards() {
  const [categories, setCategories] = useState<
    { id: string; title: string; image: string }[]
  >([]);
  const [hoveringCard, setHoveringCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        const categoriesWithNonNullImage = fetchedCategories.map(
          (category) => ({
            ...category,
            image: category.image || "",
          })
        );
        setCategories(categoriesWithNonNullImage);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCardHover = (id: string) => {
    setHoveringCard(id);
  };

  return (
    <>
      <Divider>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Josefin sans",
            textAlign: "center",
            marginY: "15px",
            color: "#1F1724",
          }}
        >
          Select by category:
        </Typography>
      </Divider>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {categories.map((category, index) => (
          <Grid
            item
            key={index}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Link component={NextLink} href={`/category/${category.title}`}>
              <Card
                sx={{
                  borderRadius: "30px",
                  overflow: "hidden",
                  height: {xs: "100px", md: "400px"},
                  width: {
                    xs: "400px", 
                    md: hoveringCard === category.id ? "400px" : "250px" 
                  },
                  transition: " 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative",
                }}
                onMouseEnter={() => handleCardHover(category.id)}
                onMouseLeave={() => setHoveringCard(null)}
              >
                <CardMedia
                  component="img"
                  image={category.image}
                  sx={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                />
                <CardContent
                  sx={{
                    background: {xs: "transparent", md: hoveringCard === category.id ? "transparent" : "rgba(0, 0, 0, 0.4)"},
                    padding: "16px",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: {xs: "white", md: hoveringCard === category.id ? "white" : "transparent" } ,
                    transition: "color 0.45s, background 0.45s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{ fontFamily: "Josefin sans" }}
                    >
                      {category.title}
                    </Typography>
                  
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
