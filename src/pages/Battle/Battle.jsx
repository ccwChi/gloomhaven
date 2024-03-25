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
  const [playerDivCollapse, setPlayerDivCollapse] = useState(false);
  // 進畫面先把前往下一關關掉
  useEffect(() => {
    conn.invoke("ReadyChangeScene", false);
  }, []);

  useEffect(() => {
    const tempRecrod = { ...battleRecord };
    updateBattleRecord({
      ...tempRecrod,
      currentTurnState: {
        ...tempRecrod["currentTurnState"],
        monsterState: tempRecrod.battleInitState.monsterState,
        playersState: tempRecrod.battleInitState.playersState,
      },
    });
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
    console.log(inputPlayerHpRefs.current[index]);
    if (inputPlayerHpRefs.current[index]) {
      // 使用getInput方法獲取輸入元素的引用
      const inputElement = inputPlayerHpRefs.current[index].getInput();
      // 獲取輸入元素的值
      const value = inputElement.value;
      // 對獲取的值進行操作，這裡只是簡單地在console中輸出
      console.log(
        `Input ${inputPlayerHpRefs.current[index].props.id} value:`,
        value
      );
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
      // 使用getInput方法獲取輸入元素的引用
      const inputElement = inputMonHpRefs.current[index].getInput();
      // 獲取輸入元素的值
      const value = inputElement.value;
      // 對獲取的值進行操作，這裡只是簡單地在console中輸出
      console.log(`index ${index} value:`, value);
    }
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
          className=" bg-transparent border mb-2"
          pt={{
            content: { className: "flex flex-col gap-y-2 p-0" },
            title: { className: "text-white" },
          }}
        >
          {value.map((mon) => (
            <div
              key={mon.index}
              onClick={() => {
                console.log(inputMonHp);
              }}
              className="bg-transparent text-gray-300 font-bold rounded-md flex flex-col justify-center items-center"
            >
              <div className="flex flex-1 w-full justify-center items-center bg-green-80 p-2">
                <div className="h-fit w-full rounded-lg text-start text-lg bg-rose-80">
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
              <div className="flex gap-2 justify-center px-">
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
      {/* 玩家腳色區 */}
      <div
        className={`flex ${
          !playerDivCollapse ? "h-14" : "h-fit"
        } flex-col bg-black bg-opacity-70 w-full rounded-lg text-center relative text-white overflow-hidden`}
      >
        {!playerDivCollapse && (
          <div
            className="w-full text-xl p-4"
            onClick={() => {
              setPlayerDivCollapse(true);
            }}
          >
            角色血量
          </div>
        )}

        <Button
          icon={`pi ${
            playerDivCollapse ? "pi-angle-double-up" : "pi-angle-double-down"
          }`}
          className="text-xl p-4 absolute left-3 top-3 bg-gray-500 h-8 w-8"
          onClick={() => {
            setPlayerDivCollapse(!playerDivCollapse);
          }}
        ></Button>

        {battleRecord.battleInitState.playersState.map((player, index) => (
          <div key={index} className="inline-flex gap-4 p-4 ">
            <div className="flex flex-col  gap-3  text-xl ">
              {player.name}
              <div className="flex gap-4 justify-center">
                <div className="flex items-center text-xl w-28">
                  HP:&nbsp;{" "}
                  {battleRecord.currentTurnState.playersState &&
                    Object.values(
                      battleRecord.currentTurnState.playersState
                    ).find((role) => role.name === player.name)?.maxHp}{" "}
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
        ))}
      </div>

      {/* 怪物ㄋ */}

      <div
        className={`w-full flex flex-col bg-black flex-1 overflow-y-hidden bg-opacity-60 rounded-lg`}
      >
        <div className="w-full overflow-y-auto flex flex-col ">
          {renderMonsterListObj(battleRecord.battleInitState.monsterState)}
        </div>
      </div>
    </>
  );
};

export default Battle;
