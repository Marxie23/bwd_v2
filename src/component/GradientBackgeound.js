import React from "react";
import { Box } from "@mui/material";

const GradientBackground = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #2C2376, #6A5ACD)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "24px",
      }}
    >
      
    </Box>
  );
};

export default GradientBackground;
