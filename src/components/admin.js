import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
import { useSlot } from "../context/SlotContext";

const Admin = () => {
  const { setSlotNumber } = useSlot();
  const [inputNumber, setInputNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInputNumber(value);
    setMessage("");
  };

  const handleSubmit = () => {
    const number = parseInt(inputNumber, 10);
    if (isNaN(number) || number < 1 || number > 30) {
      setMessage("Please enter a number between 1 and 30");
      return;
    }
    setSlotNumber(number); // This updates localStorage and state
    setMessage("Number set successfully!");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="96vh" bgcolor="#f4f6f8">
      <Paper sx={{ padding: 4, borderRadius: 3, width: 400, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>Enter Player ID</Typography>
        <TextField
          label="Player ID"
          variant="outlined"
          fullWidth
          type="text"
          value={inputNumber}
          onChange={handleInputChange}
          inputProps={{ min: 1, max: 30 }}
          error={!!message && !message.includes("successfully")}
          helperText={message || "Enter a number between 1 and 30"}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
        {message.includes("successfully") && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      </Paper>
    </Box>
  );
};

export default Admin;