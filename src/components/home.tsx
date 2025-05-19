"use client";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store";
import { userActions } from "@/redux-store/user.slice";
import { AlertMessage } from "@/components/alert-message";
import { useState, useEffect } from "react";

export default function HomePage() {
  const dispatch = useDispatch();
  const { users, loading, message, error } = useSelector(
    (state: RootState) => state.user
  );
  const history = useSelector((state: RootState) => state.history);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (message) {
      setAlertMessage(message);
      setAlertSeverity("success");
      setAlertOpen(true);
      dispatch(userActions.clearMessage());
    } else if (error) {
      setAlertMessage(error);
      setAlertSeverity("error");
      setAlertOpen(true);
      dispatch(userActions.clearMessage());
    }
  }, [message, error, dispatch]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        👥 Danh sách người dùng
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(userActions.fetchUsers());
        }}
      >
        {loading ? "Đang tải..." : "Tải người dùng (takeLatest)"}
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          dispatch(userActions.addUser({ id: Date.now(), name: "C" }))
        }
        sx={{ mx: 2 }}
      >
        ➕ Thêm C (takeLeading)
      </Button>

      <List>
        {users.map((u) => (
          <ListItem key={u.id}>👤 {u.name}</ListItem>
        ))}
      </List>

      <Typography variant="h6" mt={4}>
        🕓 Lịch sử thao tác (takeEvery)
      </Typography>
      <List dense>
        {history.map((h, i) => (
          <ListItem key={i}>
            {new Date(h.timestamp).toLocaleTimeString()} - {h.action}
          </ListItem>
        ))}
      </List>

      <AlertMessage
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={() => {
          setAlertOpen(false);
        }}
      />
    </Box>
  );
}
