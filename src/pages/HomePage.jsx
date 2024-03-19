import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import {
  connStore,
  gameStore,
  monsterStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
  sidebarStore,
} from "../utils/useStore";
import { record } from "../asset/data";
import { TabPanel, TabView } from "primereact/tabview";
import { myStateLocalStore, sceneLocalStore } from "../utils/usePersistStore";
import CustomizeSidebar from "../component/CustomizeSidebar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import image224 from "../asset/RG/224.png"; // 导入图片
const HomePage = ({
  joinRoom,
  setDemoConn,
  setDemoScene,
  demoConn,
  demoScene,
}) => {
  const { conn, updateConn } = connStore();
  // const connLocal = connLocalStore((store) => store.connLocal);
  // const updateConnLocal = connLocalStore((store) => store.updateConnLocal);

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

  useEffect(() => {
    readyChangeScene(false);
  }, []);

  const readyChangeScene = (prepare) => {
    // connLocal.invoke("ReadyChangeScene", prepare);
    // conn.invoke("ReadyChangeScene", prepare);
    // 這邊的prepare用true跟false
  };

  useEffect(() => {
    updateMyState({
      role: "石晶爆破手",
      player: "大雄",
      gold: "36",
      exp: "78",
      level: 2,
      maxHp: "",
      cardMount: 9,
      perk: "",
      object: ["手套", "鞋子", "竹蜻蜓"],
      record: "",
      attackFix: {
        "+0": 6,
        "+1": 5,
        "+2": 1,
        "-1": 5,
        "-2": 1,
        x2: 1,
        x0: 1,
      },
    });
  }, []);

  return (
    <section
      className="w-full h-screen flex flex-col gap-2 p-4 pt-6 items-center
        bg-[url('/src/asset/bg_img/bg-03.webp')] bg-cover bg-no-repeat bg-black ov"
    >
      <Button
        className="absolute top-3 right-3 size-6"
        icon="pi pi-bars"
        onClick={() => updateSidebarVisible(true)}
      />

      <CustomizeSidebar />
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
          <MonstSelectTab />
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
          <div>畫面二'</div>
        </TabPanel>
        <TabPanel
          header="角色技能卡"
          className="w-full px-0 flex flex-1 overflow-y-hidden"
          pt={{
            headerAction: {
              className: "bg-transparent justify-center border-none",
            },
            headertitle: { className: "text-xl" },
          }}
        >
          <PlayerStateTab />
        </TabPanel>
      </TabView>
      <div className="flex w-full justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
        <Button
          label="怪物/技能卡確認、前往關卡"
          className="w-full mx-10"
          icon="pi pi-arrow-right"
          iconPos="right"
          raised
          severity="warning"
        />
      </div>
    </section>
  );
};

export default HomePage;

const PlayerStateTab = () => {
  const { myState } = myStateStore();
  const [attackMod, setAttackMod] = useState({});
  const attackModType = ["+0", "+1", "-1", "+2", "-2", "x2", "x0"];
  const [data, setData] = useState([
    {
      id: "082",
      value: 77,
      lv: "1",
    },
    {
      id: "083",
      value: 22,
      lv: "1",
    },
    {
      id: "084",
      value: 20,
      lv: "1",
    },
    {
      id: "085",
      value: 28,
      lv: "1",
    },
    {
      id: "086",
      value: 88,
      lv: "1",
    },
    {
      id: "087",
      value: 42,
      lv: "1",
    },
    {
      id: "088",
      value: 19,
      lv: "1",
    },
    {
      id: "089",
      value: 37,
      lv: "1",
    },
    {
      id: "090",
      value: 66,
      lv: "1",
    },
    {
      id: "091",
      value: 55,
      lv: "X",
    },
    {
      id: "092",
      value: 61,
      lv: "X",
    },
    {
      id: "093",
      value: 52,
      lv: "X",
    },
    {
      id: "094",
      value: 33,
      lv: "2",
    },
    {
      id: "095",
      value: 74,
      lv: "2",
    },
    {
      id: "096",
      value: 24,
      lv: "3",
    },
    {
      id: "097",
      value: 39,
      lv: "3",
    },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const lv1Items = data.filter((item) => item.lv === "1");
  const lv2Items = data.filter((item) => item.lv === "2");
  const lv3Items = data.filter((item) => item.lv === "3");
  const lvXItems = data.filter((item) => item.lv === "X");

  /** 選擇技能卡的邏輯 開始 */
  const onItemChange = (e, item) => {
    let updatedSelectedItems = [...selectedItems];

    if (e.checked) {
      if (selectedItems.length >= myState.cardMount) {
        return;
      }
      updatedSelectedItems.push(item);
    } else {
      updatedSelectedItems = updatedSelectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
    }

    setSelectedItems(updatedSelectedItems);
  };
  const productTemplate = (product) => {
    return (
      <div className="mx-8">
        <img
          src={require(`../asset/charSkill/${product.id}.png`)} // 修改图片路径的构建方式
          alt={product.image}
          className="w-fit shadow-2"
        />
      </div>
    );
  };
  /** 選擇技能卡的邏輯 結束*/

  /** 選擇攻擊補正卡的邏輯 開始 */
  useEffect(() => {
    if (myState) {
      setAttackMod(myState.attackFix);
    }
  }, [myState]);

  /** 選擇攻擊補正卡的邏輯 結束 */

  return (
    <div className="w-full flex flex-col gap-2 items-center flex-1">
      <div className="w-full  flex flex-col text-white items-center bg-slate-600 gap-y-3 flex-1 overflow-y-auto bg-opacity-60 rounded-lg">
        <div className="w-full overflow-y-auto flex flex-col ">
          <Carousel
            value={data}
            numVisible={1}
            numScroll={1}
            className="custom-carousel px-12 py-4 flex"
            circular
            itemTemplate={productTemplate}
            pt={{
              previousButton: { className: "w-4 m-0 p-0" },
              nextButton: { className: " w-4 m-0 p-0" },
              indicators: { className: "flex gap-1" },
              indicator: { className: "w-2 m-0 p-0" },
              indicatorbutton: { className: "w-2 m-0 p-0" },
            }}
          />
          <div className="flex flex-col flex-wrap justify-content-center gap-3 p-3">
            <h3
              onClick={() => {
                console.log(selectedItems);
              }}
            >
              角色 LV2 只能選擇 1 張 LV2 技能卡，LV 3總共可以選 2 張 LV2 及 LV3
              的卡。
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
                    checked={selectedItems.some(
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
                    checked={selectedItems.some(
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
                        checked={selectedItems.some(
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
                        checked={selectedItems.some(
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
                console.log(selectedItems);
              }}
            >
              選擇優劣勢卡片
            </h3>
            {attackModType.map((type, i) => (
              <div key={i} className="inline-flex gap-4">
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
                  size={8}
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
            ))}
          </div>
        </div>
      </div>
      <div className=" py-3 flex w-full gap-2 flex-col  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
        <Button
          label="確任個人狀態"
          icon="pi pi-check"
          iconPos="right"
          raised
        />
      </div>
    </div>
  );
};

const MonstSelectTab = () => {
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { playerState, updatePlayerState } = playerStore();
  const { gameState, updateGameState } = gameStore();
  const { gameScene, updateGameScene } = sceneStore();
  const { sidebarVisible, updateSidebarVisible } = sidebarStore();
  const { monsterList, updateMonsterList } = monsterStore();
  const [targetPointHP, setTargetPointHP] = useState(0);
  const [selectMon, setSelectMon] = useState("");
  const [selectMonList, setSelectMonList] = useState([
    {
      name: "區域",
      area: 1,
    },
  ]);
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

  useEffect(() => {
    if (monsterList.length > 0) {
      setSelectMonList(monsterList);
    }
  }, [monsterList]);

  const SendMonData = async (monData) => {
    // try {
    //   await conn.invoke("SendMonData", monData);
    //   console.log("SendMonData");
    // } catch (error) {
    //   console.error("Error invoking SendMonData:", error);
    // 在這裡處理錯誤，例如顯示錯誤訊息給使用者或執行其他適當的操作
    // }
  };
  useEffect(() => {
    console.log(
      "selectMonList",
      selectMonList,
      "updatedMonsterData",
      updatedMonsterData
    );
  }, [selectMonList]);
  // 建立新的陣列，追蹤門的數量

  // 計算門的數量
  // 計算區域的數量
  let areaCount = 0;
  const updatedMonsterData = selectMonList.map((mon, index) => {
    if (mon.name === "區域") {
      areaCount++;
      return { name: mon.name, area: areaCount };
    } else {
      return {
        name: mon.name,
        area: areaCount,
        code: mon.code
      };
    }
  });
  // useEffect(() => {
  //   console.log("areaCount", areaCount);
  // }, [areaCount]);
  return (
    <div className="w-full flex flex-col gap-2 items-center flex-1">
      <div className="w-full  flex flex-col flex-1 gap-y-2 items-center overflow-hidden">
        {/* 怪物增加按鈕行 */}
        <div className="text-white">
          每個區域被門所分隔，當踩入該區域時，該區域的怪才會在下一輪開始行動
        </div>
        <div className="inline-flex w-full gap-x-2 px-1">
          <div
            className="bg-gray-600 px-4 bg-opacity-60 p-3 rounded-md w-fit text-center font-bold text-white"
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
          {/* {selectMonList.map((mon, index) => {
            const monsterDataObject = updatedMonsterData[index];
            return (
              <div
                className="inline-flex gap-x-2 w-full"
                key={"monsterList" + index}
              >
                <div
                  className={`w-full bg-gray-300 text-black font-black font-mono text-xl rounded-lg flex justify-center items-center ${
                    mon.name === "門" && "bg-transparent text-white !text-lg"
                  } `}
                >
                  {mon.name !== "門" ? mon.name + "-" + (index + 1) : "區域"}
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
            );
          })} */}
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
          icon="pi pi-check"
          iconPos="right"
          raised
          onClick={() => {
            SendMonData(updateMonsterList);
          }}
        />
      </div>
    </div>
  );
};
