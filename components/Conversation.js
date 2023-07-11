import React, { useState, useEffect } from "react";
import "../styles/Conversation.css";
function Converstion(props) {
  const [conversationData, setConversationData] = useState([]);
  useEffect(() => {
    setConversationData(props.conversationData);
  }, []);
  return (
    <div id="convoContainer">
      {Array.isArray(props.conversationData) &&
        props.conversationData.map((chat) => {
          return (
            <div className={chat.user === "Self" ? "myChat" : "contactChat"}>
              <label>{chat.message}</label>
            </div>
          );
        })}
    </div>
  );
}

export default Converstion;
