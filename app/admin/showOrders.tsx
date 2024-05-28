import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Order } from "@prisma/client";
import { shipOrder } from "../actions/orderActions";

interface ShowOrdersProps {
  orders: Order[];
}
const tableCellStyle = {
  color: "white",
  fontFamily: "josefin sans",
  fontSize: "1rem",
  fontWeight: "bold",
};

export default function ShowProducts({ orders }: ShowOrdersProps) {
  const handleShipped = async (orderId: string) => {
    await shipOrder(orderId);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "#4E3D53 ",
              }}
            >
              <TableCell sx={tableCellStyle}>Order Number</TableCell>
              <TableCell sx={tableCellStyle}>Date</TableCell>
              <TableCell sx={tableCellStyle}>Total</TableCell>
              <TableCell sx={tableCellStyle}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  {order.isShipped ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ minWidth: "65px" }}>Shipped</Typography>
                      <Checkbox
                        defaultChecked
                        onClick={() => handleShipped(order.id)}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ minWidth: "65px" }}>
                        Progress
                      </Typography>
                      <Checkbox onClick={() => handleShipped(order.id)} />
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
