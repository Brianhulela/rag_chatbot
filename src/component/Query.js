import { Box, Paper } from "@mui/material";
import React from "react";

function Query({message}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", ml: 16 }}>
      <Paper sx={{ px: 2, py: 1, borderRadius: 6 }}>
        {message.text}
      </Paper>
    </Box>
  );
}

export default Query;
