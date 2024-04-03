import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import CustomizeSidebar from "../../component/CustomizeSidebar";
import {
  actionableWithMonSkillStore,
  battleRecordStore,
  connStore,
  gameStore,
  monsterDetailStore,
  monsterStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
  scriptLevelStore,
  sidebarStore,
  tempAreaOpenStore,
  tempMonDataStore,
  tempPlayerDataStore,
  tempPlayerDataWithSpStore,
} from "../../utils/useStore";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { enemyAction } from "../../asset/data";

const Battle = () => {
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { playerState, updatePlayerState } = playerStore();
  const { gameState, updateGameState } = gameStore();
  const { scriptLevel, updateScriptLevel } = scriptLevelStore();
  const { gameScene, updateGameScene } = sceneStore();
  const { monsterList, updateMonsterList } = monsterStore();
  const { monsterDetailList, updateMonsterDetailList } = monsterDetailStore();
  const { tempMonData, updateTempMonData } = tempMonDataStore();
  const { tempPlayerData, updateTempPlayerData } = tempPlayerDataStore();
  const { tempAreaOpen, updateTempAreaOpen } = tempAreaOpenStore();
  const { sidebarVisible, updateSidebarVisible } = sidebarStore();
  const { battleRecord, updateBattleRecord } = battleRecordStore();
  const { actionableWithMonSkill, updateActionableWithMonSkill } =
    actionableWithMonSkillStore();

  const [activeArea, setActiveArea] = useState([]);
  const [fromServerActiveArea, setFromServerActiveArea] = useState([]);
  const { tempPlayerDataWithSp, updateTempPlayerDataWithSp } =
    tempPlayerDataWithSpStore();
  const [activeAreaList, setActiveAreaList] = useState([]);
  const [playerDivCollapse, setPlayerDivCollapse] = useState(false);
  const [nextTurnSpeed, setNextTurnSpeed] = useState("");
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [skillModalPosition, setSkillModalPosition] = useState("bottom");
  const [nextTurnCheck, setNextTurnCheck] = useState(false);
  const [fromServerPlayerState, setFromServerPlayerState] = useState({});
  const [thisTurnActiveRole, setThisTurnActiveRole] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showPicId, setShowPicId] = useState(null);
  const [updatePlayerSp, setUpdatePlayerSp] = useState(false);
  // 將怪物、人物的初始狀態複製到當前回合狀態
  useEffect(() => {
    const tempRecrod = { ...battleRecord };
    const tempactionableRole = tempRecrod.battleInitState.playersState;
    tempactionableRole.sort((a, b) => {
      if (a.nextSpeed !== b.nextSpeed) {
        return a.nextSpeed - b.nextSpeed;
      } else {
        return a.order - b.order;
      }
    });
    // 重新設置排序後的 order 屬性值
    tempactionableRole.forEach((player, index) => {
      player.order = index + 1;
    });
    updateBattleRecord({
      ...tempRecrod,
      nextTurnState: {
        ...tempRecrod["currentTurnState"],
        monsterState: tempRecrod.battleInitState.monsterState,
        playersState: tempactionableRole,
        actionableRole: tempactionableRole,
      },
      currentTurnState: {
        ...tempRecrod["currentTurnState"],
        monsterState: tempRecrod.battleInitState.monsterState,
        playersState: tempactionableRole,
        actionableRole: tempactionableRole,
      },
    });

    // 進場先設置區域選單
    setActiveAreaList(
      Object.keys(tempRecrod.battleInitState.monsterState).map((key) => ({
        name: "區域" + key,
        code: key,
      }))
    );

    // 進場先設置上方有幾個玩家在排序
    setThisTurnActiveRole(tempactionableRole);
  }, []);

  // -----------------------------用來處理每個玩家血量欄位的輸入讀取 //
  const [inputPlayerHp, setInputPlayerHp] = useState(
    Array.from(
      { length: battleRecord.battleInitState.playersState.length },
      () => 0
    )
  );
  // 當InputNumber的值發生變化時觸發的函數
  const handlePlayerHpChange = (index, value) => {
    // 先複製一份原本的inputValues陣列
    const newInputValues = [...inputPlayerHp];
    // 更新特定索引處的值
    newInputValues[index] = value;
    // 將新的值設置為狀態值
    setInputPlayerHp(newInputValues);
  };
  const inputPlayerHpRefs = useRef([]);
  const handlePlayerHp = (index) => {
    if (inputPlayerHpRefs.current[index]) {
      console.log(
        "inputPlayerHpRefs.current[index]",
        inputPlayerHpRefs.current[index]
      );
      // 使用getInput方法獲取輸入元素的引用
      const inputElement = inputPlayerHpRefs.current[index].getInput();
      console.log("inputElement", inputElement);
      // 獲取輸入元素的值
      const value = inputElement.value;
      // 對獲取的值進行操作，這裡只是簡單地在console中輸出
      const targetPlayer = inputPlayerHpRefs.current[index].props.id;
      console.log("targetPlayer", targetPlayer);
      const currentPlayers = [...battleRecord.currentTurnState.playersState];
      console.log("currentPlayers", currentPlayers);
      const playerIndex = currentPlayers.findIndex(
        (player) => player.selectRole === targetPlayer
      );
      if (playerIndex !== -1) {
        currentPlayers[playerIndex] = {
          ...currentPlayers[playerIndex],
          hp: Math.max(currentPlayers[playerIndex].hp - parseInt(value), 0),
        };
        console.log("currentPlayers", currentPlayers);
        conn.invoke("SendCurrentPlayerState", currentPlayers);
      }
    }
  };

  // 有人傳送打怪資訊的話，同步
  useEffect(() => {
    if (!!tempPlayerData) {
      updateBattleRecord({
        ...battleRecord,
        currentTurnState: {
          ...battleRecord.currentTurnState,
          playersState: tempPlayerData,
        },
        nextTurnState: {
          ...battleRecord.nextTurnState,
          playersState: tempPlayerData,
        },
      });
      updateTempPlayerData(null);
    }
  }, [tempPlayerData]);
  // -------------------------------------------用來處理每個怪物血量欄位的輸入讀取 //

  const [inputMonHp, setInputMonHp] = useState(
    // Array.from({ maxIndex }, () => 0)
    []
  );
  useEffect(() => {
    if (battleRecord?.battleInitState?.monsterState) {
      // 初始化最大索引值为0
      let maxIndex = 0;
      const data = battleRecord.battleInitState.monsterState;
      // 遍历对象数组
      Object.keys(data).forEach((key) => {
        const objects = data[key];
        objects.forEach((obj) => {
          updateMaxIndex(obj.index);
        });
      });
      function updateMaxIndex(index) {
        if (index > maxIndex) {
          maxIndex = index;
        }
      }
      setInputMonHp(Array.from({ length: maxIndex + 1 }, () => 0));
    }
  }, []);
  // 當InputNumber的值發生變化時觸發的函數
  const handleMonHpChange = (index, value) => {
    // 先複製一份原本的inputValues陣列
    const newInputValues = [...inputMonHp];
    // 更新特定索引處的值
    newInputValues[index] = value;
    // 將新的值設置為狀態值
    setInputMonHp(newInputValues);
  };
  const inputMonHpRefs = useRef([]);
  const handleMonHp = (index) => {
    if (inputMonHpRefs.current[index]) {
      const inputElement = inputMonHpRefs.current[index].getInput();
      const value = inputElement.value;
      const currentMon = battleRecord.currentTurnState.monsterState;
      const targetMonIndex = Object.keys(currentMon).find((key) => {
        return currentMon[key].some((mon) => mon.index === index);
      });

      if (targetMonIndex) {
        const updatedMonState = {
          ...currentMon,
          [targetMonIndex]: currentMon[targetMonIndex].map((mon) => {
            if (mon.index === index) {
              return {
                ...mon,
                hp: Math.max(mon.hp - parseInt(value), 0), // 将 hp 减去 value 的值
              };
            }
            return mon;
          }),
        };
        // 存回 battleRecord.currentTurnState.monsterState 中
        conn.invoke("SendCurrentMonState", updatedMonState);
      }
    }
  };

  // 有人傳送打怪資訊的話，同步
  useEffect(() => {
    if (!!tempMonData) {
      updateBattleRecord({
        ...battleRecord,
        currentTurnState: {
          ...battleRecord.currentTurnState,
          monsterState: tempMonData,
        },
        nextTurnState: {
          ...battleRecord.nextTurnState,
          monsterState: tempMonData,
        },
      });
      updateTempMonData(null);
    }
  }, [tempMonData]);

  // -------------------------------------------------怪物處理結束

  // ---處理區域的設置，並將對應怪物加到下回合可行動的清單
  const handleAreaChange = (e) => {
    sendAreaData(activeArea);
  };
  //-----------------------------------------------處理傳送開放區域清單出去
  const sendAreaData = (activeArea) => {
    conn.invoke("SendOpenArea", activeArea);
    // setFromServerActiveArea(activeArea);
  };
  useEffect(() => {
    setActiveArea(tempAreaOpen);
    console.log("tempAreaOpen", tempAreaOpen);
    if (!!tempAreaOpen && tempAreaOpen.length > 0) {
      const activeMonsters = tempAreaOpen
        .reduce((acc, area) => {
          const monsters = battleRecord.nextTurnState.monsterState[area.code];
          console.log("monsters", monsters);
          if (monsters) {
            return acc.concat(monsters);
          }
          console.log("acc", acc);
          return acc;
        }, [])
        .filter((mon) => mon.hp !== 0);
      console.log("更新區域後activeMonsters", activeMonsters);
      // const uniqueActiveMonsters = [ ...new Map(activeMonsters.map((mon) => [mon.name, mon])).values(),]
      const uniqueActiveMonsters = activeMonsters
        .map((mon) => ({
          playerName: mon.chineseName,
          selectRole: mon.chineseName,
          index: mon.index,
          value: mon.name.replace(/EX$/, ""),
          nextSpeed: 0,
          actionCard: "",
        }))
        .concat(battleRecord.nextTurnState.playersState);
      // console.log(uniqueActiveMonsters);
      console.log("設置temparea後的");
      updateBattleRecord({
        ...battleRecord,
        nextTurnState: {
          ...battleRecord.nextTurnState,
          actionableRole: uniqueActiveMonsters,
          openArea: tempAreaOpen,
        },
        currentTurnState: {
          ...battleRecord.currentTurnState,
          openArea: tempAreaOpen,
        },
      });
    }
  }, [tempAreaOpen]);

  //-------------------------------------------------------處理傳送開放區域清單出去
  //-------------------------------------------------------處理玩家送出下一輪速度
  const sendPlayerNextSpeed = () => {
    // console.log("nextTurnSpeed", nextTurnSpeed);
    const tempNextPlayers = battleRecord.nextTurnState.playersState.map(
      (player) => {
        if (player.selectRole === myState.name) {
          return { ...player, nextSpeed: nextTurnSpeed.value };
        } else {
          return player;
        }
      }
    );
    conn.invoke("SendPlayerStateWithNextSp", tempNextPlayers);
    console.log("SendPlayerStateWithNextSp", tempNextPlayers);
    // 嘗試在這邊處理新增怪物邏輯
    const myOrder = battleRecord.nextTurnState.playersState.find(
      (i) => i.selectRole === myState.name
    ).order;
    if (myOrder === 1) {
      const processedRoles = {};

      const activeRolesWithSpeed =
        battleRecord.nextTurnState.actionableRole.map((role) => {
          // 有role.value 才是怪物，沒有的話是player
          // 如果processedRoles這個剛剛宣告的物件裡面有怪物資料，
          // 代表同類怪物已經在剛剛被賦予卡牌速度了，這隻就直接拿一樣的卡牌速度
          if (processedRoles[role.value]) {
            return {
              ...role,
              nextSpeed: processedRoles[role.value].nextSpeed,
              cardAction: processedRoles[role.value].cardAction,
            };
          } else if (!!role?.enemyData) {
            // 怪獸已經有卡牌資料  之前使用過卡牌組
            const enemyData = role.enemyData;
            if (enemyData && enemyData.length > 0) {
              // 如果卡牌(data)數量還大於0，隨機挑選一張作為下回合的技能卡
              const randomIndex = Math.floor(Math.random() * enemyData.length);
              const selectedEnemy = enemyData[randomIndex];
              enemyData.splice(randomIndex, 1);

              // 返回選擇的怪物資料的 as 屬性作為 nextSpeed
              if (role.value) {
                processedRoles[role.value] = {
                  ...role,
                  nextSpeed: selectedEnemy.as,
                  cardAction: selectedEnemy,
                };
              }

              return {
                ...role,
                nextSpeed: selectedEnemy.as,
                cardAction: selectedEnemy,
              };
            } else {
              if (role.value) {
                console.log(
                  "C  processedRoles[role.value] = role;",
                  processedRoles[role.value],
                  role
                );
                processedRoles[role.value] = role;
              }
              console.log("CC", role);
              return role;
            }
          } else {
            const enemyData = role.value && enemyAction[role.value];
            if (enemyData && enemyData.length > 0) {
              console.log("e", enemyData);
              // 檢查是否已處理過該 role.value
              if (processedRoles[role.value]) {
                console.log("f", processedRoles[role.value]);
                return role; // 如果已處理過，直接返回原始 role
              }

              // 隨機選擇一個怪物資料
              const randomIndex = Math.floor(Math.random() * enemyData.length);
              const selectedEnemy = enemyData[randomIndex];

              // 移除已選擇的怪物資料
              enemyData.splice(randomIndex, 1);

              // 更新已處理的 role.value
              if (role.value) {
                processedRoles[role.value] = {
                  ...role,
                  nextSpeed: selectedEnemy.as,
                  cardAction: selectedEnemy,
                  enemyData: enemyData,
                };
                console.log("hh", processedRoles[role.value]);
              }

              // 返回選擇的怪物資料的 as 屬性作為 nextSpeed
              console.log("i", {
                ...role,
                nextSpeed: selectedEnemy.as,
                cardAction: selectedEnemy,
                enemyData: enemyData,
              });
              return {
                ...role,
                nextSpeed: selectedEnemy.as,
                cardAction: selectedEnemy,
                enemyData: enemyData,
              };
            } else {
              if (role.value) {
                processedRoles[role.value] = role;
              }
              console.log("m", role);
              return role;
            }
          }
        });
      // ------------------------------------------新建怪物速度
      console.log("SendWithSkillCardActionableList", activeRolesWithSpeed);
      conn.invoke("SendWithSkillCardActionableList", activeRolesWithSpeed);
      // ------------------------------------------新建怪物速度
      // console.log(activeRolesWithSpeed);
    }
  };

  useEffect(() => {
    if (actionableWithMonSkill.length > 0 && updatePlayerSp) {
      console.log("actionableWithMonSkill", actionableWithMonSkill);
      const newBattleRecord = {
        ...battleRecord,
        nextTurnState: {
          ...battleRecord.nextTurnState,
          actionableRole: actionableWithMonSkill,
        },
      };
      updateBattleRecord(newBattleRecord);
      console.log("都吸爹", newBattleRecord);
      // setUpdateMosterSp([]);
      setUpdatePlayerSp(false);
    }
  }, [actionableWithMonSkill, updatePlayerSp]);

  useEffect(() => {
    if (!!tempPlayerDataWithSp) {
      console.log("tempPlayerDataWithSp", tempPlayerDataWithSp);
      console.log("battleRecord", battleRecord);
      updateBattleRecord({
        ...battleRecord,
        nextTurnState: {
          ...battleRecord.nextTurnState,
          playersState: tempPlayerDataWithSp,
        },
      });

      console.log("abacb", {
        ...battleRecord,
        nextTurnState: {
          ...battleRecord.nextTurnState,
          playersState: tempPlayerDataWithSp,
        },
      });
      updateTempPlayerData(null);
      setUpdatePlayerSp(true);
    }
  }, [tempPlayerDataWithSp]);

  //----------------------------------------------------處理前往下一輪
  const handleToNextTurn = () => {
    if (!!nextTurnSpeed) {
      // console.log("nextTurnCheck", nextTurnCheck);
      conn.invoke("ReadyChangeScene", !nextTurnCheck, 0);
      setNextTurnCheck(!nextTurnCheck);
    }
  };

  // 如果大家都按了前往下一關，則切換scene
  useEffect(() => {
    // console.log("確認是否跑到A這邊");
    const tempPlayerState = [...Object.values(playerState)];
    const checkedNum = tempPlayerState.filter(
      (i) => i.changeScene === true
    ).length;
    if (checkedNum > 0 && checkedNum === tempPlayerState.length) {
      // console.log("確認是否跑到B這邊");
      const tempRecrod = { ...battleRecord };
      console.log("典籍下一輪", tempRecrod);
      console.log();
      conn.invoke("ReadyChangeScene", false, 0);
      setNextTurnSpeed("");
      setNextTurnCheck(false);
      updateBattleRecord({
        ...tempRecrod,
        currentTurnState: tempRecrod.nextTurnState,
      });
      console.log("更新下一輪狀態，", {
        ...tempRecrod,
        currentTurnState: tempRecrod.nextTurnState,
      });
      const tempNewActionRole = tempRecrod.nextTurnState.actionableRole.map(
        (role) => ({
          ...role,
          playerName: role.playerName,
          selectRole: role.selectRole,
          index: role?.index || "",
          value: role?.value || "",
          nextSpeed: role.order
            ? tempRecrod.nextTurnState.playersState.find(
                (i) => i.playerName === role.playerName
              )?.nextSpeed || 0
            : role.nextSpeed || 0,
        })
      );
      console.log("進入下一輪的", tempNewActionRole);
      setThisTurnActiveRole(tempNewActionRole);
      // setThisTurnActiveRole(tempRecrod.nextTurnState.actionableRole);
    }
  }, [playerState]);

  //------------------------------------------------------------------------------處理前往下一張地圖

  const renderMonsterListObj = (list) => {
    return Object.keys(list).map((area, i) => {
      const value = list[area];
      return (
        <Card
          key={i}
          title={"區域" + area}
          className="bg-black bg-opacity-70 border mb-2 p relative"
          pt={{
            content: { className: "flex flex-col gap-y-2 p-0 " },
            title: { className: "text-white text-center text-xl p-0 m-0" },
          }}
          // onClick={(e) => {
          //   console.log(e.target.textContent);
          // }}
        >
          {value.map((mon) => (
            <div
              key={mon.index}
              className="bg-transparent text-gray-300 font-bold rounded-md flex flex-col justify-center items-center"
            >
              <div className="flex flex-1 w-full justify-center items-center bg-green-80 p-2">
                <div className="h-fit w-full rounded-lg text-start text-lg bg-rose-80 bg">
                  {/* 目標點1 */}
                  {mon.chineseName + mon.index}
                </div>
                <div className="h-fit w-40  rounded-lg text-star bg-blue-90">
                  {"攻擊: " + (mon?.att ? mon.att : "20")}
                </div>
                <div className="h-fit w-40 rounded-lg text-center bg-yellow-90">
                  {"移動: " + (mon?.move ? mon.move : "-")}
                </div>
              </div>
              <div className="flex gap-2 justify-start items-start w-full ps-2">
                <div className="flex items-center text-lg w-24 bg-amber-95 ">
                  HP:&nbsp;
                  {battleRecord.currentTurnState?.monsterState
                    ? Object.values(battleRecord.currentTurnState.monsterState)
                        .flat()
                        .find((mo) => mo.index === mon.index)?.hp
                    : "-"}
                  {` / ` + (mon?.hp ? mon.hp : "0")}
                  {/* {mon.chineseName + "-" + mon.index} */}
                </div>
                <InputNumber
                  // inputId={`horizontal-buttons-${player.name}`}
                  ref={(el) => (inputMonHpRefs.current[mon.index] = el)}
                  // ref={el => inputRefs.current[index] = el}
                  value={inputMonHp[mon.index]}
                  onChange={(e) => handleMonHpChange(mon.index, e.value)}
                  showButtons
                  buttonLayout="horizontal"
                  step={1}
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  size={1}
                  pt={{
                    input: {
                      root: {
                        className:
                          "border-none focus:ring-none focus:border:none w-12 h-8",
                      },
                    },
                    incrementButton: {
                      className: "border-none h-8",
                    },
                    decrementButton: {
                      className: "border-none h-8",
                    },
                  }}
                />
                <Button
                  icon={"pi pi-check"}
                  className="ms-8 w-8 h-8"
                  iconPos="right"
                  raised
                  onClick={() => handleMonHp(mon.index)}
                />
              </div>

              <div className="h-fit w-full px-2 rounded-lg flex">
                <div className="w-12">異常: </div>
                <div className="text-left">
                  {mon?.debuff ? mon.debuff : "無"}
                </div>
              </div>
              <div className="h-fit w-full px-2 rounded-lg flex">
                <div className="w-12">技能: </div>
                <div className="text-left">
                  {mon?.ability ? mon.ability : "無"}
                </div>
              </div>
            </div>
          ))}
        </Card>
      );
    });
  };

  useEffect(() => {
    if (!!showPicId) {
      setVisible(true);
    }
  }, [showPicId]);

  return (
    <>
      {/* 順序區 */}
      <Dialog
        visible={visible}
        modal
        draggable={false}
        onMaskClick={() => {
          setVisible(false);
          setTimeout(() => {
            setShowPicId(null);
          }, 300);
        }}
        style={{ width: "90vw" }}
        onHide={() => {
          setVisible(false);
          setShowPicId(null);
        }}
        pt={{
          header: { className: "hidden text-white p-4" },
          content: {
            className:
              "bg-gray-700 bg-opacity-50 text-white p-4 flex flex-col gap-y-4",
          },
        }}
      >
        {" "}
        <img
          src={
            showPicId
              ? require(`../../asset/monSkill/${showPicId}.webp`)
              : require(`../../asset/monSkill/396.webp`)
          } // 修改图片路径的构建方式
          alt="iamage"
          className="w-fit shadow-2"
        />
      </Dialog>

      <div
        onClick={() => {
          console.log("thisTurnActiveRole", thisTurnActiveRole);
        }}
        className="flex gap-2 bg-black bg-opacity-70 p-2 w-full h-fit rounded-lg relative text-white overflow-auto"
      >
        {thisTurnActiveRole
          .sort((a, b) => a.nextSpeed - b.nextSpeed) // 根據 nextSpeed 排序
          .map((role, index) => (
            <div
              key={index}
              className={`size-14 bg-slate-800 flex justify-center items-center rounded-md flex-col`}
              onClick={() => {
                if (!!role.cardAction) {
                  setShowPicId(role.cardAction.id);
                  console.log("有設置rolecardactionid", role.cardAction.id);
                }
              }}
            >
              <span>
                {role?.selectRole?.[0] +
                  role?.selectRole?.[1] +
                  (role?.index || "")}
              </span>
              <span>{role?.nextSpeed}</span>
            </div>
            // <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
          ))}
      </div>
      {/* 玩家角色區 */}
      <div className="flex-1 flex overflow-hidden w-full">
        <div className="flex flex-col gap-y-2 overflow-y-auto ">
          {/* 怪物ㄋ */}

          <div
            className={`w-full flex flex-col  flex-1 overflow-y-hiddens bg-opacity-60 rounded-lg gap-y-2`}
          >
            <div
              className={`flex ${
                !playerDivCollapse ? "h-10" : "h-fit"
              } flex-col bg-black bg-opacity-70 w-full rounded-lg text-center relative text-white overflow-hidden items-center`}
            >
              {
                <div
                  className="w-full text-xl p-2 border-gray-800 border bg-black rounded-lg"
                  onClick={() => {
                    setPlayerDivCollapse(!playerDivCollapse);
                  }}
                >
                  角色血量
                </div>
              }

              <Button
                icon={`pi ${
                  playerDivCollapse
                    ? "pi-angle-double-up"
                    : "pi-angle-double-down"
                }`}
                className="text-xl p-4 absolute left-3 top-1 bg-transparent border-none h-8 w-8"
                onClick={() => {
                  setPlayerDivCollapse(!playerDivCollapse);
                }}
              ></Button>

              {battleRecord.battleInitState.playersState.map(
                (player, index) => (
                  <div key={index} className="inline-flex gap-2 p-2 ">
                    <div className="flex flex-col  gap-1  text-md text-start">
                      {player.selectRole}
                      <div className="flex gap-4 justify-center bg-red">
                        <div className="flex items-center text-lg w-28">
                          HP:&nbsp;{" "}
                          {battleRecord?.currentTurnState?.playersState &&
                            Object.values(
                              battleRecord.currentTurnState.playersState
                            ).find(
                              (role) => role.selectRole === player.selectRole
                            )?.hp}{" "}
                          / {player.hp}
                        </div>
                        <InputNumber
                          ref={(el) => (inputPlayerHpRefs.current[index] = el)}
                          value={inputPlayerHp[index]}
                          onChange={(e) => handlePlayerHpChange(index, e.value)}
                          id={player.selectRole}
                          showButtons
                          buttonLayout="horizontal"
                          step={1}
                          incrementButtonIcon="pi pi-plus"
                          decrementButtonIcon="pi pi-minus"
                          size={1}
                          pt={{
                            input: {
                              root: {
                                className:
                                  "border-none focus:ring-none focus:border:none w-12 h-8",
                              },
                            },
                            incrementButton: {
                              className: "border-none h-8",
                            },
                            decrementButton: {
                              className: "border-none h-8",
                            },
                          }}
                        />
                        <Button
                          icon={"pi pi-check"}
                          className="ms-8 w-8 h-8"
                          iconPos="right"
                          raised
                          onClick={() => handlePlayerHp(index)}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="w-full overflow-y-autos flex flex-col ">
              {renderMonsterListObj(battleRecord.battleInitState.monsterState)}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex bg-black bg-opacity-70 p-2 gap-2 w-full h-fit rounded-lg relative text-white"
        onClick={() => {
          console.log("thisTurnActiveRole", thisTurnActiveRole);
        }}
      >
        <div className="flex-1 flex border border-[#06b6d4] p-1 rounded-md">
          <MultiSelect
            value={activeArea}
            onChange={(e) => setActiveArea(e.value)}
            options={activeAreaList}
            optionLabel="name"
            placeholder="區域"
            // maxSelectedLabels={1}
            className="w-full bg-black md:w-20rem text-white"
            onHide={(e) => handleAreaChange(e)}
            pt={{
              root: { className: "border-none" },
              trigger: { className: "hidden" },
              label: { className: "text-white ps-2 w-[4.5rem]" },
              header: { className: "hidden" },
            }}
          />
          {/* <Button
            className="bg-transparent border-none w-full"
            icon="pi pi-arrow-right"
            onClick={(e) => handleAreaChange(e)}
          ></Button> */}
        </div>
        <div className="flex flex-1">
          <Button
            label={`${
              !!nextTurnSpeed ? "下一張卡 " + nextTurnSpeed.value : "下一張卡"
            }`}
            // icon="pi pi-arrow-u"
            onClick={() => {
              setSkillModalPosition("bottom");
              setSkillModalOpen(true);
            }}
            className="w-full bg-black text-white text-[14px] p-1"
          />
        </div>
        <div className="flex flex-1">
          <Button
            label={`${"下一輪"}`}
            icon={`${nextTurnCheck && "pi pi-check"}`}
            onClick={() => {
              handleToNextTurn();
            }}
            iconPos="right"
            className="w-full bg-black text-white text-[14px] p-0"
            pt={{ icon: { className: "p-0 m-0 -translate-x-3" } }}
          />
        </div>
        <div className="w-10">
          <Button
            className="absolute bottom-3 right-3 size-8 "
            icon="pi pi-bars"
            onClick={() => updateSidebarVisible(true)}
          />
        </div>
        <Dialog
          header="選擇技能速度"
          visible={skillModalOpen}
          position={skillModalPosition}
          style={{ width: "85vw" }}
          onHide={() => setSkillModalOpen(false)}
          // footer={footerContent}
          draggable={false}
          resizable={false}
          className="!bg-gray-900"
          pt={{
            root: { className: "border" },
            header: { className: "bg-gray-700 bg-opacity-50 text-white p-4" },
            content: {
              className:
                "bg-gray-700 bg-opacity-50 text-white p-4 flex flex-col gap-y-4",
            },
          }}
        >
          <div className="  flex flex-wrap flex-shrink gap-4 ">
            {battleRecord.myState.selectSkill.map((skill, i) => {
              return (
                <div key={skill.id} className="flex fle items-center">
                  <RadioButton
                    inputId={skill.id}
                    name="category"
                    id={skill.id}
                    value={skill.value}
                    onChange={(e) => {
                      const [nextCard] =
                        battleRecord.myState.selectSkill.filter(
                          (i) => i.id === e.target.id
                        );
                      if (!!nextCard) {
                        console.log(nextCard);
                        setNextTurnSpeed(nextCard);
                      }
                      // console.log(e.value);
                    }}
                    checked={nextTurnSpeed?.id === skill.id}
                  />
                  <label htmlFor={skill.id} className="ml-2 w-16">
                    <span className="">Lv{skill.lv}</span> - {skill.value}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex">
            <Button
              label="送出"
              className="h-10"
              onClick={() => {
                setSkillModalOpen(false);
                sendPlayerNextSpeed();
              }}
            ></Button>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Battle;
