import React, { useEffect } from 'react';

const NotificationComponent = () => {
  useEffect(() => {
    // Check for notification permission
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Hello!', {
        body: 'This is a notification from your React app!',
      });
    }
  };

  return (
    <div>
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default NotificationComponent;