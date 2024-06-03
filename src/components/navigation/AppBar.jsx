import React from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function AppBarComponent({ handleDrawerToggle }) {
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
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Stack direction="row">
            <ListItem disablePadding component={NavLink} to="courses">
              <ListItemButton>
                <ListItemText sx={{ color: "white" }} primary="Courses" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={NavLink} to="assessments">
              <ListItemButton>
                <ListItemText sx={{ color: "white" }} primary="Assessments" />
              </ListItemButton>
            </ListItem>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
