import { React, useEffect } from "react";
import "../styles/ChatCard.css";
function ChatCard(props) {
  useEffect(() => {}, []);
  let { Username, ProfilePic, Message, LastContactTime } = props;
  return (
    <div id="contactCardContainer">
      <img id="contactImage" alt="contactImage" src={ProfilePic} />
      <div id="chatContainer">
        <h5>{Username}</h5>
        <label>{Message}</label>
      </div>
      <label id="lastContactTime">{LastContactTime}</label>
    </div>
  );
}

export default ChatCard;
