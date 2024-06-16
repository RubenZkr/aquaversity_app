import React, { useState, useEffect } from "react";
import EditUser from "./editUserComponent/EditUser";
import CompletedLevelGraph from "./graphComponent/CompletedLevelGraph";
import { getLoggedInStatus, getUserProgress } from "../../api/ServiceBus";
import "./profile.scss";
import { Alert } from "@mui/material";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Use state to manage login status
  const [progress, setProgress] = useState([]);

  const fetchLoginStatus = async () => {
    try {
      const res = await getLoggedInStatus();
      setIsLoggedIn(res.loggedIn);
      console.log(isLoggedIn);
    } catch (error) {
      console.error("Error fetching login status:", error);
    }
  };

  const fetchUserProgress = async () => {
    try {
      await getUserProgress().then((res) => {
        setProgress(res);
      });
    } catch {
      console.error("error while getting progress of user");
    }
  };

  useEffect(() => {
    fetchLoginStatus();
    fetchUserProgress();
  }, []); // Empty dependency array ensures this runs once

  return (
    <div className="main">
      {isLoggedIn === false && (
        <Alert severity="error">This is an error alert.</Alert>
      )}
      <h3>Profile page</h3>
      <div className="row">
        <CompletedLevelGraph progress={progress} />
        <EditUser />
      </div>
      <h3>Achievements</h3>
      <div className="row">
        {progress.map((item) => (
          <div key={item.orderNumber} style={{ marginRight: "10px" }}>
            <img
              src={`../public/images/badges/level_${item.orderNumber}.jpeg`}
              alt="achievement badge"
              width={50}
              style={{ margin: "0px" }}
            />
            <p>Level {item.orderNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
