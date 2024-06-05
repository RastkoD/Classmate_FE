import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import SearchBar from "../utils/SearchBar";
import { motion } from "framer-motion";

const AssessmentsForStudent = () => {
  const assessments = useLoaderData();
  const [filteredAssessments, setFilteredAssessments] = useState(assessments);

  const studentUsername =
    assessments.length > 0 ? assessments[0].studentUsername : "Student";

  const handleSearch = (value) => {
    setFilteredAssessments(
      value
        ? assessments.filter((assessment) =>
            assessment.courseName.toLowerCase().includes(value.toLowerCase())
          )
        : assessments
    );
  };

  const columns = [
    { field: "courseName", headerName: "Course", width: 210 },
    { field: "mark", headerName: "Mark", width: 90 },
    { field: "assessmentType", headerName: "Assessment Type", width: 150 },
    { field: "comment", headerName: "Comment", width: 200 },
    { field: "teacherUsername", headerName: "Teacher", width: 140 },
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
          {`${studentUsername}'s Assessments`}
        </Typography>
        <SearchBar onSearch={handleSearch} />
        <Box sx={{ height: 600, width: 800 }}>
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
      </div>
    </motion.div>
  );
};

export default AssessmentsForStudent;
