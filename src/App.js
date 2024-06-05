import React, { useState } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet, useNavigate, Route, Routes } from "react-router-dom";
import LoginModal from "./components/Auth/LoginModal";
import NavDrawer from "./components/navigation/NavDrawer";
import AppBarComponent from "./components/navigation/AppBar";
import "./styles/main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import WelcomeMessage from "./components/utils/WelcomeMessage.jsx";

function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState("dark");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLoginSuccess = () => {
    setShowModal(false);
    navigate("/");
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "hsl(220, 13%, 18%)",
        contrastText: "#fff",
      },
      secondary: {
        main: "hsl(210, 22%, 49%)",
        contrastText: "#fff",
      },
      accent: {
        main: "hsl(204, 1%, 50%)",
        contrastText: "#000",
      },
      background: {
        default: themeMode === "light" ? "#fff" : "hsl(220, 13%, 18%)",
        paper: themeMode === "light" ? "#f5f5f5" : "hsl(220, 13%, 22%)",
      },
      text: {
        primary: themeMode === "light" ? "hsl(220, 13%, 18%)" : "#fff",
        secondary:
          themeMode === "light" ? "hsl(210, 22%, 49%)" : "hsl(204, 1%, 50%)",
      },
    },
  });

  const toggleTheme = () => {
    const newMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {showModal && <LoginModal onLoginSuccess={handleLoginSuccess} />}
        {!showModal && (
          <>
            <AppBarComponent
              handleDrawerToggle={handleDrawerToggle}
              setShowModal={setShowModal}
              toggleTheme={toggleTheme}
            />
            <NavDrawer
              window={window}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
            <ToastContainer autoClose={2500} />
            <Box sx={{ width: "100%", height: "100svh", pt: 8 }}>
              <AnimatePresence mode="wait">
              <Routes>
                  <Route path="/" element={<WelcomeMessage />} />
                </Routes>
                <Outlet />
              </AnimatePresence>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
