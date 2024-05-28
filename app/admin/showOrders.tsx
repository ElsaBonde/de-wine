import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Order } from "@prisma/client";
import Image from "next/image";

interface ShowOrdersProps {
  orders: Order[];
}
const tableCellStyle = {
    color: "#881c1c",
    fontFamily: "josefin sans",
    fontSize: "1rem",
    fontWeight: "bold",
  };

export default function ShowProducts({ orders }: ShowOrdersProps) {
  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "#f1ddcf",
              }}
            >
              <TableCell sx={tableCellStyle}>Order Number</TableCell>
              <TableCell sx={tableCellStyle}>Date</TableCell>
              <TableCell sx={tableCellStyle}>Total</TableCell>
              <TableCell sx={tableCellStyle}>Shipped</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.isShipped ? "Yes" : "No"}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

/*model Order {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  name      String
  userId    String
  street    String
  city      String
  phone     String
  zip       Int
  orderDate DateTime
  isShipped Boolean  @default(false)
  total     Float

  products ProductOrder[]
}
*/