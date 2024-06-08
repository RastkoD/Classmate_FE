import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

const AddStudentModal = ({ open, handleClose, handleAddStudent }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [errors, setErrors] = useState({});

  const clearTextFields = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setJmbg("");
  };

  const handleValidation = () => {
    const newErrors = {};

    if (isNaN(jmbg) || jmbg.length !== 8)
      newErrors.jmbg = "Personal ID number must be exactly 8 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const newStudent = {
        firstName,
        lastName,
        password,
        jmbg,
      };
      handleAddStudent(newStudent);
      handleClose();
      clearTextFields();
    } else {
      toast.error("Please correct the errors in the form");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" component="h2">
          Add New Student
        </Typography>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="JMBG"
          fullWidth
          value={jmbg}
          onChange={(e) => setJmbg(e.target.value)}
          margin="normal"
          error={!!errors.jmbg}
          helperText={errors.jmbg}
        />

        <Button
          variant="contained"
          color="primary"
          onMouseDown={handleSubmit}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Student
        </Button>
      </Box>
    </Modal>
  );
};

export default AddStudentModal;
