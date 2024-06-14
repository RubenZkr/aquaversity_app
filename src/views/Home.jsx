import React from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import {getTestOverview} from "../api/ServiceBus.js";

const Home = () => {

  const test = () => {
    getTestOverview().then(r => console.log(r));
  }

  return (
    <Container>
      <Button onClick={test}>Test</Button>
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Aquaversity
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The place that teaches you that thirst is fixable
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/levels"
        >
          Get Started
        </Button>
      </Box>
      <Box sx={{ py: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Learn at Your Own Pace
              </Typography>
              <Typography variant="body1">
                Access a variety of levels and courses tailored to your learning
                needs. Improve your skills step by step.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Join the Community
              </Typography>
              <Typography variant="body1">
                Engage with like-minded individuals in our forums. Share your
                progress and get support from the community.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Track Your Progress
              </Typography>
              <Typography variant="body1">
                Monitor your learning journey with our comprehensive tracking
                tools. See how far you've come and stay motivated.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Expert Guidance
              </Typography>
              <Typography variant="body1">
                Learn from experts in the field. Our instructors are here to
                guide you through every step of your learning experience.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to quench your thirst for knowledge?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
        >
          Join Us Now
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
