import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import {
  actionableWithMonSkillStore,
  battleRecordStore,
  connStore,
  gameStore,
  monsterStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
  sidebarStore,
  tempAreaOpenStore,
  tempMonDataStore,
  tempPlayerDataStore,
  tempPlayerDataWithSpStore,
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
import LoadingBulbasaur from "./component/Loading/LoadingBulbasaur";
import LoadingDots from "./component/Loading/LoadingDots";
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

  const { tempMonData, updateTempMonData } = tempMonDataStore();
  const { tempPlayerData, updateTempPlayerData } = tempPlayerDataStore();
  const { tempPlayerDataWithSp, updateTempPlayerDataWithSp } =
    tempPlayerDataWithSpStore();
  const { tempAreaOpen, updateTempAreaOpen } = tempAreaOpenStore();
  const { actionableWithMonSkill, updateActionableWithMonSkill } =
    actionableWithMonSkillStore();

  const [isLoading, setIsLoading] = useState(false);

  const { battleRecord, updateBattleRecord } = battleRecordStore();

  useEffect(() => {
    const handleKeyPress = (event) => {
      // 同時按下了 Ctrl +C 键，清除 session
      if (event.key === "c" && event.ctrlKey) {
        sessionStorage.clear(); // 清除 session
        localStorage.clear(); // 清除 localStorage
        // alert("Session 已清除");
      }
    };
    // 添加键盘事件监听器
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (conn && roomState) {
      updateGameScene("scene1");
    } else if (!roomState) {
      updateGameScene("");
    }
  }, [conn]);

  const joinRoom = async (playerName, recordNum) => {
    try {
      const newConn = new HubConnectionBuilder()
        // .withUrl("https://localhost:7169/room")
        .withUrl("https://gloomhaven.azurewebsites.net/room")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      newConn.on("LeaveRoom", (connectedPlayers) => {
        updateRoomState(connectedPlayers);
        updatePlayerState(connectedPlayers);
        console.log("joinroom myState", connectedPlayers);
      });

      newConn.on("JoinRoom", (connectedPlayers) => {
        updateRoomState(connectedPlayers);
        updatePlayerState(connectedPlayers);
        console.log("joinroom myState", connectedPlayers);
      });

      newConn.on("SelectRole", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        console.log("updatePlayerState", connectedPlayers);
      });

      newConn.on("ReadyChangeScene", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        // console.log("updatePlayerState", connectedPlayers);
      });

      newConn.on("SendMonData", (monDataList) => {
        updateMonsterList(monDataList);
        // updateMonsterListLocal(monDataList);
        // console.log("monDataList", monDataList);
      });
      newConn.on("SendCurrentMonState", (currentMonState) => {
        updateTempMonData(currentMonState);
        // console.log("currentMonState", currentMonState);
        // console.log("battleRecord", battleRecord);
      });
      newConn.on("SendCurrentPlayerState", (currentPlayerState) => {
        updateTempPlayerData(currentPlayerState);
        // console.log("currentPlayerState", currentPlayerState);
        // console.log("battleRecord", battleRecord);
      });

      newConn.on("SendPlayerStateWithNextSp", (currentPlayerState) => {
        updateTempPlayerDataWithSp(currentPlayerState);
        // console.log("currentPlayerState", currentPlayerState);
        // console.log("battleRecord", battleRecord);
      });

      newConn.on("SendOpenArea", (openArea) => {
        updateTempAreaOpen(openArea);
        // console.log("openArea", openArea);
        // console.log("battleRecord", battleRecord);
      });

      newConn.on("SendWithSkillCardActionableList", (ActionableList) => {
        updateActionableWithMonSkill(ActionableList);
        // console.log("openArea", openArea);
        // console.log("battleRecord", battleRecord);
      });

      await newConn.start();
      await newConn.invoke("JoinRoom", { playerName, recordNum });

      // 在用戶離開頁面時發送通知給伺服器
      window.addEventListener("beforeunload", function () {
        if (newConn) {
          newConn.invoke("LeaveRoom", { playerName, recordNum });
        }
      });
      if (newConn) {
        updateConn(newConn);
        setIsLoading(false);
      }
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
      } bg-cover bg-no-repeat `}
    >
      
      {isLoading && <LoadingBulbasaur />}
      <CustomizeSidebar />
      {!conn && <Home joinRoom={joinRoom} setIsLoading={setIsLoading} />}
      {/* <Loading /> */}
      {conn && gameScene === "scene1" && <SelectRole />}

      {conn && gameScene === "scene2" && <SelectMonAndSkill />}

      {conn && gameScene === "scene3" && <Battle />}
    </section>
  );
};
export default App;
