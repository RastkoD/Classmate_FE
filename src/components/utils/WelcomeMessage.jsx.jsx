import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const WelcomeMessage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return null;

  return (
    <Box style={{ padding: "1em", textAlign: "center" }}>
      <Typography variant="h3">Welcome, {user.firstName}!</Typography>
    </Box>
  );
};

export default WelcomeMessage;
