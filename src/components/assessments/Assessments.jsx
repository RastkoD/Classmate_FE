import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import SearchBar from "../utils/SearchBar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssessmentModal from "./AssessmentModal";
import "../../styles/assessments.css";

const Assessments = () => {
  const assessments = useLoaderData();
  const [filteredAssessments, setFilteredAssessments] = useState(assessments);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    let res = await fetch(
      `http://localhost:8080/api/assessments/delete/${assessmentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      let d = await res.json();
      toast.success("Assessment deleted successfully");
      handleDelete(assessmentId);
    } else {
      let err = await res.json();
      const errorMessage = err.error || "Unknown error";
      const status = err.status || "Unknown status";
      toast.error(
        `Failed to delete assessment: ${errorMessage} (Status: ${status})`
      );
    }
  };

  const handleDelete = (assessmentId) => {
    const fa = filteredAssessments.filter(
      (a) => a.assessmentId !== assessmentId
    );
    setFilteredAssessments(fa);
  };

  const handleAddNewAssessment = (newAssessment) => {
    fetch("http://localhost:8080/api/assessments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAssessment),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => { throw err; });
        }
        return response.json();
      })
      .then((data) => {
        setFilteredAssessments([...filteredAssessments, data]);
        toast.success("Assessment created successfully");
      })
      .catch((err) => {
        const errorMessage = err.message || "Unknown error";
        toast.error(`Failed to create assessment: ${errorMessage}`);
      });
  };

  const columns = [
    { field: "assessmentId", headerName: "ID", width: 90 },
    { field: "studentUsername", headerName: "Student", width: 150 },
    { field: "courseName", headerName: "Course", width: 150 },
    { field: "mark", headerName: "Mark", width: 90 },
    { field: "assessmentType", headerName: "Assessment Type", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "comment", headerName: "Comment", width: 200 },
    { field: "teacherUsername", headerName: "Teacher", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <Button aria-label="edit" variant="outlined" startIcon={<EditIcon />}>
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
          onClick={() => deleteAssessment(params.row.assessmentId)}
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
    <div className="mainAssess">
      <Typography sx={{ padding: "1rem 0" }} variant="h2">
        Assessments
      </Typography>
      <Button
        sx={{ width: "17.1em", padding: "14px 10px" }}
        aria-label="add new assessment"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setIsModalOpen(true)}
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
      <AssessmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddNewAssessment}
      />
    </div>
  );
};

export default Assessments;
