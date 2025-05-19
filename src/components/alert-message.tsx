"use client";

import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface AlertMessageProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

export function AlertMessage({
  open,
  message,
  severity,
  onClose,
}: AlertMessageProps): React.JSX.Element {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ mt: { xs: 8, md: 6 } }}
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
