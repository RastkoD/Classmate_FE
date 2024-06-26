import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  ListItemText,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4, Logout } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";

function AppBarComponent({ handleDrawerToggle, setShowModal, toggleTheme }) {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    console.log(u);
    if (u) {
      setUser(JSON.parse(u));
      setIsLogin(true);
    }
  }, [isLogin]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowModal(true);
    navigate("/");
    handleMenuClose();
    setIsLogin(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleMenuClose();
  };

  const activeStyle = {
    textDecoration: "underline",
    color: "white",
  };

  return (
    <AppBar component="nav" sx={{ px: { xl: "25em" } }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { sm: "block" } }}
        >
          <NavLink className="logoLink" to="/">
            Classmate
          </NavLink>
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onMouseDown={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Stack direction="row">
            <ListItem disablePadding component={NavLink} to="/">
              <ListItemButton disableRipple>
                <ListItemText sx={{ color: "white" }} primary="Home" />
              </ListItemButton>
            </ListItem>
            {isLogin && user.role === "admin" ? (
              <>
                <ListItem
                  disablePadding
                  component={NavLink}
                  to="/download-logs"
                >
                  <ListItemButton disableRipple>
                    <ListItemText
                      sx={{ color: "white", width: "max-content" }}
                      primary="Download Logs"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  component={NavLink}
                  to="courses"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <ListItemButton disableRipple>
                    <ListItemText sx={{ color: "white" }} primary="Courses" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  component={NavLink}
                  to="assessments"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <ListItemButton disableRipple>
                    <ListItemText
                      sx={{ color: "white" }}
                      primary="Assessments"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  component={NavLink}
                  to="students"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <ListItemButton disableRipple>
                    <ListItemText sx={{ color: "white" }} primary="Students" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : null}
            {isLogin && user.role === "guardian" ? (
              <ListItem
                disablePadding
                component={NavLink}
                to={`/assessments/student/${user.wardId}`}
                onMouseDown={handleDrawerToggle}
              >
                <ListItemButton disableRipple>
                  <ListItemText primary="Assessments" sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
            ) : null}
            <ListItem disablePadding>
              <IconButton color="inherit" onMouseDown={handleMenuOpen}>
                <SettingsIcon />
              </IconButton>
            </ListItem>
          </Stack>
        </Box>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onMouseDown={handleThemeToggle}>
            <Brightness4 fontSize="small" />
            <ListItemText>Dark/Light Mode</ListItemText>
          </MenuItem>
          <MenuItem onMouseDown={handleLogout}>
            <Logout fontSize="small" />
            <ListItemText>Sign out</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
