import DeleteIcon from "@mui/icons-material/Delete";
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
import { User, deleteUser } from "../actions/userActions";

interface ShowUsersProps {
  users: User[];
}

export default function ShowUsers({ users }: ShowUsersProps) {
  if (!users) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
  };

  // Funktion för att göra om första bokstaven i varje ord på namnet till stor bokstav
  const capitalizeFullName = (fullName: string) => {
    return fullName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const tableCellStyle = {
    color: "#881c1c",
    fontFamily: "josefin sans",
    fontSize: "1rem",
    fontWeight: "bold",
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "#f1ddcf",
            }}
          >
            <TableCell sx={tableCellStyle}>Full Name</TableCell>
            <TableCell sx={tableCellStyle}>Email</TableCell>
            <TableCell sx={tableCellStyle}>Phone</TableCell>
            <TableCell sx={tableCellStyle}>Access</TableCell>
            <TableCell sx={tableCellStyle}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{capitalizeFullName(user.fullName)}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDelete(user.id)}
                  sx={{ color: "#5A5353", "&:hover": { color: "#881c1c" } }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
