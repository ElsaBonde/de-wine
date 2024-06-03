"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { User } from "@prisma/client";
import Image from "next/image";
import { deleteUser, updateUser } from "../actions/userActions";

interface Props {
  user: User;
}


export default function UserRow({ user }: Props) {
  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
  };

  const handleAccess = async (user: User) => {
    const name = user.name || "John Doe";
    const newAccessLevel = !user.isAdmin;

    const updatedUser = {
      ...user,
      name,
      userName: user.userName || "John Doe", 
      image: user.image || "cute bild", 
    };

    await updateUser(updatedUser, newAccessLevel);
  };

  const capitalizeFullName = (fullName: string) => {
    if (typeof fullName !== "string") {
      return "";
    }
    return fullName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <TableRow key={user.id}>
      <TableCell>
        <Image
          src={user.image ? user.image : "/default-profile.png"}
          alt={user.name ? user.name : "John Doe"}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
      </TableCell>
      <TableCell sx={{fontFamily: "Karla", fontSize: "16px"}}>
        {capitalizeFullName(user.name ? user.name : "John Doe")}
      </TableCell>
      <TableCell sx={{fontFamily: "Karla", fontSize: "16px"}}>{user.email}</TableCell>
      <TableCell sx={{fontFamily: "Karla", fontSize: "16px"}}>{user.isAdmin ? "Admin" : "User"}</TableCell>
      <TableCell sx={{ textAlign: "right", fontFamily: "Karla", fontSize: "16px" }}>
        <IconButton
          onClick={() => handleAccess(user)}
          sx={{ color: "text.secondary", "&:hover": { color: "#1F1724" } }}
        >
          <ModeEditOutlineOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(user.id)}
          sx={{ color: "text.secondary", "&:hover": { color: "#1F1724" } }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
