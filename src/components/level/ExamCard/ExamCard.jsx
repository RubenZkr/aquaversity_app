import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography, Button, Snackbar } from '@mui/material';
import '../LevelOverviewStyles.scss';
import {postAnswer} from "../../../api/ServiceBus";

const ExamCard = ({examData}) => {
    // Initialize state to store selected answers
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Update selectedAnswers state when an answer is selected
    const handleAnswerSelect = (id, question, answer) => {
        console.log('Selected answer:', { id, answer });
        setSelectedAnswers(prevState => ({
            ...prevState,
            [question]: answer
        }));

        postAnswer(id)
        .then((response) => {
            if(response.status === 200){
                console.log(response.data.message)
                if (response.data.message){
                    setSnackbarMessage("The answer is right");
                }else{
                    setSnackbarMessage("The answer is wrong");
                }
                
                setOpenSnackbar(true);

            }else{
                setError("Couldn't check the answer.")
                setOpenSnackbar(true);
            }
        })
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    // Check if examData is defined and contains at least one item
    if (!examData || examData.length === 0) {
        return (
            <div className='card-wrapper'>
                <Card className='card-responsive'>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            No exam data available.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className='card-wrapper'>
            <Card className='card-responsive'>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Question: {examData[0].question}
                    </Typography>
                    {examData.map((item, index) => (
                     <div key={index} className='exam-item'>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => handleAnswerSelect(item.id, item.answer)}
                        >
                            {item.answer}
                        </Button>
                    </div>     
                    ))}  
                </CardContent>
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
            </Card>
           
        </div>
    );
}

export default ExamCard;