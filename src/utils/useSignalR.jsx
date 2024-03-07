import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { connStore } from "./connnectStore";

const useSignalR = () => {
  const {
    conn,
    setConn,
    roomPlayers,
    setRoomPlayers,
    playerState,
    setPlayerState,
  } = connStore();

  const joinRoom = async (userName, gameRoom) => {
    try {
      const newConn = new HubConnectionBuilder()
        .withUrl("https://localhost:7169/room")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      /**
       *  JoinRoom 應該要回傳房間內有那些人
       *  格式為[username:"可拉", gameRoom:"recordId"]
       */
      newConn.on("JoinRoom", (connectedPlayers) => {
        console.log("JoinRoom msg: ", connectedPlayers);
        setRoomPlayers(Object.values(connectedPlayers));
      });

      newConn.on("LeaveRoom", (msg, connectedPlayers) => {
        console.log("someone leave", msg);
        setRoomPlayers(Object.values(connectedPlayers));
      });

      newConn.on("SelectRole", (username, select) => {
        console.log(username, select);
        setPlayerState({ player: username, role: select });
      });

      await newConn.start();
      await newConn.invoke("JoinRoom", { userName, gameRoom });

      // 在用戶離開頁面時發送通知給伺服器
      window.addEventListener("beforeunload", function () {
        if (newConn) {
          newConn.invoke("LeaveRoom", { userName, gameRoom });
        }
      });
      console.log(newConn);
      setConn(newConn);
    } catch (e) {
      console.log(e);
    }
  };

  const selectRole = async (select) => {
    try {
      await conn.invoke("SelectRole", select);
      console.log("invokeSelectRole", select)
    } catch (e) {
      console.log(e);
    }
  };

  return { joinRoom, selectRole };
};

export { useSignalR };
