import { mockedProducts } from "@/data";
import { AddShoppingCart, KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function StartPage() {
  return (
    <main>
      <Card sx={{ maxWidth: 345, margin: "10px" }}>
        <CardActionArea>
          {mockedProducts.map((product) => (
            <div key={product.id}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography>{product.price}</Typography>
                <AddShoppingCart />
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <KeyboardDoubleArrowRight />
              </CardContent>
            </div>
          ))}
          ;
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </main>
  );
}
