'use client'
import Image from "next/image";

import { Typography, Container, AppBar, Toolbar, Button, Box, Grid } from '@mui/material'

export default function Home() {
  async function sendQuery() {
    let query = "autism([social_emotional_deficits, non_verbal_comm_deficits, rel_maintenance_deficits, motor_stereotypes, hyper_hyporeactivity])."
    try
    {
      const returnedValues = await fetch('http://127.0.0.1:5000/backend', {
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
    <Box>
      <p>HELLO CHAT</p>
      <Button onClick={sendQuery}>Click To Send</Button>
    </Box>
  );
}
