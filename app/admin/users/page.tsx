import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UserRow from "../UserRow";
import { getUsers } from "@/app/actions/userActions";

export default async function UsersPage() {
  const users = await getUsers();
  if (!users) {
    return <div>Loading...</div>;
  }

  const tableCellStyle = {
    color: "white",
    fontFamily: "josefin sans",
    fontSize: "1rem",
    fontWeight: "bold",
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
              <TableCell sx={tableCellStyle}>Profile Picture</TableCell>
              <TableCell sx={tableCellStyle}>Full Name</TableCell>
              <TableCell sx={tableCellStyle}>Email</TableCell>
              <TableCell sx={tableCellStyle}>Access</TableCell>
              <TableCell sx={tableCellStyle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
