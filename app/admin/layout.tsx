import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import AdminDashboard from "../ui/AdminDashboard";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <Box component="main" sx={{ background: "white ", padding: "10px 20px", marginX: {xs: "0px", md: "100px"}, }}>
      <AdminDashboard />
      {children}
    </Box>
  );
}
