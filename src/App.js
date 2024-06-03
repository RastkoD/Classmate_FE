import * as React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline
} from "@mui/material";
import NavDrawer from "./components/navigation/NavDrawer";
import AppBarComponent from "./components/navigation/AppBar";
import "./styles/main.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent handleDrawerToggle={handleDrawerToggle} />
      <NavDrawer
        window={window}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <ToastContainer autoClose={3000} />
      <Box sx={{ width: "100%", height: "100svh", pt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
