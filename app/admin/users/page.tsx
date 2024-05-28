import { deleteUser, updateUser } from "@/app/actions/userActions";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
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
import { User } from "next-auth";
import Image from "next/image";

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

  const handleAccess = async (user: User) => {
    const newAccessLevel = !user.isAdmin;
    await updateUser(user, newAccessLevel);
  };

  const capitalizeFullName = (fullName: string | undefined) => {
    if (typeof fullName !== "string") {
      return "";
    }
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
    <>
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "#f1ddcf",
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
              <TableRow key={user.id}>
                <TableCell>
                  <Image
                    src={user.image ? user.image : "/default-profile.png"}
                    alt={user.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{capitalizeFullName(user.name)}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <IconButton
                    onClick={() => handleAccess(user)}
                    sx={{ color: "#5A5353", "&:hover": { color: "#881c1c" } }}
                  >
                    <ModeEditOutlineOutlinedIcon />
                  </IconButton>
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
    </>
  );
}
