import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Stack,
} from "@mui/material";
import { useSlot } from "../context/SlotContext";

const Admin = () => {
  const { eliminatePlayer, revivePlayer, isPlayerEliminated } = useSlot();
  const [inputNumber, setInputNumber] = useState("");
  const [message, setMessage] = useState("");
  const [actionType, setActionType] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInputNumber(value);
    setMessage("");
  };

  const validateInput = () => {
    const number = parseInt(inputNumber, 10);
    if (isNaN(number) || number < 1 || number > 29) {
      setMessage("Please enter a number between 1 and 29");
      return false;
    }
    return number;
  };

  const handleEliminate = () => {
    const number = validateInput();
    if (!number) return;

    if (isPlayerEliminated(number)) {
      setMessage(`Player ${number} is already eliminated!`);
      return;
    }

    eliminatePlayer(number);
    setActionType("eliminated");
    setMessage(`Player ${number} eliminated successfully!`);
  };

  const handleRevive = () => {
    const number = validateInput();
    if (!number) return;

    if (!isPlayerEliminated(number)) {
      setMessage(`Player ${number} is not eliminated!`);
      return;
    }

    revivePlayer(number);
    setActionType("revived");
    setMessage(`Player ${number} revived successfully!`);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="96vh"
      bgcolor="#f4f6f8"
    >
      <Paper
        sx={{ padding: 4, borderRadius: 3, width: 400, textAlign: "center" }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
          Player Controls
        </Typography>
        <TextField
          label="Player ID"
          variant="outlined"
          fullWidth
          type="text"
          value={inputNumber}
          onChange={handleInputChange}
          inputProps={{ min: 1, max: 29 }}
          error={!!message && !message.includes("successfully")}
          helperText={
            message && !message.includes("successfully")
              ? message
              : "Enter a number between 1 and 29"
          }
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={2} mb={2}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleEliminate}
          >
            Eliminate
          </Button>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleRevive}
          >
            Revive
          </Button>
        </Stack>
        {message && message.includes("successfully") && (
          <Alert
            severity={actionType === "eliminated" ? "error" : "success"}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default Admin;
