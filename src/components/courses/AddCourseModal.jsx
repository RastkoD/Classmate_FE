import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

const AddCourseModal = ({ open, handleClose, handleAddCourse }) => {
  const [courseName, setCourseName] = useState("");
  const [weekUnits, setWeekUnits] = useState("");
  const [termId, setTermId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const newErrors = {};
    if (!courseName) newErrors.courseName = "Course name is required";
    if (weekUnits < 0 || weekUnits > 40)
      newErrors.weekUnits = "Weekly units must be between 0 and 40";
    if (termId < 1 || termId > 2)
      newErrors.termId = "Term ID must be 1 or 2";
    if (gradeId < 1 || gradeId > 8)
      newErrors.gradeId = "Grade ID must be between 1 and 8";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const newCourse = {
        courseName,
        weekUnits: parseInt(weekUnits),
        termId: parseInt(termId),
        gradeId: parseInt(gradeId),
      };
      handleAddCourse(newCourse);
      handleClose();
    } else {
      toast.error("Please correct the errors in the form");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4 
      }}>
        <Typography variant="h6" component="h2">Add New Course</Typography>
        <TextField
          label="Course Name"
          fullWidth
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          margin="normal"
          error={!!errors.courseName}
          helperText={errors.courseName}
        />
        <TextField
          label="Weekly Units"
          fullWidth
          type="number"
          value={weekUnits}
          onChange={(e) => setWeekUnits(e.target.value)}
          margin="normal"
          error={!!errors.weekUnits}
          helperText={errors.weekUnits}
        />
        <TextField
          label="Term ID"
          fullWidth
          type="number"
          value={termId}
          onChange={(e) => setTermId(e.target.value)}
          margin="normal"
          error={!!errors.termId}
          helperText={errors.termId}
        />
        <TextField
          label="Grade ID"
          fullWidth
          type="number"
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
          margin="normal"
          error={!!errors.gradeId}
          helperText={errors.gradeId}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Add Course
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCourseModal;
