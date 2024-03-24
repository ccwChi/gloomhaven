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
  // console.log(battleRecord);

  // 用來處理每個input欄位的輸入讀取 //
  const [inputValues, setInputValues] = useState(
    Array.from(
      { length: battleRecord.battleInitState.playersState.length },
      () => 0
    )
  );
  // 當InputNumber的值發生變化時觸發的函數
  const handleChange = (index, value) => {
    // 先複製一份原本的inputValues陣列
    const newInputValues = [...inputValues];
    // 更新特定索引處的值
    newInputValues[index] = value;
    // 將新的值設置為狀態值
    setInputValues(newInputValues);
  };
  const inputRefs = useRef([]);
  const handleClick = (index) => {
    console.log(inputRefs.current[index])
    if (inputRefs.current[index]) {
      // 使用getInput方法獲取輸入元素的引用
      const inputElement = inputRefs.current[index].getInput();
      // 獲取輸入元素的值
      const value = inputElement.value;
      // 對獲取的值進行操作，這裡只是簡單地在console中輸出
      console.log(`Input ${index + 1} value:`, value);
    }
  };
  // 用來處理每個input欄位的輸入讀取 //

  const renderMonsterListObj = (list) => {
    return Object.keys(list).map((area, i) => {
      const value = list[area];
      return (
        <Card
          key={i}
          title={"區域" + area}
          className=" bg-gray-300 bg-opacity-80 mb-2"
          pt={{
            content: { className: "flex flex-col gap-y-2 text-md p-0" },
          }}
        >
          {value.map((mon, j) => (
            <div
              key={j}
              className="bg-amber-800 text-gray-300 font-bold rounded-md py-2 flex flex-col justify-center items-center "
            >
              <div className="border w-fit p-2 rounded-md">
                {mon.chineseName + "-" + mon.index}
              </div>
              <div className="flex flex-1 w-full px-2">
                <div className="h-fit w-full p-2  rounded-lg text-start">
                  {"HP: " + (mon?.hp ? mon.hp : "0")}
                </div>
                <div className="h-fit  w-full p-2 rounded-lg text-start">
                  {"攻擊: " + (mon?.att ? mon.att : "0")}
                </div>
                <div className="h-fit w-full p-2 rounded-lg text-start">
                  {"移動: " + (mon?.move ? mon.move : "0")}
                </div>
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
                  HP:&nbsp; {player.maxHp} / {player.maxHp}
                </div>
                <InputNumber
                  inputId={`horizontal-buttons-${player.name}`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  // ref={el => inputRefs.current[index] = el}
                  value={inputValues[index]}
                  onChange={(e) => handleChange(index, e.value)}
                  // onValueChange={""

                  // }
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
                  onClick={() => handleClick(index)}
                />
              </div>
              {player.player === myState.player && (
                <div className="flex gap-4 justify-center">
                  <div className="flex items-center text-xl w-28">
                    exp:&nbsp; {player.exp}
                  </div>
                  <InputNumber
                    inputId={`horizontal-buttons-${player.name}`}
                    value={""}
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
                    onClick={() => handleClick(index)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 怪物ㄋ */}

      <div
        className={`w-full flex flex-col bg-slate-600 gap-y-3 flex-1 overflow-y-hidden p-5 ${""} bg-opacity-60 rounded-lg`}
      >
        <div className="w-full overflow-y-auto flex flex-col p-2 ">
          {renderMonsterListObj(battleRecord.battleInitState.monsterState)}
        </div>
      </div>
    </>
  );
};

export default Battle;
