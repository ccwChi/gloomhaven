import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { record } from "../../asset/data";
import {
  connStore,
  gameStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
  scriptLevelStore,
} from "../../utils/useStore";
import { useLocalStorage, useSessionStorage } from "primereact/hooks";

const SelectRole = () => {
  const { conn, updateConn } = connStore();
  // const [conn, setConn] = useSessionStorage(null, "conn");
  const [myStateSession, setMyStateSession] = useSessionStorage(
    null,
    "MyState"
  );
  const { scriptLevel, updateScriptLevel } = scriptLevelStore();
  const [fullGameRecord, setFullGameRecord] = useLocalStorage(
    {
      myState: {},
      scene: "",
      monSelect: [],
      prevTurn: {},
      currentTurnState: {
        mySkillSpeed: "",
        monsterState: [],
        playersState: [],
      },
    },
    "FullGameRecord"
  );
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

  // 如果大家都按了前往下一關，則切換scene
  useEffect(() => {
    const tempPlayerState = [...Object.values(playerState)];
    const checkedNum = tempPlayerState.filter(
      (i) => i.changeScene === true
    ).length;
    if (checkedNum > 0 && checkedNum === tempPlayerState.length) {
      // console.log(checkedNum);
      updateGameScene("scene2");
      setFullGameRecord({ ...fullGameRecord, scene: "scene2" });
      const [newMyStateObj] = record
        .map((rc) => {
          const newMyState = tempPlayerState.find(
            (player) => player.playerName === myState.player
          );
          if (newMyState) {
            return rc.roleData[newMyState.selectRole];
          }
          return null;
        })
        .filter(Boolean); // 過濾掉為 null 的結果
      if (newMyStateObj) {
        newMyStateObj["player"] = myState.player
        setMyStateSession(newMyStateObj);
        updateMyState(newMyStateObj);
      }
    }
  }, [playerState]);

  useEffect(() => {
    calculateStageLevel(record);
    function calculateStageLevel(record) {
      const totalLevel = Object.values(record[0].roleData).reduce(
        (acc, role) => acc + role.level,
        0
      );
      const averageLevel = Math.ceil(totalLevel / record[0].roleData.length);
      updateScriptLevel(averageLevel);
    }
  }, []);

  const selectRole = (selectRole) => {
    conn.invoke("SelectRole", selectRole);
    setMyStateSession({ ...myState, selectRole: selectRole });
    updateMyState({ ...myState, selectRole: selectRole });
  };

  const readyChangeScene = (prepare) => {
    conn.invoke("ReadyChangeScene", prepare);
    // 這邊的prepare用true跟false
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-y-2 items-center">
        <div
          className="bg-black bg-opacity-30 p-3 rounded-md w-fit text-center font-bold text-white"
          onClick={() => {
            // console.log("conn", conn);
            console.log("myState", myState);
            // console.log("gameState", gameState);
            console.log("roomState", roomState);
            console.log("playerState", playerState);
            console.log("gameScene", gameScene);
          }}
        >
          請選擇你要操作的角色
        </div>
        <div className="flex flex-col gap-y-2">
          {characters.map((char, i) => {
            // console.log('Object.values(playerState)',Object.values(playerState))
            const roleIsSelected = Object.values(playerState).some(
              (player) => player.selectRole === char.value
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
                  console.log(char.name, char.value);
                  selectRole(char.value);
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
              (player) => player.selectRole === char.value
            );

            const [buttonInfo] = Object.values(playerState).filter(
              (i) => i.selectRole === char.value
            );
            if (buttonInfo) {
              buttonInfo["roleName"] = char.name;
            }
            // console.log("buttonName", Object.values(playerState));
            return (
              <Button
                label={
                  buttonInfo &&
                  buttonInfo.roleName + " - " + buttonInfo.playerName
                }
                severity={char.color}
                key={"selectedRole" + i}
                className={`${!roleIsSelected && "hidden"}`}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(buttonInfo);
                }}
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
    </>
  );
};

export default SelectRole;
