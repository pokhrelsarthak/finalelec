import React, { useEffect } from 'react';

const SessionTimeout = ({ timeoutInMinutes, onTimeout }) => {
  useEffect(() => {
    let timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(onTimeout, timeoutInMinutes * 60 * 1000);
    };

    const clearOnActivity = () => {
      clearTimeout(timeout);
      resetTimeout();
    };

    // Add event listeners for user activity
    document.addEventListener('mousemove', clearOnActivity);
    document.addEventListener('keydown', clearOnActivity);
    document.addEventListener('mousedown', clearOnActivity);
    document.addEventListener('touchstart', clearOnActivity);

    resetTimeout();

    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', clearOnActivity);
      document.removeEventListener('keydown', clearOnActivity);
      document.removeEventListener('mousedown', clearOnActivity);
      document.removeEventListener('touchstart', clearOnActivity);

      clearTimeout(timeout);
    };
  }, [timeoutInMinutes, onTimeout]);

  return null; // This component doesn't render anything
};

export default SessionTimeout;
