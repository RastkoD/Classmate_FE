import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const EditCourseModal = ({
  open,
  handleClose,
  courseId,
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/courses/update/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        toast.success("Course updated successfully");
        onSave(courseId, formData);
        handleClose();
      } else {
        const err = await res.json();
        const errorMessage = err.message || "Unknown error";
        toast.error(`Failed to update course: ${errorMessage}`);
      }
    } catch (error) {
      toast.error(`Network error: ${error.message}`);
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
          borderRadius: "10px"
        }}
      >
        <Typography variant="h6" component="h2">
          Edit Course
        </Typography>
        <Stack spacing={2} mt={2}>
          <TextField
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Week Units"
            name="weekUnits"
            value={formData.weekUnits}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Term ID"
            name="termId"
            value={formData.termId}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Grade ID"
            name="gradeId"
            value={formData.gradeId}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditCourseModal;
