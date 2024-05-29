import { getOrders, shipOrder } from "@/app/actions/orderActions";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import OrderRow from "../OrderRow";

const tableCellStyle = {
  color: "white",
  fontFamily: "josefin sans",
  fontSize: "1rem",
  fontWeight: "bold",
};

export default async function OrdersPage() {
  const orders = await getOrders();

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
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
