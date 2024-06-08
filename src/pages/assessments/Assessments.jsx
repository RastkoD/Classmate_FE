import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import SearchBar from "../../components/utils/SearchBar";
import AddAssessmentModal from "./components/AddAssessmentModal";
import EditAssessmentModal from "./components/EditAssessmentModal";
import "../../styles/assessments.css";
import { motion } from "framer-motion";

const Assessments = () => {
  const assessments = useLoaderData();
  const [filteredAssessments, setFilteredAssessments] = useState(assessments);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);

  const handleSearch = (value) => {
    setFilteredAssessments(
      value
        ? assessments.filter((assessment) =>
            assessment.studentUsername
              .toLowerCase()
              .includes(value.toLowerCase())
          )
        : assessments
    );
  };

  const deleteAssessment = async (assessmentId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/assessments/delete/${assessmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        toast.success("Assessment deleted successfully");
        handleDelete(assessmentId);
      } else {
        const err = await res.json();
        const errorMessage = err.error || "Unknown error";
        const status = err.status || "Unknown status";
        toast.error(
          `Failed to delete assessment: ${errorMessage} (Status: ${status})`
        );
      }
    } catch (error) {
      console.error("Error deleting assessment:", error);
      toast.error("An error occurred while deleting the assessment");
    }
  };

  const handleDelete = (assessmentId) => {
    const fa = filteredAssessments.filter(
      (a) => a.assessmentId !== assessmentId
    );
    setFilteredAssessments(fa);
  };

  const handleAddNewAssessment = async (newAssessment) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/assessments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAssessment),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Unknown error");
      }

      const data = await response.json();
      setFilteredAssessments([...filteredAssessments, data]);
      toast.success("Assessment created successfully");
    } catch (error) {
      console.error("Error creating assessment:", error);
      toast.error(`Failed to create assessment: ${error.message}`);
    }
  };

  const handleEditAssessment = async (updatedAssessment) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/assessments/update/${updatedAssessment.assessmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAssessment),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Unknown error");
      }

      const data = await response.json();
      setFilteredAssessments(
        filteredAssessments.map((assessment) =>
          assessment.assessmentId === data.assessmentId ? data : assessment
        )
      );
      toast.success("Assessment updated successfully");
    } catch (error) {
      console.error("Error updating assessment:", error);
      toast.error(`Failed to update assessment: ${error.message}`);
    }
  };

  const handleEditButtonClick = (assessment) => {
    setCurrentAssessment(assessment);
    setIsEditModalOpen(true);
  };

  const columns = [
    { field: "assessmentId", headerName: "ID", width: 90 },
    { field: "studentUsername", headerName: "Student", width: 150 },
    { field: "courseName", headerName: "Course", width: 150 },
    { field: "mark", headerName: "Mark", width: 90 },
    { field: "assessmentType", headerName: "Assessment Type", width: 150 },
    { field: "comment", headerName: "Comment", width: 200 },
    { field: "teacherUsername", headerName: "Teacher", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <Button
        onMouseDown={() => handleEditButtonClick(params.row)}
          aria-label="edit"
          variant="outlined"
          startIcon={<EditIcon />}
          color="info"
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <Button
        onMouseDown={() => deleteAssessment(params.row.assessmentId)}
          aria-label="delete"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mainAssess">
        <Typography sx={{ padding: "1rem 0" }} variant="h2">
          Assessments
        </Typography>
        <Button
          sx={{ width: "17.1em", padding: "14px 10px" }}
          aria-label="add new assessment"
          variant="contained"
          startIcon={<AddIcon />}
          onMouseDown={() => setIsAddModalOpen(true)}
        >
          Add New Assessment
        </Button>
        <SearchBar onSearch={handleSearch} />
        <Box sx={{ height: 600, width: "80%" }}>
          <DataGrid
            rows={filteredAssessments}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            getRowId={(row) => row.assessmentId}
          />
        </Box>
        <AddAssessmentModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddNewAssessment}
        />
        {currentAssessment && (
          <EditAssessmentModal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEditAssessment}
            initialData={currentAssessment}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Assessments;
