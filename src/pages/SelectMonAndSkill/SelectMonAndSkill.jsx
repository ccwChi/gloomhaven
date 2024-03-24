import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import {
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
import { enemyList, record } from "../../asset/data";
import { TabPanel, TabView } from "primereact/tabview";
import CustomizeSidebar from "../../component/CustomizeSidebar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";

const SelectMonAndSkill = ({}) => {
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { playerState, updatePlayerState } = playerStore();
  const { gameState, updateGameState } = gameStore();
  const { scriptLevel, updateScriptLevel } = scriptLevelStore();
  const { gameScene, updateGameScene } = sceneStore();
  const { monsterList, updateMonsterList } = monsterStore();
  const { monsterDetailList, updateMonsterDetailList } = monsterDetailStore();
  const [targetPointHP, setTargetPointHP] = useState(0);
  const [selectMonList, setSelectMonList] = useState([
    { name: "區域", code: "" },
  ]);
  const [checkMonster, setCheckMonster] = useState(false);
  const [checkPlayer, setCheckPlayer] = useState(false);
  const [attackMod, setAttackMod] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);
  const [toNextScene, setToNextScene] = useState(false);

  // 進畫面先把前往下一關關掉
  useEffect(() => {
    conn.invoke("ReadyChangeScene", false);
  }, []);

  // 一進畫面就先計算關卡等級
  useEffect(() => {
    calculateAverageLevel(record);
    function calculateAverageLevel(record) {
      const { roleData } = record[0];
      // 使用 reduce 方法计算总等级
      const totalLevel = Object.values(roleData).reduce((acc, role) => {
        return acc + role.level;
      }, 0);
      // 计算角色总数
      const totalRoles = Object.values(roleData).length;

      // 计算平均等级
      const averageLevel = totalLevel / totalRoles;
      updateScriptLevel(averageLevel);
    }
  }, []);

  // 檢查完怪物跟使用者後，如果玩家們都ok 則前往地圖3
  useEffect(() => {
    if (checkMonster && checkPlayer) {
      const tempPlayerState = [...Object.values(playerState)];
      const checkedNum = tempPlayerState.filter(
        (i) => i.changeScene === true
      ).length;
      if (checkedNum > 0 && checkedNum === tempPlayerState.length) {
        // console.log(checkedNum);
        updateGameScene("scene3");
        // setFullGameRecord({ ...fullGameRecord, scene: "scene2" });
      }
    }
  }, [playerState]);

  // 收到別人傳來的monsterList之後要填入自己的畫面
  useEffect(() => {
    // console.log("monsterList", monsterList);
    if (monsterList.length > 0) {
      console.log("monsterList", monsterList);
      setSelectMonList(monsterList);

      let areaCount = 0;
      const updatedMonsterData = monsterList.map((mon, index) => {
        if (mon.name === "區域") {
          areaCount++;
          return { name: mon.name, area: areaCount };
        } else if (mon.name === "目標點") {
          return {
            name: mon.name,
            area: areaCount,
            code: mon.code,
            hp: mon.hp
          };
        } else {
          return {
            name: mon.name,
            area: areaCount,
            code: mon.code,
          };
        }
      });

      const lvEnemiesInData = enemyList.find((enemy) =>
        enemy.hasOwnProperty(`scriptLv${scriptLevel}`)
      )[`scriptLv${scriptLevel}`];

      // 建立以區域為 key 的物件
      const selectDetailMonList = updatedMonsterData.reduce(
        (acc, monster, index) => {
          if (monster.name === "區域") {
            return acc;
          } else {
            if (!acc[monster.area]) {
              acc[monster.area] = [];
            }
            const matchingEnemy = lvEnemiesInData.find((enemy) => {
              // console.log("enemy", enemy, "monster", monster);
              return enemy.name === monster.code;
            });
            // console.log("matchingEnemy", matchingEnemy);
            if (matchingEnemy) {
              const modifiedMonster = { ...matchingEnemy };
              if (matchingEnemy.name === "targetPoint") {
                modifiedMonster.hp = monster.hp;
              }
              modifiedMonster.index = index;
              acc[monster.area].push(modifiedMonster);
            }
          }
          return acc;
        },
        {}
      );
      updateMonsterDetailList(selectDetailMonList);
    }
  }, [monsterList]);

  return (
    <>
      <TabView
        scrollable
        className="bg-transparent w-full flex flex-col flex-1 overflow-y-hidden "
        pt={{
          nav: { className: "bg-transparent w-full" },
          header: { className: "w-full" },
          panelContainer: {
            className:
              "bg-transparent flex flex-col w-full overflow-y-hidden flex-1",
          },
        }}
      >
        <TabPanel
          header="怪物輸入"
          className="w-full px-0 flex flex-1 overflow-y-hidden "
          pt={{
            headerAction: {
              className: "bg-transparent justify-center border-none",
            },
            headertitle: { className: "text-xl" },
          }}
        >
          <MonstSelectTab
            setCheckMonster={setCheckMonster}
            checkMonster={checkMonster}
            targetPointHP={targetPointHP}
            setTargetPointHP={setTargetPointHP}
            selectMonList={selectMonList}
            setSelectMonList={setSelectMonList}
            monsterList={monsterList}
            updateMonsterList={updateMonsterList}
            scriptLevel={scriptLevel}
            monsterDetailList={monsterDetailList}
            updateMonsterDetailList={updateMonsterDetailList}
          />
        </TabPanel>
        <TabPanel
          header="怪物資訊"
          className="w-full px-0 flex flex-1 overflow-y-hidden"
          pt={{
            headerAction: {
              className: "bg-transparent justify-center border-none",
            },
            headertitle: { className: "text-xl" },
          }}
        >
          <MonDetailTab monsterDetailList={monsterDetailList} />
        </TabPanel>
        <TabPanel
          header="角色狀態"
          className="w-full px-0 flex flex-1 overflow-y-hidden"
          pt={{
            headerAction: {
              className: "bg-transparent justify-center border-none",
            },
            headertitle: { className: "text-xl" },
          }}
        >
          <PlayerStateTab
            checkPlayer={checkPlayer}
            setCheckPlayer={setCheckPlayer}
            attackMod={attackMod}
            setAttackMod={setAttackMod}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            scriptLevel={scriptLevel}
            myState={myState}
            updateMyState={updateMyState}
          />
        </TabPanel>
      </TabView>
      <div className="flex w-full justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
        <Button
          label={
            toNextScene ? "等待所有玩家確認中..." : "怪物/技能卡確認、前往關卡"
          }
          className="w-full mx-10"
          icon={toNextScene ? "pi pi-check" : "pi pi-arrow-right"}
          iconPos="right"
          raised
          severity="warning"
          onClick={() => {
            if (checkMonster && checkPlayer) {
              setToNextScene(!toNextScene)
              conn.invoke("ReadyChangeScene", !toNextScene);
            }
          }}
        />
      </div>
    </>
  );
};

export default SelectMonAndSkill;

const MonstSelectTab = ({
  setCheckMonster,
  checkMonster,
  targetPointHP,
  setTargetPointHP,
  selectMonList,
  setSelectMonList,
  monsterList,
  updateMonsterList,
  scriptLevel,
  monsterDetailList,
  updateMonsterDetailList,
}) => {
  const { conn, updateConn } = connStore();
  // const { myState, updateMyState } = myStateStore();
  // const { roomState, updateRoomState } = roomStore();
  // const { playerState, updatePlayerState } = playerStore();
  // const { gameState, updateGameState } = gameStore();
  // const { gameScene, updateGameScene } = sceneStore();
  // const { sidebarVisible, updateSidebarVisible } = sidebarStore();
  // const { scriptLevel, updateScriptLevel } = scriptLevelStore();

  const [selectMon, setSelectMon] = useState("");

  const monsterSelectList = [
    { name: "目標點", code: "targetPoint", area: 0 },
    { name: "黑色汙泥", code: "blackSludge", area: 0 },
    { name: "黑色汙泥-菁英", code: "blackSludgeEX", area: 0 },
    { name: "鼠類巨怪", code: "ratMonstrosity", area: 0 },
    { name: "鼠類巨怪-菁英", code: "ratMonstrosityEX", area: 0 },
    { name: "巨型蝰蛇", code: "giantViper", area: 0 },
    { name: "巨型蝰蛇-菁英", code: "giantViperEX", area: 0 },
    { name: "渾沌惡魔", code: "chaosDemon", area: 0 },
    { name: "渾沌惡魔-菁英", code: "chaosDemonEX", area: 0 },
  ];

  const SendMonData = async (monData) => {
    try {
      await conn.invoke("SendMonData", monData);
      console.log("SendMonData");
    } catch (error) {
      console.error("Error invoking SendMonData:", error);
      // 在這裡處理錯誤，例如顯示錯誤訊息給使用者或執行其他適當的操作
    }
  };

  let areaCount = 0;
  const updatedMonsterData = selectMonList.map((mon, index) => {
    if (mon.name === "區域") {
      areaCount++;
      return { name: mon.name, area: areaCount };
    } else if (mon.name === "目標點") {
      return {
        name: mon.name,
        area: areaCount,
        code: mon.code,
        hp: targetPointHP,
      };
    } else {
      return {
        name: mon.name,
        area: areaCount,
        code: mon.code,
      };
    }
  });

  const monDetail = () => {
    const newSelectMonList = selectMonList.map((mon) => {
      if (mon.name === "目標點") {
        return {
          ...mon,
          hp: targetPointHP,
        };
      } else {
        return mon;
      }
    });
    SendMonData(newSelectMonList);
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center flex-1">
      <div className="w-full  flex flex-col flex-1 gap-y-2 items-center overflow-hidden">
        {/* 怪物增加按鈕行 */}
        <div className="text-white">
          每個區域被門所分隔，當踩入該區域時，該區域的怪才會在下一輪開始行動
        </div>
        <div className="inline-flex w-full gap-x-2 px-1">
          <div className="bg-gray-600 px-4 bg-opacity-60 p-3 rounded-md w-fit text-center font-bold text-white">
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
        {/* 門增加按鈕行 */}
        <div className="inline-flex w-full gap-x-2 px-1 ">
          <div className="bg-gray-600 bg-opacity-60 flex-1 p-3 rounded-md w-full text-center font-bold text-white ">
            添加一個區域
          </div>
          <Button
            icon="pi pi-plus"
            className=""
            onClick={() => {
              setSelectMonList((prev) => [...prev, { name: "區域", code: "" }]);
            }}
          />
        </div>
        {/* 從這邊開始設置overflow */}
        <div
          className={`w-full flex flex-col bg-slate-600 gap-y-3 flex-1 overflow-y-auto p-5 ${
            selectMonList.length > 0 && ""
          } bg-opacity-60 rounded-lg`}
        >
          {/* <div className="text-white ">區域 1</div> */}
          {/* // 渲染怪物資訊 */}
          {updatedMonsterData.map((mon, index) => (
            <div
              className={`inline-flex gap-x-2 w-full ${
                mon.name.startsWith("區域") && "h-8"
              }`}
              key={"monsterList" + index}
            >
              <div
                className={`w-full bg-gray-300 text-black font-black font-mono text-lg rounded-lg flex items-center ${
                  mon.name.startsWith("區域") &&
                  "bg-transparent text-white !text-lg !justify-start !items-start bg-black"
                } ${!mon.name.startsWith("區域") && " justify-center"}`}
              >
                {mon.name.startsWith("區域")
                  ? mon.name + mon.area
                  : mon.name + index}
              </div>
              {mon.name !== "區域" && (
                <Button
                  icon="pi pi-minus"
                  className=""
                  onClick={() => {
                    const newList = updatedMonsterData.filter(
                      (_, i) => i !== index
                    );
                    setSelectMonList(newList);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className=" py-3 flex w-full gap-2 flex-col  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
        <div className="inline-flex w-full gap-x-2 px-1">
          <div className="bg-gray-600 px-4 bg-opacity-60 p-3 rounded-md flex-1 text-center font-bold text-white">
            如有目標點，請輸入目標點HP
          </div>
          <InputNumber
            pt={{ input: { root: { className: "!w-16" } } }}
            label={"如有目標點，請輸入目標點HP"}
            value={targetPointHP}
            onValueChange={(e) => setTargetPointHP(e.value)}
            useGrouping={false}
          />
        </div>
        <Button
          label="確認怪物"
          icon={checkMonster && "pi pi-check"}
          iconPos="right"
          raised
          onClick={() => {
            monDetail();
            setCheckMonster(!checkMonster);
          }}
        />
      </div>
    </div>
  );
};

const MonDetailTab = ({ monsterDetailList }) => {
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
    <div className="w-full flex flex-col gap-2 items-center flex-1">
      <div className="w-full  flex flex-col text-white items-center bg-slate-600 gap-y-3 flex-1 overflow-y-auto bg-opacity-60 rounded-lg">
        <div className="w-full overflow-y-auto flex flex-col p-2 ">
          {renderMonsterListObj(monsterDetailList)}
        </div>
      </div>
    </div>
  );
};
const PlayerStateTab = ({
  setCheckPlayer,
  checkPlayer,
  attackMod,
  setAttackMod,
  selectedCards,
  setSelectedCards,
  scriptLevel,
  myState,
  updateMyState,
}) => {
  const attackModType = ["+0", "+1", "-1", "+2", "-2", "x2", "x0"];

  const lv1Items = myState.skillLib.filter((item) => item.lv === "1");
  const lv2Items = myState.skillLib.filter((item) => item.lv === "2");
  const lv3Items = myState.skillLib.filter((item) => item.lv === "3");
  const lvXItems = myState.skillLib.filter((item) => item.lv === "X");

  /** 選擇技能卡的邏輯 開始 */
  const onItemChange = (e, item) => {
    let updatedSelectedItems = [...selectedCards];
    if (e.checked) {
      if (selectedCards.length >= myState.cardMount) {
        return;
      }
      updatedSelectedItems.push(item);
    } else {
      updatedSelectedItems = updatedSelectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
    }
    setSelectedCards(updatedSelectedItems);
  };

  // 要把卡片渲染出來的處理
  const productTemplate = (product) => {
    return (
      <div className="mx-8 flex justify-center">
        <img
          src={require(`../../asset/roleSkill/${product.id}.webp`)} // 修改图片路径的构建方式
          alt={product.image}
          className="w-fit shadow-2 max-w-28"
        />
      </div>
    );
  };

  /** 選擇攻擊補正卡的邏輯 只在一開始更新，理論上一渲染就讀的到myState才對*/
  useEffect(() => {
    if (myState) {
      setAttackMod(myState.attackFix);
    }
  }, []);

  // 點擊 check 按鈕，確定就把值填上，取消確定就清空值
  const handlePlayerDataCheck = () => {
    if (checkPlayer) {
      updateMyState({ ...myState, selectAttackMod: [], selectSkill: [] });
      setCheckPlayer(false);
    } else {
      updateMyState({
        ...myState,
        selectAttackMod: attackMod,
        selectSkill: selectedCards,
      });
      setCheckPlayer(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center flex-1">
      <div className="w-full  flex flex-col text-white items-center bg-slate-600 gap-y-3 flex-1 overflow-y-auto bg-opacity-60 rounded-lg">
        <div className="w-full overflow-y-auto flex flex-col ">
          <Carousel
            value={myState.skillLib}
            numVisible={1}
            numScroll={1}
            className="custom-carousel  py-4 flex"
            circular
            itemTemplate={productTemplate}
            pt={{
              previousButton: { className: "w-4 m-2 p-0" },
              nextButton: { className: " w-4 m-2 p-0" },
              indicators: { className: "flex gap-1" },
              indicator: { className: "w-2 m-0 p-0" },
              indicatorbutton: { className: "w-2 m-0 p-0" },
            }}
          />
          <div className="flex flex-col flex-wrap justify-content-center gap-3 p-3">
            <h3>
              角色 LV2 只能選擇 1 張 LV2 技能卡，LV 3總共可以選 2 張 LV2 及 LV3
              的卡。
            </h3>
            <h3>
              {myState.name} 技能卡數量為 {myState.cardMount} 張
            </h3>
            <h3>LV = X</h3>
            <div className="flex flex-wrap gap-3">
              {lvXItems.map((item) => (
                <div key={item.id} className="flex align-items-center">
                  <Checkbox
                    inputId={`item-${item.id}`}
                    name="lvX"
                    value={item}
                    onChange={(e) => onItemChange(e, item)}
                    checked={selectedCards.some(
                      (selectedItem) => selectedItem.id === item.id
                    )}
                  />
                  <label htmlFor={`item-${item.id}`} className="ml-2">
                    {item.value}
                  </label>
                </div>
              ))}
            </div>
            <h3>LV = 1</h3>
            <div className="flex flex-wrap gap-3">
              {lv1Items.map((item) => (
                <div key={item.id} className="flex align-items-center">
                  <Checkbox
                    inputId={`item-${item.id}`}
                    name="lv1"
                    value={item}
                    onChange={(e) => onItemChange(e, item)}
                    checked={selectedCards.some(
                      (selectedItem) => selectedItem.id === item.id
                    )}
                  />
                  <label htmlFor={`item-${item.id}`} className="ml-2">
                    {item.value}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-3">
                <h3>LV = 2</h3>
                <div className="flex flex-wrap gap-3">
                  {lv2Items.map((item) => (
                    <div key={item.id} className="flex align-items-center">
                      <Checkbox
                        inputId={`item-${item.id}`}
                        name="lv2"
                        value={item}
                        onChange={(e) => onItemChange(e, item)}
                        checked={selectedCards.some(
                          (selectedItem) => selectedItem.id === item.id
                        )}
                      />
                      <label htmlFor={`item-${item.id}`} className="ml-2">
                        {item.value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`flex flex-col gap-3 ${
                  myState.level < 3 && "hidden"
                }`}
              >
                <h3>LV = 3</h3>
                <div className="flex flex-wrap gap-3">
                  {lv3Items.map((item) => (
                    <div key={item.id} className="flex align-items-center">
                      <Checkbox
                        inputId={`item-${item.id}`}
                        name="lv3"
                        value={item}
                        onChange={(e) => onItemChange(e, item)}
                        checked={selectedCards.some(
                          (selectedItem) => selectedItem.id === item.id
                        )}
                      />
                      <label htmlFor={`item-${item.id}`} className="ml-2">
                        {item.value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap justify-content-center gap-3 p-3">
            <h3
              onClick={() => {
                console.log(selectedCards);
              }}
            >
              選擇優劣勢卡片
            </h3>
            {attackModType.map((type, i) => (
              <div key={i} className="inline-flex gap-4">
                <div className="flex gap-3">
                  <div className="flex justify-center items-center w-6">
                    {type}
                  </div>
                  <InputNumber
                    inputId={`horizontal-buttons-${type}`}
                    value={attackMod[type] || 0}
                    onValueChange={(e) =>
                      setAttackMod((prev) => ({
                        ...prev,
                        [type]: e.value,
                      }))
                    }
                    showButtons
                    buttonLayout="horizontal"
                    min={0}
                    step={1}
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                    size={1}
                    pt={{
                      input: {
                        root: {
                          className:
                            "border-none focus:ring-none focus:border:none",
                        },
                      },
                      incrementButton: {
                        className: "border-none",
                      },
                      decrementButton: {
                        className: "border-none",
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" py-3 flex w-full gap-2 flex-col  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
        <Button
          label="確任個人狀態"
          icon={checkPlayer && "pi pi-check"}
          disabled={selectedCards.length !== myState.cardMount}
          iconPos="right"
          raised
          onClick={() => {
            handlePlayerDataCheck();
          }}
        />
      </div>
    </div>
  );
};
