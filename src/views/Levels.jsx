import React, { useEffect, useState } from "react";
import Level from "./Level";
import "../assets/styles/levels.css";
import {getLevels} from "../api/ServiceBus.js";

const Levels = () => {
  const [levelData, setLevelData] = useState([]);

    useEffect(() => {

        // Fetch level data from the backend API
        getLevels().then(response => {
            setLevelData(response);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });


    }, []);

  return (
    <div className="levels-block">
      <h3>Welcome to Level Page</h3>
      <div className="levels">
        {levelData.map((data, index) => (
          <Level
            key={index}
            id = {data.id}
            level={data.orderNumber}
            title={data.title}
            summary={data.content}
            disabled={data.isLockedForGuest}
          />
        ))}
      </div>
    </div>
  );
};

export default Levels;
