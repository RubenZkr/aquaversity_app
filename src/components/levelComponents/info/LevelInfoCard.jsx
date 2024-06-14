import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Typography, Paper, Button, Box, CircularProgress, LinearProgress} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import {getLevelDetails} from "../../../api/ServiceBus.js";

// Helper function to parse content
const parseContent = (content) => {
    const html = marked(content);
    return { __html: DOMPurify.sanitize(html) };
};

const LevelInfoCard = () => {
    const { levelId } = useParams();
    const [levelContent, setLevelContent] = useState('');
    const [levelData, setLevelData] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch level data based on levelId
        const fetchLevelData = async () => {
            try {
                // fetch data from local md file
                const response = await getLevelDetails(levelId).then(response => {
                    setLevelData(response.data)
                    setLevelContent(response.data.content)
                }).catch((error) => {
                    console.error('Error fetching data:', error);
                }
                );
                setLevelContent(response.data.content);
            } catch (error) {
                console.error('Error fetching level data:', error);
            }
        };

        fetchLevelData();
    }, [levelId]);

    // show loading spinner while fetching data
    if (!levelContent) {
        return (
            <Container maxWidth="md">
                <Box my={4} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
                <Box display="flex" justifyContent="center">
                    <p>loading...</p>
                </Box>

            </Container>
        );
    }

    return (
        <Container maxWidth="md" >
            <Box my={4}>
                <Typography variant="h4" gutterBottom align="center">
                    {levelData.title}
                </Typography>
                <Paper elevation={3} style={{ padding: '24px', marginBottom: '24px', textAlign: "left" }}  >
                    <div dangerouslySetInnerHTML={parseContent(levelContent)} />
                </Paper>
                <Box display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/Level/${levelId}/Exam`)}
                    >
                        Probeer examen
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LevelInfoCard;