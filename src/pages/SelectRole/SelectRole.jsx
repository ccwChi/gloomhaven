import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { record } from "../../asset/data";
import {
  connStore,
  myStateStore,
  playerStore,
  sceneStore,
  scriptLevelStore,
} from "../../utils/useStore";
import LoadingDots from "../../component/Loading/LoadingDots";

const SelectRole = () => {
  const [toNextSceneCheck, setToNextSceneCheck] = useState(false);
  const { conn } = connStore();
  const { updateScriptLevel } = scriptLevelStore();
  const { myState, updateMyState } = myStateStore();
  const { playerState } = playerStore();
  const { updateGameScene } = sceneStore();

  const characters = [...Object.values(record[0].roleData)];

  // 如果大家都按了前往下一關，則切換scene
  useEffect(() => {
    const tempPlayerState = [...Object.values(playerState)];
    const checkedNum = tempPlayerState.filter(
      (i) => i.changeScene === true
    ).length;
    if (checkedNum > 0 && checkedNum === tempPlayerState.length) {
      updateGameScene("scene2");
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
        newMyStateObj["player"] = myState.player;
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

  const selectRole = (selectRole, roleHp, order) => {
    conn.invoke("SelectRole", selectRole, roleHp, order);
    updateMyState({ ...myState, selectRole: selectRole });
  };

  useEffect(() => {
    if (toNextSceneCheck) {
      conn.invoke("ReadyChangeScene", true, 0);
    }
  }, [toNextSceneCheck]);

  // const readyChangeScene = (prepare) => {

  //   // 這邊的prepare用true跟false
  // };

  return (
    <>
      <div className="flex flex-1 flex-col gap-y-2 items-center">
        <div className="bg-black bg-opacity-30 p-3 rounded-md w-fit text-center font-bold text-white">
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

            return (
              <Button
                key={"character" + i}
                label={char.name}
                severity={char.color}
                className={`w-60 ${roleIsSelected && "hidden"} `}
                disabled={playerIsSelect}
                onClick={() => {
                  selectRole(char.name, char.hp, char.order);
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
            if (buttonInfo) {
              buttonInfo["roleName"] = char.name;
            }
            return (
              <Button
                label={
                  buttonInfo &&
                  buttonInfo.roleName + " - " + buttonInfo.playerName
                }
                severity={char.color}
                key={"selectedRole" + i}
                className={`${!roleIsSelected && "hidden"}`}
              />
            );
          })}
        </div>
        <div className=" pb-3 flex  flex-1 gap-4  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
          <Button
            onClick={() => {
              selectRole("", 0, 0);
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
              // readyChangeScene(true);
              setToNextSceneCheck(true);
            }}
          >
            <div className="h-8 w-12">
              <LoadingDots />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelectRole;
