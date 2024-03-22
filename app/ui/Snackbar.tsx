"use client";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

interface SnackbarContextValue {
  showSnack: (message: string) => void;
}

const SnackbarContext = createContext({} as SnackbarContextValue);

export default function SnackbarProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  //stänger snackbaren
  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const showSnack = (message: string) => {
    setMessage(message);
    setOpenSnackBar(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnack }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        data-cy="added-to-cart-toast"
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => useContext(SnackbarContext);
