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

const Course = ({
  courseId,
  courseName,
  termId,
  weekUnits,
  gradeId,
  onDelete,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);
  const [editCourseData, setEditCourseData] = useState({
    courseId,
    courseName,
    termId,
    weekUnits,
    gradeId,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCourseData({ ...editCourseData, [name]: value });
  };

  const editCourse = async () => {
    let res = await fetch(
      `http://localhost:8080/api/courses/update/${courseId}`,
      {
        method: "PUT", // za update je PUT! PUT! PUT! PUT!
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCourseData),
      }
    );

    if (res.ok) {
      let updatedCourse = await res.json();
      toast.success("Course updated successfully");
      onEdit(updatedCourse);
      handleClose();
    } else {
      let err = await res.json();
      const errorMessage = err.error || "Unknown error";
      const status = err.status || "Unknown status";
      toast.error(
        `Failed to update course: ${errorMessage} (Status: ${status})`
      );
    }
  };

  const deleteCourse = async () => {
    let res = await fetch(
      `http://localhost:8080/api/courses/delete/${courseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      let d = await res.json();
      toast.success("Course deleted successfully");
      onDelete(courseId);
    } else {
      let err = await res.json();
      const errorMessage = err.error || "Unknown error";
      const status = err.status || "Unknown status";
      toast.error(
        `Failed to delete course: ${errorMessage} (Status: ${status})`
      );
    }
  };

  return (
    <>
      <Card className="course">
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
            <Typography variant="h5">{courseName}</Typography>
            <Typography variant="subtitle1">Week Units: {weekUnits}</Typography>
          </Stack>
          <Stack>
            <Typography variant="body1">Grade: {gradeId}</Typography>
            <Typography variant="body1">Term: {termId}</Typography>
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
            >
              Edit
            </Button>
            <Button
              onClick={deleteCourse}
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Course
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Course Name"
              name="courseName"
              value={editCourseData.courseName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Week Units"
              name="weekUnits"
              value={editCourseData.weekUnits}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Grade"
              name="gradeId"
              value={editCourseData.gradeId}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Term"
              name="termId"
              value={editCourseData.termId}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              onClick={editCourse}
              variant="contained"
              color="primary"
              fullWidth
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Course;
