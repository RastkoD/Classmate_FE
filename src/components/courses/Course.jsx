import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
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
}) => {
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
            <Typography variant="p">Grade: {gradeId}</Typography>
            <Typography variant="p">Term: {termId}</Typography>
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
    </>
  );
};

export default Course;
