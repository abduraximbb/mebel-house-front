import React from "react";

export default function useOnlineStatus() {
  const [online, setOnline] = React.useState(navigator.onLine);
  React.useEffect(() => {
    function updateOnlineStatus() {
      setOnline(navigator.onLine);
    }
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    // cleanup function - 
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
  return online;
}
