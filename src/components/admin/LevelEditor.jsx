import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import axios from "axios";
import {getAnswers, getExamDetails, getLevelDetails, getQuestions, patchLevelContent} from "../../api/ServiceBus.js";

const LevelEditor = (levelId) => {
    const [content, setContent] = useState('');
    const [level, setLevel] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Fetch level data based on levelId
        const fetchLevelData = async () => {
            try {
                // fetch data from local md file
                 await getLevelDetails(levelId.levelId).then(response => {
                    setContent(response.data.content)
                     setLevel(response.data)
                     setLoading(false)
                }).catch((error) => {
                        console.error('Error fetching data:', error);
                        setLoading(false)
                    }
                );
            } catch (error) {
                console.error('Error fetching level data:', error);
            }
        };

        fetchLevelData();
    }, [levelId]);

    const handleSave = async (id, c) => {
            await patchLevelContent(id, c);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Pas Level {level.title} Content aan</Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <TextField
                    label="Level Content"
                    multiline
                    rows={20}
                    variant="outlined"
                    fullWidth
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Paper>
            <Button variant={"contained"} color="primary" onClick={() => handleSave(level.id, content)}>
                Save
            </Button>
        </Container>
    );
};

export default LevelEditor;
