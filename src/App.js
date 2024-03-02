import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useState } from "react";
import WaitingRoom from "./component/WaitingRoom";
import ChatRoom from "./component/ChatRoom";

const App = () => {
  const [conn, setConn] = useState();
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("https://signalr20240301064642.azurewebsites.net/chat")
        .withAutomaticReconnect() 
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinSpecificChatRoom", (userLevel, msg) => {
        console.log("JoinSpecificChatRoom msg: ",userLevel, msg);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        console.log("ReceiveSpecificMessage")
        setMessages((messages) => [...messages, { username, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });

      setConn(conn);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
      console.log("sendmessage")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <WaitingRoom joinChatRoom={joinChatRoom} />
      <ChatRoom messages={messages} sendMessage={sendMessage}/>
    </div>
  );
};

export default App;
