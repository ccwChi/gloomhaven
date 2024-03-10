import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import WaitingRoom from "./component/WaitingRoom";
import ChatRoom from "./component/ChatRoom";
import HomeButton from "./component/HomeButton";
import { characters } from "./asset/data";
import WaitingRoomA from "./component/WaitingRoomA";

const App = () => {
  const [conn, updateConn] = useState();
  const [messages, setMessages] = useState([]);
  const [roomMember, setRoomMember] = useState([]);

  useEffect(() => {
    console.log(roomMember);
  }, [roomMember]);

  const joinRoom = async (userName, gameRoom) => {
    try {
      const newConn = new HubConnectionBuilder()
        .withUrl("https://localhost:7169/room")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      newConn.on("JoinRoom", (msg, connectedPlayers) => {
        console.log("JoinRoom msg: ", msg, connectedPlayers);
        setRoomMember(Object.values(connectedPlayers));
      });

      newConn.on("ReceiveSpecificMessage", (userName, msg) => {
        console.log("ReceiveSpecificMessage");
        setMessages((messages) => [...messages, { userName, msg }]);
      });

      newConn.on("LeaveRoom", (msg, connectedPlayers) => {
        console.log("someone leave", msg);
        setRoomMember(Object.values(connectedPlayers));
      });

      newConn.onreconnected(() => {
        console.log("Reconnected");
        // 可能需要重新加入房间或执行其他必要的任务
        newConn.invoke("JoinRoom", { userName, gameRoom });
      });

      await newConn.start();
      await newConn.invoke("JoinRoom", { userName, gameRoom });

      // 在用戶離開頁面時發送通知給伺服器
      window.addEventListener("beforeunload", function () {
        if (newConn) {
          newConn.invoke("LeaveRoom", { userName, gameRoom });
        }
      });

      updateConn(newConn);
    } catch (e) {
      console.log(e);
    }
  };

  // // 在页面加载时尝试重新连接
  // useEffect(() => {
  //   joinRoom(); // 或者传递用户名和游戏房间参数
  // }, []);

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
      console.log("sendmessage");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(roomMember);
  }, [roomMember]);
  return (
    <div>
      {conn ? (
        <>
          <WaitingRoom roomMember={roomMember} />
        </>
      ) : (
        <>
          <div
            className="w-full h-screen flex flex-col justify-center items-center gap-8 
          bg-[url('/src/asset/BG/cover-2.jpeg')] bg-cover sm:bg-center bg-[-450px] bg-blend-screen bg-no-repeat bg-black"
          >
            {characters.map((char, i) => (
              <React.Fragment key={i}>
                <HomeButton
                  disabled={roomMember.some(
                    (role) => role.username === char.name
                  )}
                  username={char.player}
                  roleName={char.name}
                  style={char.style}
                  joinChatRoom={joinRoom}
                />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
