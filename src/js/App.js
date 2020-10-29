import React from "react";
import { ipcRenderer } from "electron";

export default function App() {
  const title = "S'up";
  const enhancedTitle = title + " - React App!";

  const sendNotification = () => {
    ipcRenderer.send("notify", "This is my custom message!");
  };

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
    </>
  );
}
