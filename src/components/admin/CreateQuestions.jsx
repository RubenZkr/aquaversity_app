import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addQuestion, getQuestions} from "../../api/ServiceBus.js";

const CreateQuestions = ({ levelId }) => {


    const [questions, setQuestions] = useState([
        {
            question: '',
            answers: [
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false },
            ],
        },
    ]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions(levelId);
                if (response.status === 200) {
                    // map response.data inside questions
                    setQuestions(response.data);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [levelId]);

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (qIndex, aIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex].answer = event.target.value;
        setQuestions(newQuestions);
    };

    const handleIsCorrectChange = (qIndex, aIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex].isCorrect = !newQuestions[qIndex].answers[aIndex].isCorrect;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: '',
                answers: [
                    { answer: '', isCorrect: false },
                    { answer: '', isCorrect: false },
                    { answer: '', isCorrect: false },
                    { answer: '', isCorrect: false },
                ],
            },
        ]);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addQuestion(levelId, questions);
            if (response.status === 201) {
                alert('Questions created successfully!');
                setQuestions([
                    {
                        question: '',
                        answers: [
                            { answer: '', isCorrect: false },
                            { answer: '', isCorrect: false },
                            { answer: '', isCorrect: false },
                            { answer: '', isCorrect: false },
                        ],
                    },
                ]);
            }
        } catch (error) {
            console.error('Error creating questions:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                 Pas/ maak vragen aan
            </Typography>
            <form onSubmit={handleSubmit}>
                {questions.map((q, qIndex) => (
                    <Box key={qIndex} mb={3}>
                        <Box display="flex" alignItems="center">
                            <TextField
                                label="Question"
                                variant="outlined"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                fullWidth
                                required
                                sx={{ mr: 2 }}
                            />
                            <IconButton onClick={() => handleRemoveQuestion(qIndex)} color="secondary">
                                <RemoveIcon />
                            </IconButton>
                        </Box>
                        {q.answers.map((a, aIndex) => (
                            <Box key={aIndex} display="flex" alignItems="center" my={1}>
                                <TextField
                                    label={`Answer ${aIndex + 1}`}
                                    variant="outlined"
                                    value={a.answer}
                                    onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                                    fullWidth
                                    required
                                    sx={{ mr: 2 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={a.isCorrect}
                                            onChange={() => handleIsCorrectChange(qIndex, aIndex)}
                                            color="primary"
                                        />
                                    }
                                    label="Correct"
                                />
                            </Box>
                        ))}
                    </Box>
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddQuestion}
                    startIcon={<AddIcon />}
                >
                    Add Question
                </Button>
                <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default CreateQuestions;
