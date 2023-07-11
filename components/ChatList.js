import { React, useState, useEffect } from "react";
const _ = require("lodash");
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ChatCard from "./ChatCard";
import "../styles/ChatList.css";
import data from "../dataset/Dataset";
import uniqBy from "lodash/uniqBy";
import Conversation from "./Conversation";
function ChatList() {
  const [chatData, setChatData] = useState([]);
  const [fullChatData, setFullChatData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserDP, setcurrentUserDP] = useState("");
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const handleCardClicked = (chat) => {
    setCurrentUser(chat.user);
    setcurrentUserDP(chat.pic);
    let filteredData = data.filter((chatData) => {
      return chatData.user === chat.user || chatData.messageTo === chat.user;
    });
    setConversation(filteredData);
    setMessage("");
  };

  const handleContactClicked = (chat) => {
    setCurrentUser(chat.user);
    setcurrentUserDP(chat.pic);
    let filteredData = data.filter((chatData) => {
      return chatData.user === chat.user || chatData.messageTo === chat.user;
    });
    setConversation(filteredData);
    setMessage("");
  };

  const getData = () => {
    const othersChatData = data.filter((chatData) => {
      return chatData.user !== "Self";
    });
    const uniqueData = uniqBy(othersChatData, (obj) => obj.user);
    setFullChatData(uniqueData);
  };

  const sendMessage = () => {
    if (!message) {
      alert("Please type something to send.");
      return;
    }
    let currentUserChat = data.filter((chatData) => {
      return (
        chatData.user === currentUser || chatData.messageTo === currentUser
      );
    });
    currentUserChat.push({
      messageTo: currentUser,
      user: "Self",
      message: message
    });
    setConversation(currentUserChat);
    setMessage("");
  };

  const handleInputChange = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      console.log("Enter clicked.");
    }
    setMessage(e.target.value);
  };

  const searchData = (e) => {
    let searchText = e.target.value;
    if (!searchText || !Array.isArray(fullChatData)) {
      setChatData(fullChatData);
      return;
    }

    let filteredData = fullChatData.find((chat) => chat.user === searchText);
    let searchData = [];
    let checkEmpty = _.isEmpty(filteredData);
    let checkNull = _.isNull(filteredData);
    if (!checkEmpty && !checkNull) {
      searchData.push(filteredData);
      setFullChatData(searchData);
    } else {
      getData();
    }
  };

  return (
    <div id="mainContainer">
      <div id="chatListContainer">
        <div id="searchContainer">
          <img
            className="chatListIcon"
            alt="SearchIcon"
            src="https://img.icons8.com/?size=512&id=12773&format=png"
          />
          <input
            id="searchBox"
            type="text"
            placeholder="Search for user"
            onChange={searchData}
          />
        </div>
        <div id="chatListHeaderContainer">
          CONVERSATIONS
          <Popup
            trigger={
              <img
                className="chatListIcon"
                alt="AddIcon"
                src="https://img.icons8.com/?size=512&id=24717&format=png"
              />
            }
          >
            {(close) => (
              <div className="modal">
                <div className="header"> Start a conversation </div>
                <div className="content">
                  {Array.isArray(fullChatData) &&
                    fullChatData.map((chat) => {
                      return (
                        <button
                          className="contactButton"
                          onClick={() => {
                            handleContactClicked(chat);
                            close();
                          }}
                        >
                          {chat.user}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </Popup>
        </div>
        {Array.isArray(chatData) &&
          fullChatData.map((chat) => {
            return (
              <div
                id="chatCardContainer"
                onClick={() => handleCardClicked(chat)}
              >
                <ChatCard
                  Username={chat.user}
                  ProfilePic={chat.pic}
                  Message={chat.message}
                  LastContactTime={chat.year}
                />
              </div>
            );
          })}
      </div>
      <div id="conversationContainer">
        <div id="chatHeaderContainer">
          {currentUserDP && (
            <img class="chatImage" alt="contactImage" src={currentUserDP} />
          )}
          <label>{currentUser}</label>
          <div id="contactOptionsContainer">
            <img
              className="chatListIcon"
              alt="SearchIcon"
              src="https://img.icons8.com/?size=512&id=9730&format=png"
            />
            <img
              className="chatListIcon"
              alt="SearchIcon"
              src="https://img.icons8.com/?size=512&id=11402&format=png"
            />
          </div>
        </div>
        <div id="convoContainer">
          <Conversation conversationData={conversation} />
        </div>
        <div id="typeContainer">
          <img
            className="chatListIcon"
            id="attachButton"
            alt="AttachmentIcon"
            src="https://img.icons8.com/?size=512&id=11322&format=png"
          />
          <input
            id="chatBox"
            type="text"
            placeholder="Type your message here"
            onChange={handleInputChange}
            value={message}
          />
          <img
            className="chatListIcon"
            alt="AttachmentIcon"
            src="https://img.icons8.com/?size=512&id=7874&format=png"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatList;
