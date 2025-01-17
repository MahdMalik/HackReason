'use client'
import Image from 'next/image';
import React, { useState } from "react";
import { 
  Box, Stack, TextField, Button, Typography, Avatar, 
  createTheme, ThemeProvider, Fade, IconButton, CircularProgress 
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#00C853' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
});

const quickReplies = ["Help", "About", "Contact"];

export default function Home() {
  const [messages, setMessages] = useState([{
    role: "model",
    parts: [{text: "Hello! I'm the Autis(CASP) screening support assistant. How can I help you today?"}]
  }]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async() => {
    if (!message.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {role: "user", parts: [{text: message}]},
    ]);
    setMessage('');
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify([...messages, {role: "user", parts: [{text: message}]}])
      });
      const newMessage = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        {role: "model", parts: [{text: newMessage.message}]}
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function sendQuery() {
    let query = "autism([social_emotional_deficits, non_verbal_comm_deficits, rel_maintenance_deficits, motor_stereotypes, hyper_hyporeactivity])."
    try
    {
      const returnedValues = await fetch("/api/backend", {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(query)
      })
      console.log(await returnedValues.json())
    }
    catch(e)
    {
      console.log("Failed to contact python. Error: " + e)
    }
    
  }
  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
    {/* Background Image */}
    <Image 
      src="/Autism_Awareness.png" 
      alt="Background" 
      layout="fill"
      objectFit="cover"
      quality={100}
      style={{ 
        zIndex: -1,  // Ensures image is behind other content
        opacity: 0.4 // Makes background slightly transparent
      }}
    />
      
      <ThemeProvider theme={theme}>
        <Box sx={{
          position: 'fixed',
          top: "5%",
          left: "5%",
          width: "90%",
          height: "90%",
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}>
          <Stack direction="column" height="100%">
            {/* Header */}
            <Box sx={{
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
            }}>
              <Typography variant="h6" fontWeight="600">
                Autis(CASP) Bot
              </Typography>
            </Box>

            {/* Chat messages */}
            <Box sx={{
              flexGrow: 1,
              overflow: 'auto',
              p: 2,
            }}>
              {messages.map((message, index) => (
                <Fade key={index} in={true} timeout={500}>
                  <Box 
                    display="flex" 
                    justifyContent={message.role === "model" ? 'flex-start' : 'flex-end'}
                    mb={2}
                  >
                    {message.role === "model" && (
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>B</Avatar>
                    )}
                    <Box 
                      bgcolor={message.role === 'model' ? 'primary.light' : 'secondary.light'} 
                      color={message.role === 'model' ? 'primary.contrastText' : 'secondary.contrastText'}
                      p={2}
                      borderRadius={2}
                      maxWidth="70%"
                    >
                      <Typography variant="body2">
                        {message.parts[0].text}
                      </Typography>
                    </Box>
                    {message.role === "user" && (
                      <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>U</Avatar>
                    )}
                  </Box>
                </Fade>
              ))}
              {isTyping && (
                <Box display="flex" alignItems="center" mt={1}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" ml={1}>Bot is typing...</Typography>
                </Box>
              )}
            </Box>

            {/* Quick replies */}
            <Stack direction="row" spacing={1} p={2}>
              {quickReplies.map((reply, index) => (
                <Button key={index} variant="outlined" size="small" onClick={() => setMessage(reply)}>
                  {reply}
                </Button>
              ))}
            </Stack>

            {/* Input area */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      sendMessage();
                      sendQuery()
                    }
                  }}
                />
                <IconButton color="primary" onClick={() => {
                  sendMessage(); 
                  sendQuery();
                  }} disabled={!message.trim()}>
                  <SendIcon />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>
    </Box>
  );
}
