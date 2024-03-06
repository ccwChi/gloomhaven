import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { connStore } from "./connnectStore";

const useSignalR = () => {
  const { conn, setConn, roomPlayers, setRoomMember } = connStore();

  const joinRoom = async (userName, gameRoom) => {
    try {
      const newConn = new HubConnectionBuilder()
        .withUrl("https://localhost:7169/room")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      // 其他的 signalR 相關設定和事件處理器...

      await newConn.start();
      await newConn.invoke("JoinRoom", { userName, gameRoom });

      // 在用戶離開頁面時發送通知給伺服器
      window.addEventListener("beforeunload", function () {
        if (newConn) {
          newConn.invoke("LeaveRoom", { userName, gameRoom });
        }
      });
      console.log(newConn)
      setConn(newConn);
    } catch (e) {
      console.log(e);
    }
  };

  return { joinRoom };
};

export {useSignalR};
