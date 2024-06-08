import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Student from "./components/Student";
import SearchBar from "../../components/utils/SearchBar";
import AddStudentModal from "./components/AddStudentModal";
import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "../../styles/students.css";
import { motion } from "framer-motion";

const Students = () => {
  const students = useLoaderData();
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (value) => {
    setFilteredStudents(
      value
        ? students.filter((student) =>
            student.username.toLowerCase().includes(value.toLowerCase())
          )
        : students
    );
  };

  const handleDelete = (studentId) => {
    const fs = filteredStudents.filter((s) => s.studentId !== studentId);
    setFilteredStudents(fs);
  };

  const handleEdit = (updatedStudent) => {
    const updatedStudents = filteredStudents.map((student) =>
      student.studentId === updatedStudent.studentId ? updatedStudent : student
    );
    setFilteredStudents(updatedStudents);
  };

  const handleAddStudent = (newStudent) => {
    fetch("http://localhost:8080/api/students/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
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
        setFilteredStudents([...filteredStudents, data]);
        toast.success("Student added successfully");
      })
      .catch((err) => {
        const errorMessage = err.message || "Unknown error";
        toast.error(`Failed to add student: ${errorMessage}`);
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
          Students
        </Typography>
        <Button
          sx={{ width: "17.1em", padding: "14px 10px" }}
          aria-label="add new student"
          variant="contained"
          startIcon={<AddIcon />}
          onMouseDown={() => setIsModalOpen(true)}
        >
          Add New Student
        </Button>
        <SearchBar onSearch={handleSearch} />
        <div className="students">
          {filteredStudents.map((student) => (
            <Student
              key={student.studentId}
              {...student}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
        <AddStudentModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleAddStudent={handleAddStudent}
        />
      </div>
    </motion.div>
  );
};

export default Students;
