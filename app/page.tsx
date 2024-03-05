import { mockedProducts } from "@/data";
import { AddShoppingCart, KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

export default function StartPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {mockedProducts.map((product) => (
        <Card key={product.id} data-cy="product">
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.title}
          />
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  data-cy="product-title"
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  data-cy="product-price"
                >
                  {product.price} :-
                </Typography>
              </div>
              <div>
                <Button color="primary">
                  <AddShoppingCart />
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                data-cy="product-description"
              >
                {product.description}
              </Typography>
              <CardActions>
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Button size="small">
                    <KeyboardDoubleArrowRight />
                  </Button>
                </Link>
              </CardActions>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}

// Glöm inte, förstora bilden på "infosidan", vi påbörjade snackbar... vi påbörjade local storage...
