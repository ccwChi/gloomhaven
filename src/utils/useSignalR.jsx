import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  connStore,
  gameStore,
  myStateStore,
  playerStore,
  roomStore,
} from "./useStore";
import { useEffect } from "react";

const useSignalR = () => {
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { gameState, updateGameState } = gameStore();
  const { playerState, updatePlayerState } = playerStore();

  const joinRoom = async (playerName, recordNum) => {
    try {
      const newConn = new HubConnectionBuilder()
        .withUrl("https://localhost:7169/room")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      newConn.on("LeaveRoom", (connectedPlayers) => {
        console.log("LeaveRoom, connectedPlayers", connectedPlayers);
      });

      newConn.on("JoinRoom", (connectedPlayers) => {
        console.log("JoinRoom, connectedPlayers", connectedPlayers);
      });

      newConn.on("SelectRole", (connectedPlayers) => {
        console.log("SelectRole, connectedPlayers", connectedPlayers);
      });

      await newConn.start();
      await newConn.invoke("JoinRoom", { playerName, recordNum });

      // 在用戶離開頁面時發送通知給伺服器
      window.addEventListener("beforeunload", function () {
        if (newConn) {
          newConn.invoke("LeaveRoom", { playerName, recordNum });
        }
      });
      updateConn(newConn);
    } catch (e) {
      console.log(e);
    }
  };

  const selectRole = (selectRole ) => {
    conn.invoke("selectRole", { selectRole });
  };

  return { joinRoom, selectRole };
};

export { useSignalR };
