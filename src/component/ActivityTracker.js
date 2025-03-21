import React, { useState, useEffect } from "react";

const ActivityTracker = () => {
  const [isActive, setIsActive] = useState(true); // User's activity status
  const [lastActiveTime, setLastActiveTime] = useState(Date.now()); // Last activity timestamp

  const IDLE_THRESHOLD = 300000; // 5 minutes in milliseconds

  // Handle user activity events
  const handleUserActivity = () => {
    setLastActiveTime(Date.now());
    if (!isActive) {
      setIsActive(true);
      console.log("User is now active.");
    }
  };

  // Check for idle status
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActiveTime > IDLE_THRESHOLD && isActive) {
        setIsActive(false);
        console.log("User is now idle.");
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [lastActiveTime, isActive]);

  // Attach activity event listeners
  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
    events.forEach((event) => window.addEventListener(event, handleUserActivity));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleUserActivity));
    };
  }, []);

  return (
    <div>
      <h1>Activity Tracker</h1>
      <p>Status: {isActive ? "Active" : "Idle"}</p>
      <p>Last Active: {new Date(lastActiveTime).toLocaleTimeString()}</p>
    </div>
  );
};

export default ActivityTracker;
