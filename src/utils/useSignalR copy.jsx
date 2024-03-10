import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  connStore,
  gameStore,
  myStateStore,
  playerStore,
  roomStore,
} from "./useStore";
import {
  roomPersistStore,
  playerPersistStore,
  gamePersistStore,
} from "./usePersistStore";
import { useEffect } from "react";

const useSignalR = () => {
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { gameState, updateGameState } = gameStore();
  const { playerState, updatePlayerState } = playerStore();
  const playerPersistState = playerPersistStore(
    (store) => store.playerPersistState
  );
  const roomPersistState = roomPersistStore((store) => store.roomPersistState);
  const updatePlayerPersistState = playerPersistStore(
    (store) => store.updatePlayerPersistState
  );
  const updateRoomPersistState = roomPersistStore(
    (store) => store.updateRoomPersistState
  );
  useEffect(() => {
    console.log("playerPersistState", playerPersistState);
    if (roomState.length > 0) {
      let updatedPlayerState =
        playerPersistState.length > 0 ? [...playerPersistState] : [];
      // updatedPlayerState = [{username:可拉, state:connect},...]
      // roomState = [{username:可拉, room:record01},...]
      //
      roomState.forEach(({ username }) => {
        const index = updatedPlayerState.findIndex(
          (player) => player.username === username
        );
        if (index !== -1) {
          updatedPlayerState[index].state = "connect";
        } else {
          updatedPlayerState.push({ username, state: "connect" });
        }
      });
      updatedPlayerState.forEach((playerState) => {
        const index = roomState.findIndex(
          (player) => player.username === playerState.username
        );
        if (index === -1) {
          playerState.state = "leave";
        }
      });
      // console.log("join, updatedPlayerState", updatedPlayerState);
      updatePlayerState(updatedPlayerState);
      updatePlayerPersistState(updatedPlayerState);
    }
  }, [roomState]);

  useEffect(() => {
    console.log("playerState", playerState);
  }, [playerState]);

  const joinRoom = async (userName, gameRoom) => {
    try {
      const newConn = new HubConnectionBuilder()
        .withUrl("https://localhost:7169/room")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      newConn.on("LeaveRoom", (connectedPlayers) => {
        const tempRoomState = Object.values(connectedPlayers);

        updateRoomState(tempRoomState);
        updateRoomPersistState(tempRoomState);
      });

      newConn.on("JoinRoom", (connectedPlayers) => {
        console.log("Conn on JoinRoom", playerState);
        const tempRoomState = Object.values(connectedPlayers);
        //  tempRoomState = [{"username": "大蔥", "gameRoom": "record01"}, {"username": "可拉","gameRoom": "record01"}]
        updateRoomState(tempRoomState);
        updateRoomPersistState(tempRoomState);
        // // gameState: {player:[{username: 可拉, role: 紅色守衛, state: connect | leave}, {username: 大蔥,...}]}
        // let updatedPlayerState = playerState.length > 0 ? [...playerState] : [];
        // tempRoomState.forEach(({ username }) => {
        //   const index = updatedPlayerState.findIndex(
        //     (player) => player.username === username
        //   );
        //   if (index !== -1) {
        //     updatedPlayerState[index].state = "connect";
        //   } else {
        //     updatedPlayerState.push({ username, state: "connect" });
        //   }
        // });
        // // console.log("join, updatedPlayerState", updatedPlayerState);
        // updatePlayerState(updatedPlayerState);
        // updatePlayerPersistState(updatedPlayerState);
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
  return { joinRoom };
};

export { useSignalR };
