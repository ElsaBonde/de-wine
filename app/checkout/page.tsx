import { Box, Button, Card, CardActions, Typography } from "@mui/material";
import { Product, CartItem } from "@/data";
/* import { decrementCount } from './AddContext';  */

export default function CartPage() {
  /* const loadCartItemsFromLocalStorage = () => {
    const savedCartItems = localStorage.getItem("cart-items");
    if (savedCartItems) {
      return JSON.parse(savedCartItems);
    }
    return []; */
/*   }; */

  /* const cartItems = loadCartItemsFromLocalStorage(); 
  const handleIncrement = () => {
    incrementCount(); */
  return (
    <main>
      <Typography variant="h2">
        Hej, detta är en kundvagnsjävel men just nu går det inte att se dina
        varor!
      </Typography>
      <Box>
        {cartItems.map((item: CartItem, index: number) => (
          <Card key={index} data-cy="cart-item">
            <img src={item.image} alt={item.title} />
            <Typography>{item.title}</Typography>
            <Typography>
              ({item.price} * {item.quantity})
            </Typography>
            <CardActions>
              {/* Add your buttons here <Button onClick={handleIncrement}>Increase</Button>*/}
              <Typography data-cy="quantity">{item.quantity}</Typography>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Box>
        <Typography data-cy="total-price">Total price: {}</Typography>
        <Button>Go to checkout</Button>
      </Box>
    </main>
  );
}
