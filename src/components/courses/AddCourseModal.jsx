import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

const AddCourseModal = ({ open, handleClose, handleAddCourse }) => {
  const [courseName, setCourseName] = useState("");
  const [weekUnits, setWeekUnits] = useState("");
  const [termId, setTermId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [errors, setErrors] = useState({});

  const clearTextFields = () => {
    setCourseName("");
    setWeekUnits("");
    setTermId("");
    setGradeId("");
  }

  const handleValidation = () => {
    const newErrors = {};
  
    if (!courseName) newErrors.courseName = "Course name is required";
    
    if (isNaN(weekUnits) || weekUnits < 0 || weekUnits > 40)
      newErrors.weekUnits = "Weekly units must be a number between 0 and 40";
    
    if (isNaN(termId) || termId < 1 || termId > 2)
      newErrors.termId = "Term ID must be a number between 1 and 2";
    
    if (isNaN(gradeId) || gradeId < 1 || gradeId > 8)
      newErrors.gradeId = "Grade ID must be a number between 1 and 8";
    
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
      clearTextFields();

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
        p: 4, 
        borderRadius: "10px"
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
          label="Hours per Week"
          fullWidth
          type="number"
          value={weekUnits}
          onChange={(e) => setWeekUnits(e.target.value)}
          margin="normal"
          error={!!errors.weekUnits}
          helperText={errors.weekUnits}
        />
        <TextField
          label="Grade"
          fullWidth
          type="number"
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
          margin="normal"
          error={!!errors.gradeId}
          helperText={errors.gradeId}
        />
        <TextField
          label="Term"
          fullWidth
          type="number"
          value={termId}
          onChange={(e) => setTermId(e.target.value)}
          margin="normal"
          error={!!errors.termId}
          helperText={errors.termId}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }} fullWidth>
          Add Course
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCourseModal;
