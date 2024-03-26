import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import CustomizeSidebar from "../../component/CustomizeSidebar";
import {
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
} from "../../utils/useStore";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { MultiSelect } from "primereact/multiselect";
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
  const { battleRecord, updateBattleRecord } = battleRecordStore();
  const [activeArea, setActiveArea] = useState([]);
  const [activeAreaList, setActiveAreaList] = useState([]);
  const [playerDivCollapse, setPlayerDivCollapse] = useState(false);
  // 進畫面先把前往下一關關掉
  useEffect(() => {
    // conn.invoke("ReadyChangeScene", false);
  }, []);

  // 將怪物、人物的初始狀態複製到當前回合狀態
  useEffect(() => {
    const tempRecrod = { ...battleRecord };
    const tempactionableRole = tempRecrod.battleInitState.playersState.map(
      (player) => ({ name: player.name, speed: "", order: player.order })
    );
    updateBattleRecord({
      ...tempRecrod,
      currentTurnState: {
        ...tempRecrod["currentTurnState"],
        monsterState: tempRecrod.battleInitState.monsterState,
        playersState: tempRecrod.battleInitState.playersState,
        actionableRole: tempactionableRole,
      },
    });
    // tempRecrod.Array
    setActiveAreaList(
      Object.keys(tempRecrod.battleInitState.monsterState).map((key) => ({
        name: "區域" + key,
        code: key,
      }))
    );
  }, []);

  // --------------------------------------------------------用來處理每個玩家血量欄位的輸入讀取 //
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
      // 使用getInput方法獲取輸入元素的引用
      const inputElement = inputPlayerHpRefs.current[index].getInput();
      // 獲取輸入元素的值
      const value = inputElement.value;
      // 對獲取的值進行操作，這裡只是簡單地在console中輸出
      const targetPlayer = inputPlayerHpRefs.current[index].props.id;

      const currentPlayers = [...battleRecord.currentTurnState.playersState];
      const playerIndex = currentPlayers.findIndex(
        (player) => player.name === targetPlayer
      );
      if (playerIndex !== -1) {
        currentPlayers[playerIndex] = {
          ...currentPlayers[playerIndex],
          maxHp: Math.max(
            currentPlayers[playerIndex].maxHp - parseInt(value),
            0
          ),
        };
        updateBattleRecord({
          ...battleRecord,
          currentTurnState: {
            ...battleRecord.currentTurnState,
            playersState: currentPlayers,
          },
        });
      }
    }
  };
  // --------------------------------------------------------用來處理每個怪物血量欄位的輸入讀取 //

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
    // console.log(inputPlayerHpRefs.current[index]);
    console.log(
      "index",
      index,
      "inputMonHpRefs.current[index]",
      inputMonHpRefs.current[index]
    );
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
        updateBattleRecord({
          ...battleRecord,
          currentTurnState: {
            ...battleRecord.currentTurnState,
            monsterState: updatedMonState,
          },
        });
      }
    }
  };

  // -------------------------------------------------怪物處理結束

  const handleAreaChange = (e) => {
    e.preventDefault();
  };

  const [expDelta, setExpDelta] = useState(0);
  const handlePlayerExp = () => {};

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
          onClick={(e) => {
            console.log(e.target.textContent);
          }}
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
  return (
    <>
      {/* 順序區 */}
      <div className="flex flex-col bg-black bg-opacity-70 p-6 w-full h-fit rounded-lg relative text-white">
        順序
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
                      {player.name}
                      <div className="flex gap-4 justify-center bg-red">
                        <div className="flex items-center text-lg w-28">
                          HP:&nbsp;{" "}
                          {battleRecord.currentTurnState.playersState &&
                            Object.values(
                              battleRecord.currentTurnState.playersState
                            ).find((role) => role.name === player.name)
                              ?.maxHp}{" "}
                          / {player.maxHp}
                        </div>
                        <InputNumber
                          ref={(el) => (inputPlayerHpRefs.current[index] = el)}
                          value={inputPlayerHp[index]}
                          onChange={(e) => handlePlayerHpChange(index, e.value)}
                          id={player.name}
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
                      {/* {player.player === battleRecord.myState.player && (
                        <div className="flex gap-4 justify-center">
                          <div className="flex items-center text-xl w-28">
                            exp:&nbsp; {player.exp}
                          </div>
                          <InputNumber
                            inputId={`horizontal-buttons-${player.name}`}
                            value={expDelta}
                            onChange={(e) => setExpDelta(e.target.value)}
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
                            onClick={() => handlePlayerExp()}
                          />
                        </div>
                      )} */}
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
      <div className="flex flex-col bg-black bg-opacity-70 p-2 w-full h-fit rounded-lg relative text-white">
        <div className="card flex w-fit gap-x-2 border rounded-lg p-1">
          <MultiSelect
            value={activeArea}
            onChange={(e) => setActiveArea(e.value)}
            options={activeAreaList}
            optionLabel="name"
            placeholder="開啟區域"
            // maxSelectedLabels={1}
            className="w-24 bg-black md:w-20rem text-white"
            pt={{
              trigger: { className: "hidden" },
              label: { className: "text-white !ps-4" },
              header: { className: "hidden" },
            }}
          />
          <Button
            className="bg-transparent border-none rounded-lg flex justify-center items-center p-1"
            onClick={(e) => handleAreaChange(e)}
          >
            送出
          </Button>
        </div>
      </div>
    </>
  );
};

export default Battle;
