import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography, MenuItem } from "@mui/material";

const AssessmentModal = ({ open, onClose, onSave }) => {
  const [formValues, setFormValues] = useState({
    mark: "",
    comment: "",
    assessmentType: "",
    teacherId: "",
    courseId: "",
    studentId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // sprecava reload stranice
    onSave(formValues);
    setFormValues({
      mark: "",
      comment: "",
      assessmentType: "",
      teacherId: "",
      courseId: "",
      studentId: "",
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Typography variant="h6" component="h2">
          Add New Assessment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Mark"
            name="mark"
            value={formValues.mark}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Comment"
            name="comment"
            value={formValues.comment}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            select
            label="Assessment Type"
            name="assessmentType"
            value={formValues.assessmentType}
            onChange={handleChange}
            required
          >
            <MenuItem value="ORAL">Oral</MenuItem>
            <MenuItem value="TEST">Test</MenuItem>
            <MenuItem value="ESSAY">Essay</MenuItem>
            <MenuItem value="PARTICIPATION">Participation</MenuItem>
            <MenuItem value="HOMEWORK">Homework</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Teacher ID"
            name="teacherId"
            value={formValues.teacherId}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Course ID"
            name="courseId"
            value={formValues.courseId}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Student ID"
            name="studentId"
            value={formValues.studentId}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
            Add Assessment
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: 400,
  borderRadius: "10px",
};

export default AssessmentModal;
