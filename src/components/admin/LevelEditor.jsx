import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import axios from "axios";
import {getLevelDetails} from "../../api/ServiceBus.js";

const LevelEditor = (levelId) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Fetch level data based on levelId
        const fetchLevelData = async () => {
            try {
                // fetch data from local md file
                 await getLevelDetails(levelId.levelId).then(response => {
                    setContent(response.data.content)
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

    const handleSave = async () => {
        try {
            await fetch(`/info/Level${levelId.levelId}.md`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: content,
            });
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Level {levelId.levelId} Content</Typography>
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
            <Button variant="contained" color="primary" onClick={handleSave}>
                Save
            </Button>
        </Container>
    );
};

export default LevelEditor;
