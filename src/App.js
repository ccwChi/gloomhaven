import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import HomeButton from "./component/CustomizeSidebar";
import { characters, record } from "./asset/data";
import {
  connStore,
  gameStore,
  monsterStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
  sidebarStore,
} from "./utils/useStore";
import {
  connLocalStore,
  gameLocalStore,
  monsterLocalStore,
  myStateLocalStore,
  playerLocalStore,
  roomLocalStore,
  sceneLocalStore,
} from "./utils/usePersistStore";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import HomePage from "./pages/HomePage";
import { Sidebar } from "primereact/sidebar";
import CustomizeSidebar from "./component/CustomizeSidebar";
import { TabView, TabPanel } from "primereact/tabview";
const App = () => {
  const { conn, updateConn } = connStore();
  const connLocal = connLocalStore((store) => store.connLocal);
  const updateConnLocal = connLocalStore((store) => store.updateConnLocal);

  // 用及記錄玩家自身情況，自己的技能卡，經驗，優劣勢卡片狀態
  const { myState, updateMyState } = myStateStore();
  const myStateLocal = myStateLocalStore((store) => store.myStateLocal);
  const updateMyStateLocal = myStateLocalStore(
    (store) => store.updateMyStateLocal
  );

  // 用來記錄目前房間中有那些人，如果有人斷線，或加入，則更新每個人的房間狀態
  const { roomState, updateRoomState } = roomStore();
  const roomStateLocal = roomLocalStore((store) => store.roomStateLocal);
  const updateRoomStateLocal = roomLocalStore(
    (store) => store.updateRoomStateLocal
  );

  // 用來記錄遊戲目前狀況，例如怪物的分布，遊戲的每輪狀態
  const { gameState, updateGameState } = gameStore();
  const gameStateLocal = gameLocalStore((store) => store.gameStateLocal);
  const updateGameStateLocal = gameLocalStore(
    (store) => store.updateGameStateLocal
  );

  // 用來記錄目前場景，每個場景當四個人都按OK的的話則前往下一個場景
  const { gameScene, updateGameScene } = sceneStore();
  const gameSceneLocal = sceneLocalStore((store) => store.gameSceneLocal);
  const updateGameSceneLocal = sceneLocalStore(
    (store) => store.updateGameSceneLocal
  );

  // 用來記錄每個玩家的狀態，哪個玩家選哪個腳色，...
  const { playerState, updatePlayerState } = playerStore();
  const playerStateLocal = playerLocalStore((store) => store.playerStateLocal);
  const updatePlayerStateLocal = playerLocalStore(
    (store) => store.updatePlayerStateLocal
  );

  // 用來紀錄目前怪物選擇清單，(簡易)
  const { mosterList, updateMonsterList } = monsterStore();
  const monsterListLocal = monsterLocalStore((store) => store.monsterListLocal);
  const updateMonsterListLocal = monsterLocalStore(
    (store) => store.updateMonsterListLocal
  );

  useEffect(() => {
    if (!!conn) {
      updateGameScene("scene1");
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
        updatePlayerState(connectedPlayers);
        updatePlayerStateLocal(connectedPlayers);
      });

      newConn.on("JoinRoom", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        updatePlayerStateLocal(connectedPlayers);
        // console.log("joinroom myState", myState);
      });

      newConn.on("SelectRole", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        updatePlayerStateLocal(connectedPlayers);
        console.log("SelectRole myState", myState);
      });

      newConn.on("ReadyChangeScene", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        updateGameState(connectedPlayers);
        updatePlayerStateLocal(connectedPlayers);
        updateGameStateLocal(connectedPlayers);
        // console.log("SelectRole myState", myState);
      });

      newConn.on("SendMonData", (monDataList) => {
        updateMonsterList(monDataList);
        updateMonsterListLocal(monDataList);
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
    <>
      {!conn && <HomePage joinRoom={joinRoom} />}
      {/* {<HomePage joinRoom={joinRoom} />} */}

      {conn && gameScene === "scene1" && <RoleSelectPage />}
      {/* {connLocal && gameSceneLocal === "scene1" && <RoleSelectPage />} */}

      {conn && gameScene === "scene2" && <EnemySelect />}
      {/* {connLocal && gameSceneLocal === "scene2" && <EnemySelect />} */}
    </>
  );
};

export default App;

const EnemySelect = () => {
  const { conn, updateConn } = connStore();
  const connLocal = connLocalStore((store) => store.connLocal);
  const updateConnLocal = connLocalStore((store) => store.updateConnLocal);

  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { playerState, updatePlayerState } = playerStore();
  const { gameState, updateGameState } = gameStore();
  const { gameScene, updateGameScene } = sceneStore();
  const { sidebarVisible, updateSidebarVisible } = sidebarStore();
  const { monsterList, updateMonsterList } = monsterStore();
  const [targetPointHP, setTargetPointHP] = useState(0);
  const [selectMon, setSelectMon] = useState("");
  const [selectMonList, setSelectMonList] = useState([]);

  useEffect(() => {
    if (monsterList.length > 0) {
      setSelectMonList(monsterList);
    }
  }, [monsterList]);

  const monsterSelectList = [
    { name: "目標點", code: "targetPoint", gate: 0 },
    { name: "黑色汙泥", code: "blackSludge", gate: 0 },
    { name: "黑色汙泥-菁英", code: "blackSludgeEX", gate: 0 },
    { name: "鼠類巨怪", code: "ratMonstrosity", gate: 0 },
    { name: "鼠類巨怪-菁英", code: "ratMonstrosityEX", gate: 0 },
    { name: "巨型蝰蛇", code: "giantViper", gate: 0 },
    { name: "巨型蝰蛇-菁英", code: "giantViperEX", gate: 0 },
    { name: "渾沌惡魔", code: "chaosDemon", gate: 0 },
    { name: "渾沌惡魔-菁英", code: "chaosDemonEX", gate: 0 },
  ];

  useEffect(() => {
    readyChangeScene(false);
  }, []);

  const readyChangeScene = (prepare) => {
    // connLocal.invoke("ReadyChangeScene", prepare);
    conn.invoke("ReadyChangeScene", prepare);
    // 這邊的prepare用true跟false
  };

  const SendMonData = async (monData) => {
    try {
      await conn.invoke("SendMonData", monData);
      console.log("SendMonData");
    } catch (error) {
      console.error("Error invoking SendMonData:", error);
      // 在這裡處理錯誤，例如顯示錯誤訊息給使用者或執行其他適當的操作
    }
  };

  return (
    <section
      className="w-full h-screen flex flex-col gap-8 p-4 items-center
        bg-[url('/src/asset/bg_img/bg-03.webp')] bg-cover bg-no-repeat bg-black ov"
    >
      <Button
        className="absolute top-3 right-3 size-6"
        icon="pi pi-bars"
        onClick={() => updateSidebarVisible(true)}
      />

      <CustomizeSidebar />
      <TabView
        className="bg-transparent w-full flex-1 overflow-y-hidden"
        pt={{
          // root: { className: "!bg-transparent" },
          // inkbar: { className: "bg-transparent" },
          nav: { className: "bg-transparent w-full" },
          // navContainer: { className: "" },
          // // navcontent: { className: "!bg-transparent" },
          header: { className: "w-full" },
          panelContainer: { className: "!bg-transparent" },
        }}
      >
        <TabPanel
          header="怪物資訊"
          className="w-full px-0"
          pt={{
            headerAction: {
              className: "bg-transparent justify-center border-none",
            },
            headertitle: { className: "text-xl" },
          }}
        >
          <div className="w-full flex flex-col gap-8 items-center overflow-hidden">
            <div className="w-full overflow-y-scroll flex flex-col gap-y-2 items-center">
              <div className="inline-flex w-full gap-x-2 px-1">
                <div
                  className="bg-black px-4 bg-opacity-60 p-3 rounded-md w-fit text-center font-bold text-white"
                  onClick={() => {
                    console.log("myState", myState);
                    console.log("playerState", playerState);
                    console.log("gameState", gameState);
                    console.log("selectMon", selectMon);
                    console.log("selectMonList", selectMonList);
                    console.log("monsterList", monsterList);
                  }}
                >
                  怪物
                </div>
                <Dropdown
                  value={selectMon}
                  onChange={(e) => {
                    setSelectMon(e.value);
                  }}
                  options={monsterSelectList}
                  optionLabel="name"
                  placeholder="選項"
                  className="flex-1 opacity-90"
                />
                <Button
                  icon="pi pi-plus"
                  className=""
                  disabled={selectMon === ""}
                  onClick={() => {
                    setSelectMonList((prev) => [...prev, selectMon]);
                  }}
                />
              </div>
              <div className="inline-flex w-full gap-x-2 px-1">
                <div className="bg-black bg-opacity-60 flex-1 p-3 rounded-md w-full text-center font-bold text-white ">
                  添加一道門
                </div>
                <Button
                  icon="pi pi-plus"
                  className=""
                  onClick={() => {
                    setSelectMonList((prev) => [
                      ...prev,
                      { name: "門", code: "" },
                    ]);
                  }}
                />
              </div>
              <div
                className={`w-full flex flex-col bg-slate-400 gap-y-3 ${
                  selectMonList.length > 0 && "p-3"
                } bg-opacity-60 rounded-lg`}
              >
                {selectMonList.map((mon, index) => (
                  <div
                    className="inline-flex gap-x-2 w-full"
                    key={"monsterList" + index}
                  >
                    <div
                      className={`${
                        mon.name === "門" && "bg-amber-800 bg-opacity-85"
                      } w-full bg-white text-black font-black font-mono text-xl bg-opacity-25 rounded-lg flex justify-center items-center`}
                    >
                      {mon.name !== "門"
                        ? mon.name + "-" + (index + 1)
                        : mon.name}
                    </div>
                    <Button
                      icon="pi pi-minus"
                      className=""
                      onClick={() => {
                        const newList = [...selectMonList];
                        const tempList = newList.splice(index, 1);
                        console.log("tempList", tempList);
                        console.log("selectMonList", newList);
                        setSelectMonList(newList);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=" py-3 flex w-2/3 gap-2 flex-col  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
              <InputNumber
                label={"如有目標點，請輸入目標點HP"}
                value={targetPointHP}
                onValueChange={(e) => setTargetPointHP(e.value)}
                useGrouping={false}
              />
              <Button
                label="確認"
                icon="pi pi-check"
                iconPos="right"
                raised
                onClick={() => {
                  let gateCount = 0; // 門計數從 -1 開始
                  const newData = selectMonList.map((item) => {
                    if (item.name === "門") {
                      gateCount++; // 遇到門時，門計數加一
                    }
                    return { ...item, gate: gateCount };
                  });
                  SendMonData(newData);
                }}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel
          className="w-full px-0"
          header="個人技能卡"
          pt={{
            headerAction: {
              className: "bg-transparent justify-center border-none activeL",
            },
            headertitle: { className: "text-xl" },
          }}
        >
          <div>畫面二'</div>
        </TabPanel>
        <TabPanel
          className="w-full px-0"
          header="角色補正卡"
          pt={{
            headerAction: {
              className: "bg-transparent justify-center border-none activeL",
            },
            headertitle: { className: "text-xl" },
          }}
        >
          <div>畫面三</div>
        </TabPanel>
      </TabView>
      <div className=" py-3 flex w-2/3 gap-2 flex-col  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
        <Button
          label="確認"
          icon="pi pi-check"
          iconPos="right"
          raised
          onClick={() => {
            let gateCount = 0; // 門計數從 -1 開始
            const newData = selectMonList.map((item) => {
              if (item.name === "門") {
                gateCount++; // 遇到門時，門計數加一
              }
              return { ...item, gate: gateCount };
            });
            SendMonData(newData);
          }}
        />
      </div>
    </section>
  );
};

const RoleSelectPage = ({ setDemoConn, setDemoScene, demoConn, demoScene }) => {
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { playerState, updatePlayerState } = playerStore();
  const { gameState, updateGameState } = gameStore();
  const { gameScene, updateGameScene } = sceneStore();

  const characters = [
    { name: "赤色守衛", value: "RG", color: "danger" },
    { name: "石晶爆破手", value: "DE", color: "warning" },
    { name: "虛空守望者", value: "VW", color: "secondary" },
    { name: "鋼角飛斧手", value: "HA", color: "info" },
  ];

  useEffect(() => {
    const tempPlayerState = [...Object.values(playerState)];
    // console.log("tempPlayerState", tempPlayerState);
    // console.log("myState", myState);
    const checkedNum = tempPlayerState.filter(
      (i) => i.changeScene === true
    ).length;
    if (checkedNum > 0 && checkedNum === tempPlayerState.length) {
      // console.log(checkedNum);
      updateGameScene("scene2");
      const newMyStateObj = record
        .map((rc) => {
          const newMyState = tempPlayerState.find(
            (player) => player.playerName === myState.player
          );
          if (newMyState) {
            return rc.roleData.find(
              (roledata) => roledata.role === newMyState.selectRole
            );
          }
          return null;
        })
        .filter(Boolean); // 過濾掉為 null 的結果

      if (newMyStateObj.length > 0) {
        newMyStateObj[0]["player"] = myState.player;
        updateMyState(newMyStateObj[0]);
      }
    }
  }, [gameState]);

  const selectRole = (selectRole) => {
    conn.invoke("SelectRole", selectRole);
  };

  const readyChangeScene = (prepare) => {
    conn.invoke("ReadyChangeScene", prepare);
    // 這邊的prepare用true跟false
  };

  return (
    <section
      className="w-full h-screen flex flex-col gap-8 p-4  items-center
        bg-[url('/src/asset/bg_img/bg-03.webp')] bg-cover bg-no-repeat bg-black ov"
    >
      <div className="flex flex-1 flex-col gap-y-2 items-center">
        <div
          className="bg-black bg-opacity-30 p-3 rounded-md w-fit text-center font-bold text-white"
          onClick={() => {
            console.log("conn", conn);
            console.log("myState", myState);
            console.log("gameState", gameState);
            console.log("roomState", roomState);
            console.log("playerState", playerState);
            console.log("gameScene", gameScene);
          }}
        >
          請選擇你要操作的角色
        </div>
        <div className="flex flex-col gap-y-2">
          {characters.map((char, i) => {
            const roleIsSelected = Object.values(playerState).some(
              (player) => player.selectRole === char.name
            );
            const playerIsSelect = Object.values(playerState).some(
              (player) =>
                player.playerName === myState.player && player.selectRole !== ""
            );
            // console.log(playerIsSelect)
            // console.log("charname", char.name, "isSelected", roleIsSelected);
            return (
              <Button
                key={"character" + i}
                label={char.name}
                severity={char.color}
                className={`w-60 ${roleIsSelected && "hidden"}`}
                disabled={playerIsSelect}
                onClick={() => {
                  console.log(char.name);
                  selectRole(char.name);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-black bg-opacity-70 px-6 w-full rounded-lg text-center relative gap-y-2">
        <p className="text-white my-4">已選擇角色</p>
        <div className="flex flex-col flex-1w-full h-full gap-2 ">
          {characters.map((char, i) => {
            const roleIsSelected = Object.values(playerState).some(
              (player) => player.selectRole === char.name
            );

            const [buttonInfo] = Object.values(playerState).filter(
              (i) => i.selectRole === char.name
            );
            // console.log("buttonName", Object.values(playerState));
            return (
              <Button
                label={
                  buttonInfo &&
                  buttonInfo.selectRole + " - " + buttonInfo.playerName
                }
                severity={char.color}
                key={"selectedRole" + i}
                className={`${!roleIsSelected && "hidden"}`}
                onClick={(e) => e.preventDefault()}
              />
            );
          })}
        </div>
        <div className=" pb-3 flex  flex-1 gap-4  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
          <Button
            onClick={() => {
              selectRole("");
            }}
            className="flex-1"
            label="重選角色"
          />
          <Button
            disabled={Object.values(playerState).some(
              (i) => i.playerName === myState.player && i.selectRole === ""
            )}
            className="flex-1"
            label="確認"
            onClick={() => {
              readyChangeScene(true);
            }}
          />
        </div>
      </div>
    </section>
  );
};
