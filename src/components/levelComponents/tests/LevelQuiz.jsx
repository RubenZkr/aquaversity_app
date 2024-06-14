import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Snackbar
} from '@mui/material';
import {Form, useParams} from "react-router-dom";
import '../LevelOverviewStyles.scss';
import {getExamDetails, getLevelDetails, getQuestions, postAnswer} from "../../../api/ServiceBus.js";



const LevelQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [level, setLevel] = useState({});
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    
    const { levelId } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionsResponse = await getQuestions(levelId)
                const levelResponse = await getLevelDetails(levelId)


                setQuestions(questionsResponse.data);
                setLevel(levelResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [levelId]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    
    const handleSubmit = async (event) => {

        event.preventDefault(); // Prevent the default form submission action
        console.log(answers)
        await postAnswer(answers.answerId)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.message) {
                        setSnackbarMessage("The answer is right");
                    } else {
                        setSnackbarMessage("The answer is wrong");
                    }

                    setOpenSnackbar(true);

                } else {
                    setOpenSnackbar(true);
                }
            })
    };

    const handleAnswerChange = (questionId, answerId) => {
        
        setAnswers({
            ...answers,
            [questionId]: answerId,
            answerId
        });
        console.log(answers)
    };

    if (!questions) return <div>Loading...</div>;


    return (
        <div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={<span style={{ textAlign: 'center', display: 'block', width: '100%' }}>{snackbarMessage}</span>}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        minWidth: '300px',
                        maxWidth: '600px',
                        backgroundColor: '#fff', // Change background color to white
                        color: '#000', // Change text color to black for contrast
                        textAlign: 'center', // Center the text
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            />
        <div className="login-root">
            <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
                <div className="loginbackground box-background--white padding-top--64">
                    <div className="loginbackground-gridContainer">
                        <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
                            <div className="box-root" style={{ backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)', flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
                            <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
                            <div className="box-root box-background--blue800" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
                            <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                            <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                            <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                            <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                            <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                            <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: 1 }}></div>
                        </div>
                    </div>
                </div>
                <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15">{level.title}</span>
                                <form id="quiz-form" onSubmit={handleSubmit}>
                                    {questions.map((question) => (
                                        <Paper key={question.id} elevation={3} style={{ marginBottom: '16px', padding: '16px' }}>
                                            <Typography variant="h6">{question.question}</Typography>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    name={`question-${question.id}`}
                                                    value={answers[question.id] || ''}
                                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                                >
                                                    {question.answers.map((answer) => (
                                                        <FormControlLabel
                                                            key={answer.id}
                                                            value={answer.id.toString()}
                                                            control={<Radio />}
                                                            label={answer.answer}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    ))}
                                    <div className="field padding-bottom--24">
                                        <input type="submit" name="submit" value="Submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="footer-link padding-top--24">
                            <span>Good luck with your test!</span>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>

        </div>
    );

};

export default LevelQuiz;
