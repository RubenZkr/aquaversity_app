import React, { useState, useEffect } from 'react';
import {
    Typography,
    Paper,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Snackbar, Button
} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import '../LevelOverviewStyles.scss';
import { getLevelDetails, getQuestions, postAnswer} from "../../../api/ServiceBus.js";



const LevelQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [level, setLevel] = useState({});
    const { levelId } = useParams();
    const [score, setScore] = useState(0);

    const navigate = useNavigate();

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


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission action
        const res=await postAnswer(level.id, answers);
        setScore(res.data.score);
        // show alert if score is under 8 with a retry button that reloads the page
        if (res.data.score < 8) {
            alert("Helaas, je hebt niet genoeg punten behaald. Probeer het opnieuw!");
        }

    };

    const handleAnswerChange = (questionId, answerId) => {
        setAnswers({
            ...answers,
            [questionId]: answerId
        });
    };

    if (!questions) return <div>Loading...</div>;

    const handleRouteToProfile = () => {
        navigate('/profile'); // Replace '/profile' with the actual route to the profile page in your application
    };

    const handleRouteToLevels = () => {
        history.push('/levels'); // Replace '/levels' with the actual route to the levels page in your application
    };
    return (
        <div>
            <div className="login-root">
                <div className="box-root flex-flex flex-direction--column" style={{minHeight: '100vh', flexGrow: 1}}>
                    <div className="loginbackground box-background--white padding-top--64">
                        <div className="loginbackground-gridContainer">
                            <div className="box-root flex-flex" style={{gridArea: 'top / start / 8 / end'}}>
                                <div className="box-root" style={{
                                    backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)',
                                    flexGrow: 1
                                }}></div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: '4 / 2 / auto / 5'}}>
                                <div className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                                     style={{flexGrow: 1}}></div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: '6 / start / auto / 2'}}>
                                <div className="box-root box-background--blue800" style={{flexGrow: 1}}></div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: '7 / start / auto / 4'}}>
                                <div className="box-root box-background--blue animationLeftRight"
                                     style={{flexGrow: 1}}></div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: '8 / 4 / auto / 6'}}>
                                <div className="box-root box-background--gray100 animationLeftRight tans3s"
                                     style={{flexGrow: 1}}></div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: '2 / 15 / auto / end'}}>
                                <div className="box-root box-background--cyan200 animationRightLeft tans4s"
                                     style={{flexGrow: 1}}></div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: '3 / 14 / auto / end'}}>
                                <div className="box-root box-background--blue animationRightLeft"
                                     style={{flexGrow: 1}}></div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: '4 / 17 / auto / 20'}}>
                                <div className="box-root box-background--gray100 animationRightLeft tans4s"
                                     style={{flexGrow: 1}}></div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: '5 / 14 / auto / 17'}}>
                                <div className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                                     style={{flexGrow: 1}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="box-root padding-top--24 flex-flex flex-direction--column"
                         style={{flexGrow: 1, zIndex: 9}}>
                        <div className="formbg-outer">
                            <div className="formbg">
                                <div className="formbg-inner padding-horizontal--48">
                                    <span className="padding-bottom--15">{level.title}</span>
                                    <div>
                                        {score > 8 ? (
                                            <div>
                                                <div>Gefeliciteerd je hebt een {score}</div>
                                                <div>Ga naar jou profiel om je badge te zien!</div>
                                                <Button variant={"contained"} onClick={handleRouteToProfile}>Ga naar profiel</Button>
                                            </div>
                                        ) : (
                                            <form id="quiz-form" onSubmit={handleSubmit}>
                                                {questions.map((question) => (
                                                    <Paper key={question.id} elevation={3}
                                                           style={{marginBottom: '16px', padding: '16px'}}>
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
                                                                        control={<Radio/>}
                                                                        label={answer.answer}
                                                                    />
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Paper>
                                                ))}
                                                <div className="field padding-bottom--24">
                                                    <input type="submit" name="submit" value="Submit"/>
                                                </div>
                                            </form>
                                        )}
                                    </div>
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
