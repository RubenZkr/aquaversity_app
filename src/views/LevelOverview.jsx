// src/views/LevelOverview.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import LevelCard from '../components/levelComponents/levelCard/LevelCard';
import ExamCard from '../components/levelComponents/ExamCard/ExamCard';
import { Button } from '@mui/material';
import '../components/levelComponents/LevelOverviewStyles.scss';
import {getExamDetails, getLevelDetails} from "../api/ServiceBus";

const LevelOverview = () => {
    const { levelId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [exam, setExam] = useState(location.pathname.includes('/Exam'));
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [number, setNumber] = useState("");
    const [examData, setExamData] = useState([]);

    useEffect(() => {
        if (exam){
            OnGetExamDetails(levelId);
        }else{
            OnGetLevelDetails(levelId);
        }
    }, [levelId, exam]);

    const OnGetLevelDetails = (levelId) => {
        getLevelDetails(levelId)
        .then((response) =>{
            console.log("Responce Level:", response);
            if(response.status === 200){
                setTitle(response.data.title)
                setContent(response.data.content)
                setNumber(response.data.orderNumber)
            }else{
                setError("U have to login in, to see this data.")
            }
        })
    };

    const OnGetExamDetails = async (levelId) => {
        await getExamDetails(levelId)
        .then((response) => {
            console.log("Responce Exam: ", response)
            if(response.status === 200){
                setExamData(response.data);
            }else{
                setError("U have to login in, to see this data.")
            }
        })
    }

    const toggleLevel = () => {
        setExam(prevExam => !prevExam);
        if (exam) {
            console.log("Level loaded")
            navigate(`/Level/${id}`);
        }else{
            console.log("Exam loaded")
            navigate(`/Level/${id}/Exam`);
        }
    };


    return (
        <div className="level-overview">
            <h1>Level Overview for Level {number}</h1>
           {/* {OnGetLevelDetails(levelId)} */}
            {!exam && <LevelCard 
                title = {title}
                summary = {content}
            />}
            {exam && <ExamCard 
                examData = {examData}
            />}

            <Button className='level-overview-button' onClick={toggleLevel}>
                {exam ? "Go back to class" : "Try exam"}
            </Button>

            {/* Render level details based on levelId */}
        </div>
    );
};

export default LevelOverview;
