import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import {
  battleRecordStore,
  connStore,
  gameStore,
  monsterStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
  sidebarStore,
} from "./utils/useStore";
// import {
//   connLocalStore,
//   gameLocalStore,
//   monsterLocalStore,
//   myStateLocalStore,
//   playerLocalStore,
//   roomLocalStore,
//   sceneLocalStore,
// } from "./utils/usePersistStore";
import { useLocalStorage, useSessionStorage } from "primereact/hooks";
import SelectMonAndSkill from "./pages/SelectMonAndSkill/SelectMonAndSkill";
import SelectRole from "./pages/SelectRole/SelectRole";
import Home from "./pages/Home/Home";
import Battle from "./pages/Battle/Battle";
import { Button } from "primereact/button";
import CustomizeSidebar from "./component/CustomizeSidebar";
import Loading from "./pages/Loading/Loading";
const App = () => {
  const { conn, updateConn } = connStore();
  // const [conn, setConn] = useSessionStorage(null, "conn");
  // 用及記錄玩家自身情況，自己的技能卡，經驗，優劣勢卡片狀態
  const { myState, updateMyState } = myStateStore();
  const [myStateSession, setMyStateSession] = useSessionStorage(
    null,
    "MyState"
  );

  // 用來記錄目前房間中有那些人，如果有人斷線，或加入，則更新每個人的房間狀態
  const { roomState, updateRoomState } = roomStore();

  // 用來記錄遊戲目前狀況，例如怪物的分布，遊戲的每輪狀態
  const { gameState, updateGameState } = gameStore();

  // 用來記錄目前場景，每個場景當四個人都按OK的的話則前往下一個場景
  const { gameScene, updateGameScene } = sceneStore();

  // 用來記錄每個玩家的狀態，哪個玩家選哪個腳色，...
  const { playerState, updatePlayerState } = playerStore();

  // 用來紀錄目前怪物選擇清單，(簡易)
  const { mosterList, updateMonsterList } = monsterStore();
  const { sidebarVisible, updateSidebarVisible } = sidebarStore();
  const { battleRecord, updateBattleRecord } = battleRecordStore();
  const [fullGameRecord, setFullGameRecord] = useLocalStorage(
    {
      myState: {},
      scene: "",
      monSelect: [],
      battleInitState: {
        monsterState: [],
        playersState: [],
      },
      prevTurn: {},
      currentTurnState: {
        mySkillSpeed: "",
        monsterState: [],
        playersState: [],
      },
    },
    "FullGameRecord"
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      // 如果按下的是特定按键，例如 "C" 键，并且同时按下了 Ctrl 键，则执行清除 session 的操作
      if (event.key === "c" && event.ctrlKey) {
        sessionStorage.clear(); // 清除 session
        localStorage.clear(); // 清除 session
        // alert("Session 已清除");
      }
    };
    // 添加键盘事件监听器
    window.addEventListener("keydown", handleKeyPress);
    // 清除副作用
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // 仅在组件挂载和卸载时执行

  useEffect(() => {
    if (conn && roomState) {
      updateGameScene("scene3");
      setFullGameRecord({ ...fullGameRecord, scene: "scene1" });
    } else if (!roomState) {
      updateGameScene("");
      setFullGameRecord({ ...fullGameRecord, scene: "" });
    }
  }, [conn]);

  const joinRoom = async (playerName, recordNum) => {
    try {
      const newConn = new HubConnectionBuilder()
        .withUrl("https://localhost:7169/room")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      newConn.on("LeaveRoom", (connectedPlayers) => {
        updateRoomState(connectedPlayers);
        updatePlayerState(connectedPlayers);
        // updatePlayerStateLocal(connectedPlayers);
      });

      newConn.on("JoinRoom", (connectedPlayers) => {
        updateRoomState(connectedPlayers);
        updatePlayerState(connectedPlayers);
        // updatePlayerStateLocal(connectedPlayers);
        // console.log("joinroom myState", myState);
      });

      newConn.on("SelectRole", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        // updatePlayerStateLocal(connectedPlayers);
        // console.log("SelectRole myState", myState);
      });

      newConn.on("ReadyChangeScene", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        // updateGameState(connectedPlayers);
        // updatePlayerStateLocal(connectedPlayers);
        // updateGameStateLocal(connectedPlayers);
        // console.log("SelectRole myState", myState);
      });

      newConn.on("SendMonData", (monDataList) => {
        updateMonsterList(monDataList);
        // updateMonsterListLocal(monDataList);
        // console.log("monDataList", monDataList);
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

  return (
    <section
      className={`w-full h-screen flex flex-col gap-4 p-4 items-center relative
      ${
        conn
          ? "bg-[url('/src/asset/img/bg-03.webp')]"
          : "bg-[url('/src/asset/img/bg-04.webp')]"
      } bg-cover bg-no-repeat bg-black`}
    >
      {conn && (
        <Button
          className="absolute bottom-3 right-3 size-6 "
          icon="pi pi-bars"
          onClick={() => updateSidebarVisible(true)}
        />
      )}

      <CustomizeSidebar />
      {!conn && <Home joinRoom={joinRoom} />}
        {/* <Loading /> */}
      {conn && gameScene === "scene1" && <SelectRole />}

      {conn && gameScene === "scene2" && <SelectMonAndSkill />}

      {conn && gameScene === "scene3" && <Battle />}
    </section>
  );
};
export default App;
