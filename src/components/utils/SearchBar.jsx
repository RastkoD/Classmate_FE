import React from "react";
import { FormControl, TextField } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  return (
    <FormControl sx={{ mt: "1rem", mb: "1rem", width: "15em" }}>
      <TextField
        id="searchInput"
        placeholder="Search"
        label="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </FormControl>
  );
};

export default SearchBar;
