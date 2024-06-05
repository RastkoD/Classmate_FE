import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

const EditAssessmentModal = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      toast.error("An error occurred while updating the assessment");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          Edit Assessment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Mark"
            name="mark"
            value={formData.mark}
            onChange={handleChange}
            type="number"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            select
            label="Assessment Type"
            name="assessmentType"
            value={formData.assessmentType}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditAssessmentModal;
