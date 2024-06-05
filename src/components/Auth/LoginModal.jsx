import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginModal = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("user", JSON.stringify({
        username, 
        role: "admin",
        firstName: "Sauron"
      }));
      onLoginSuccess();
    } else if (username === "bilbo.baggins" && password === "mrinvisible") {
      localStorage.setItem("user", JSON.stringify({
        username,
        role: "guardian",
        firstName: "Bilbo",
        lastName: "Baggins",
        wardId: 53,
      })
      );
      onLoginSuccess();
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  const demoAdmin = () => {
    setUsername("admin");
    setPassword("admin");
  }

  const demoGuardian = () => {
    setUsername("bilbo.baggins");
    setPassword("mrinvisible");
  } 

  return (
    <Dialog open>
      <DialogTitle sx={{ textAlign: "center" }}>Sign in</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
          <TextField
            id="password"
            margin="dense"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            sx={{ position: "absolute", right: "35px", top: "150px" }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          {errorMessage && (
            <FormHelperText error>{errorMessage}</FormHelperText>
          )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ mr: 2, mb: 1, ml: 2 }}
          onClick={handleLogin}
          fullWidth
        >
          Sign in
        </Button>
      </DialogActions>
      <DialogActions sx={{display: "flex", justifyContent: "space-between", ml: 2, mr: 2}}>
        <Button
          variant="contained"
          sx={{ mb: 2, }}
          onClick={demoAdmin}
        >
          Demo as Admin
        </Button>
        <Button
          variant="contained"
          sx={{ mb: 2}}
          onClick={demoGuardian}
        >
          Demo as Guardian
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
