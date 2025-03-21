// src/component/BrowserCloseListener.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

const BrowserCloseListener = () => {
    const { user: currentUser  } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        // Save a flag in sessionStorage to detect reload
        sessionStorage.setItem('isReload', 'true');
        
        // Show a confirmation dialog (if needed)
        event.preventDefault();
        event.returnValue = ''; // This is required for the browser to show the dialog
      };
  
      const handleUnload = () => {
        const isReload = sessionStorage.getItem('isReload') === 'true';
  
        if (isReload) {
          console.log('The page is being reloaded.');
          sessionStorage.removeItem('isReload'); // Clean up the flag
        } else {
          console.log('The page is being closed.');
          dispatch(logout(currentUser.id))
        }
      };
  
      // Attach event listeners
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('unload', handleUnload);
  
      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('unload', handleUnload);
      };
    }, []);
  
    return <div>React App</div>;
};

export default BrowserCloseListener;