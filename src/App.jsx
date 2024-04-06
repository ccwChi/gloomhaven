import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import {
  actionableWithMonSkillStore,
  askSynchronizeStore,
  battleRecordStore,
  connStore,
  monsterStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
  synchronizeDataStore,
  tempAreaOpenStore,
  tempMonDataStore,
  tempPlayerDataStore,
  tempPlayerDataWithSpStore,
} from "./utils/useStore";

import { useLocalStorage } from "primereact/hooks";
import SelectMonAndSkill from "./pages/SelectMonAndSkill/SelectMonAndSkill";
import SelectRole from "./pages/SelectRole/SelectRole";
import Home from "./pages/Home/Home";
import Battle from "./pages/Battle/Battle";
import CustomizeSidebar from "./component/CustomizeSidebar";
import LoadingBulbasaur from "./component/Loading/LoadingBulbasaur";

const App = () => {
  const { conn, updateConn } = connStore();

  // 用來記錄目前房間中有那些人，如果有人斷線，或加入，則更新每個人的房間狀態
  const { roomState, updateRoomState } = roomStore();

  // 用來記錄目前場景，每個場景當四個人都按OK的的話則前往下一個場景

  const { gameScene, updateGameScene } = sceneStore();
  const [scene, setScene] = useLocalStorage("", "Scene");

  // 用來記錄每個玩家的狀態，哪個玩家選哪個腳色，...
  const { playerState, updatePlayerState } = playerStore();
  const { myState, updateMyState } = myStateStore();

  // 用來紀錄目前怪物選擇清單，(簡易)
  const { updateMonsterList } = monsterStore();
  const { askSynchronize, updateAskSynchronize } = askSynchronizeStore();
  const { updateTempMonData } = tempMonDataStore();
  const { updateTempPlayerData } = tempPlayerDataStore();
  const { updateTempPlayerDataWithSp } = tempPlayerDataWithSpStore();
  const { updateTempAreaOpen } = tempAreaOpenStore();
  const { updateActionableWithMonSkill } = actionableWithMonSkillStore();
  const { battleRecord, updateBattleRecord } = battleRecordStore();
  const { synchronizeData, updateSynchronizeData } = synchronizeDataStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // 同時按下了 Ctrl +C 键，清除 session/localStorage
      if (event.key === "c" && event.ctrlKey) {
        sessionStorage.clear();
        localStorage.clear();
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
        // console.log("joinroom myState", connectedPlayers);
      });

      newConn.on("JoinRoom", (connectedPlayers) => {
        updateRoomState(connectedPlayers);
        updatePlayerState(connectedPlayers);
        // console.log("joinroom myState", connectedPlayers);
      });

      newConn.on("SelectRole", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        // console.log("updatePlayerState", connectedPlayers);
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
      newConn.on("SharedDbCleared", (content) => {
        console.log(content);
        // console.log("battleRecord", battleRecord);
      });
      newConn.on("AskSynchronize", (content) => {
        updateAskSynchronize(content);
        console.log("AskSynchronize", content);
      });
      newConn.on("Synchronize", (SynchronizeData) => {
        updateSynchronizeData(SynchronizeData);
        console.log("Synchronize", SynchronizeData);
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
  useEffect(() => {
    if (!!synchronizeData && scene === "scene3") {
      updateBattleRecord(synchronizeData);
    }
  }, [synchronizeData]);

  return (
    <section
      className={`w-full h-screen flex items-center  justify-center overflow-hidden bg-[url('/src/asset/img/bg-04.webp')]
      ${
        conn && "!bg-[url('/src/asset/img/bg-03.webp')]"
      } bg-cover bg-no-repeat`}

    >
      <div className="h-full flex flex-col p-4 relative gap-4 sm:max-w-[400px] max-w-[500px] min-w-[400px] w-full sm:bg-black sm:bg-opacity-30 items-center">
        {isLoading && <LoadingBulbasaur />}
        <CustomizeSidebar />
        {!conn && (
          <Home
            joinRoom={joinRoom}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}
        {/* <Loading /> */}
        {conn && gameScene === "scene1" && <SelectRole />}

        {conn && gameScene === "scene2" && <SelectMonAndSkill />}

        {conn &&
          (gameScene === "scene3" || gameScene === "reloadScene3") &&
          battleRecord && <Battle />}
      </div>
    </section>
  );
};
export default App;
