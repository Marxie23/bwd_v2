import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminView from '../views/AdminView';
import UserView from '../views/UserView';
import CashierView from '../views/CashierView';

const DashboardLayout = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showUserView, setShowUserView] = useState(false);
  const [showCashierView, setShowCashierView] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false);
  const [username, setUsername] = useState("");
  const [accessType, setAccessType] = useState("");
  const [pictureURL, setPictureURL] = useState("");

  const handleRequestPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            // alert('Notification permission granted.');
          } else if (permission === 'denied') {
            Notification.requestPermission();
          } else {
            alert('Notification permission denied.');
          }
        })
        .catch(err => console.error('Permission request error:', err));
    } else {
      alert('Your browser does not support notifications.');
    }
  };

  useEffect(() => {
    handleRequestPermission();
    if (currentUser) {
      setUsername(currentUser.username);
      setAccessType(currentUser.accessType);
      setPictureURL(currentUser.pictureURL);

      setShowAdminView(currentUser.accessType === "ADMIN");
      setShowUserView(currentUser.accessType === "CUSTOMER");
      setShowCashierView(currentUser.accessType === "CASHIER");
    } else {
      setShowAdminView(false);
      setShowUserView(false);
      setShowCashierView(false);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to='/landing' />;
  }

  return (
    <Routes>
      {showAdminView && (
        <Route path='/*' element={<AdminView username={username} accessType={accessType} pictureURL={pictureURL} />} />
      )}
      {showUserView && (
        <Route path='/*' element={<UserView username={username} accessType={accessType} pictureURL={pictureURL} />} />
      )}
      {showCashierView && (
        <Route path='/*' element={<CashierView username={username} accessType={accessType} pictureURL={pictureURL} />} />
      )}
    </Routes>
  );
};

export default DashboardLayout;
