import * as React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Close } from "@mui/icons-material";

function NavDrawer({ window, mobileOpen, handleDrawerToggle }) {
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

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          p: 1.5,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={handleDrawerToggle}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {isLogin && user.role === "admin" ? (
          <ListItem
            disablePadding
            component={NavLink}
            to="courses"
            onClick={handleDrawerToggle}
          >
            <ListItemButton>
              <ListItemText
                primary="Courses"
                sx={{ textAlign: "center", color: "black" }}
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <></>
        )}
        {isLogin && user.role === "admin" ? (
          <ListItem
            disablePadding
            component={NavLink}
            to="assessments"
            onClick={handleDrawerToggle}
          >
            <ListItemButton>
              <ListItemText
                primary="Assessments"
                sx={{ textAlign: "center", color: "black" }}
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <></>
        )}
        {isLogin && user.role === "admin" ? (
          <ListItem
            disablePadding
            component={NavLink}
            to="students"
            onClick={handleDrawerToggle}
          >
            <ListItemButton>
              <ListItemText
                primary="Students"
                sx={{ textAlign: "center", color: "black" }}
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <></>
        )}
        {isLogin && user.role === "guardian" ? (
          <ListItem
            disablePadding
            component={NavLink}
            to={`/assessments/student/${user.wardId}`}
            onClick={handleDrawerToggle}
          >
            <ListItemButton>
              <ListItemText
                primary="Assessments"
                sx={{ textAlign: "center", color: "black" }}
              />
            </ListItemButton>
          </ListItem>
        ) : null}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100vw",
          },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
}

export default NavDrawer;
