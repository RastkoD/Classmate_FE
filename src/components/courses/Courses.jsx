import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Course from "./Course";
import SearchBar from "../utils/SearchBar";
import AddCourseModal from "./AddCourseModal";
import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "../../styles/courses.css";
import { motion } from "framer-motion";

const Courses = () => {
  const courses = useLoaderData();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (value) => {
    setFilteredCourses(
      value
        ? courses.filter((course) =>
            course.courseName.toLowerCase().includes(value.toLowerCase())
          )
        : courses
    );
  };

  const handleDelete = (courseId) => {
    const fc = filteredCourses.filter((c) => c.courseId !== courseId);
    setFilteredCourses(fc);
  };

  const handleEdit = (updatedCourse) => {
    const updatedCourses = filteredCourses.map((course) =>
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    );
    setFilteredCourses(updatedCourses);
  };

  const handleAddCourse = (newCourse) => {
    fetch("http://localhost:8080/api/courses/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw err;
          });
        }
        return response.json();
      })
      .then((data) => {
        setFilteredCourses([...filteredCourses, data]);
        toast.success("Course created successfully");
      })
      .catch((err) => {
        const errorMessage = err.message || "Unknown error";
        toast.error(`Failed to create course: ${errorMessage}`);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="main">
        <Typography sx={{ padding: "1rem 0" }} variant="h2">
          Courses
        </Typography>
        <Button
          sx={{ width: "17.1em", padding: "14px 10px" }}
          aria-label="add new course"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Course
        </Button>
        <SearchBar onSearch={handleSearch} />
        <div className="courses">
          {filteredCourses.map((course) => (
            <Course
              key={course.courseId}
              {...course}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
        <AddCourseModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleAddCourse={handleAddCourse}
        />
      </div>
    </motion.div>
  );
};

export default Courses;
