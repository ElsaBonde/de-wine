import { Box, Card, CardActions, Typography } from "@mui/material";

export default function CartPage() {
  return (
    <main>
      <Typography variant="h2">
        Hej, detta är en kundvagnsjävel men just nu går det inte att se dina
        varor!
      </Typography>
      <Box>
        {cartItem.map(item)}
        <Card data-cy="cart-item">
          <img src="{item.image}" alt="{item.title}" />
          <Typography>{item.title}</Typography>
          <Typography>{item.price}/pc</Typography>
          <CardActions>
            {/* kolla om det finns + och - iconer att använda som knappar? */}
            <Typography data-cy="decrease-quantity-button">-</Typography> 
            <Typography data-cy="quantity">{item.quantity}</Typography>
            <Typography data-cy="increase-quantity-button">+</Typography>
          </CardActions>
        </Card>
      </Box>
      <Box>
        <Typography data-cy="total-price">Total price: {}</Typography>
        <Button>Go to checkout</Button> 
      </Box>
    </main>
  );
}
