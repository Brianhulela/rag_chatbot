import { Box, Button, TextField, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

function Home() {
  
  const chatHistory = [{id: 1, message: 'Mlungisi October 4 Topic'},
    {id: 2, message: 'Mlungisi November 4 Topic'},];

  return (
    <Grid container spacing={2}>
      
      {/* Left side - Chat History */}
      <Grid item xs={4}>
        <Box
          sx={{
            height: '80vh',
            border: '1px solid #ddd',
            borderRadius: 2,
            overflowY: 'auto',
            padding: 8}}
        >
          <Typography variant="h6" sx={{mb: 2}}>
            History
          </Typography>
          <List>
            {chatHistory.map((chat) => (
              <ListItem key={chat.id} button>
                <ListItemText primary={chat.message} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      {/* Right side - Main Chat Interface */}
      <Grid item xs={8}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          sx={{ mt: 45}}
        >
          <Typography variant="h5" sx={{mb: 2}}>
            Hello, What's Up
          </Typography>

          <Box display="flex" flexDirection="row" alignItems="center" sx={{maxWidth: 500, width: '100%'}}>
            <TextField
              label="Comment or Ask Anything"
              variant="outlined"
              fullWidth
              sx={{mr: 1}}
            />

            <Button
              variant="contained"
              sx={{minHeight:'56px', width: "25%"}}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
