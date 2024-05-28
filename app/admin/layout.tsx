"use client";

import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import AdminDashboard from "../ui/AdminDashboard";

export default function AdminLayout({ children }: PropsWithChildren) {
  /*   const [showProducts, setShowProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (showProducts) {
      getProducts().then((data) => setProducts(data));
    } else {
      getUsers().then((data) => setUsers(data));
    }
  }, [showProducts]);
 */

  return (
    <Box component="main" sx={{ background: "#F9F1EC", padding: "10px 20px" }}>
      <AdminDashboard />
      {children}
      {/*   {showProducts ? (
          <ShowProducts products={products} />
        ) : (
          <ShowUsers users={users} />
        )} */}
    </Box>
  );
}
