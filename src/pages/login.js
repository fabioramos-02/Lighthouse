import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          maxWidth: "400px",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Avatar sx={{ margin: "0 auto", backgroundColor: "#1976d2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Login com LDAP
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Usuário"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Senha"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: "1.5rem",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Entrar
          </Button>
        </form>
        {error && (
          <Alert severity="error" sx={{ marginTop: "1rem" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ marginTop: "1rem" }}>
            {success}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
