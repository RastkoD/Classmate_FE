import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const Student = ({
  studentId,
  username,
  firstName,
  lastName,
  password,
  jmbg,
  onDelete,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);
  const [editStudentData, setEditStudentData] = useState({
    studentId,
    username,
    firstName,
    lastName,
    password,
    jmbg,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditStudentData({ ...editStudentData, [name]: value });
  };

  const editStudent = async () => {
    let res = await fetch(
      `http://localhost:8080/api/students/update/${studentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editStudentData),
      }
    );

    if (res.ok) {
      let updatedStudent = await res.json();
      toast.success("Student's info updated successfully");
      onEdit(updatedStudent);
      handleClose();
    } else {
      let err = await res.json();
      const errorMessage = err.error || "Unknown error";
      const status = err.status || "Unknown status";
      toast.error(
        `Failed to update student's info: ${errorMessage} (Status: ${status})`
      );
    }
  };

  const deleteStudent = async () => {
    let res = await fetch(
      `http://localhost:8080/api/students/delete/${studentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      let d = await res.json();
      toast.success("Student deleted successfully");
      onDelete(studentId);
    } else {
      let err = await res.json();
      const errorMessage = err.error || "Unknown error";
      const status = err.status || "Unknown status";
      toast.error(
        `Failed to delete student: ${errorMessage} (Status: ${status})`
      );
    }
  };

  return (
    <>
      <Card className="student">
        <CardContent
          sx={{
            padding: "1rem",
            height: "85%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <Typography variant="h5">{`${firstName} ${lastName}`}</Typography>
            <Typography variant="subtitle1">Username: {username}</Typography>
          </Stack>
          <Stack>
            <Typography variant="body1">Password: {password}</Typography>
            <Typography variant="body1">SSN: {jmbg}</Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              onClick={handleOpen}
              aria-label="edit"
              variant="outlined"
              startIcon={<EditIcon />}
              color="info"
            >
              Edit
            </Button>
            <Button
              onClick={deleteStudent}
              aria-label="delete"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Stack>
        </CardActions>
      </Card>

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
            Edit Student
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={editStudentData.firstName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editStudentData.lastName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              value={editStudentData.password}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="JMBG"
              name="jmbg"
              value={editStudentData.jmbg}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              onClick={editStudent}
              variant="contained"
              color="primary"
              fullWidth
            >
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Student;
