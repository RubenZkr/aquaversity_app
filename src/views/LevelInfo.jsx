// show levelQuiz component in this view
import React from 'react';
import {useParams} from "react-router-dom";
import LevelInfoCard from "../components/levelComponents/info/LevelInfoCard.jsx";

const LevelInfo = () => {
    // get levelId from the URL params
    const { levelId } = useParams();
    return <LevelInfoCard levelId={levelId} />;
};

export default LevelInfo;