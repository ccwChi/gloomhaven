import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import {
  connStore,
  gameStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
} from "../utils/useStore";
import { record } from "../asset/data";
import { TabPanel, TabView } from "primereact/tabview";
import { myStateLocalStore, sceneLocalStore } from "../utils/usePersistStore";

const HomePage = ({
  joinRoom,
  setDemoConn,
  setDemoScene,
  demoConn,
  demoScene,
}) => {
  const [logingData, setLoginData] = useState({
    playerName: "大雄",
    record: "紀錄01",
  });
  // 用及記錄玩家自身情況，自己的技能卡，經驗，優劣勢卡片狀態
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const myStateLocal = myStateLocalStore((store) => store.connLocal);
  const updateMyStateLocal = myStateLocalStore(
    (store) => store.updateMyStateLocal
  );
  // 用來記錄目前場景，每個場景當四個人都按OK的的話則前往下一個場景
  const { gameScene, updateGameScene } = sceneStore();
  const gameSceneLocal = sceneLocalStore((store) => store.gameSceneLocal);
  const updateGameSceneLocal = sceneLocalStore(
    (store) => store.updateGameSceneLocal
  );
  const handelEnterGame = (e) => {
    e.preventDefault();
    if (!!logingData.playerName && !!logingData.record) {
      joinRoom(logingData.playerName, logingData.record);
      updateMyState({ player: logingData.playerName });
      // updateMyStateLocal({ player: logingData.playerName });
      updateGameScene("scene2");
      // updateGameSceneLocal("scene2");
    }
  };

  return (
    <section
      className="w-full h-screen flex flex-col gap-8 p-4 items-center
        bg-[url('/src/asset/bg_img/bg-04.webp')] bg-cover bg-no-repeat bg-black ov"
    >
      <div
        onClick={() => {
          console.log("conn", conn, "gameScene", gameScene);
        }}
        className="bg-black text-white bg-opacity-80 rounded-lg p-4 font-bold text-center text-2xl mt-12 lg:mt-36"
      >
        請選擇紀錄
      </div>
      <div className="px-4 w-full flex flex-col flex-1 gap-y-4 p-1 overflow-y-auto">
        {record.map((record, i) => (
          <div className="relative" key={"record" + i}>
            <Fieldset
              legend={record.recordName}
              toggleable
              className="bg-transparent rounded-xl border-none"
              pt={{
                legend: { className: " translate-x-8 " },
                content: {
                  className: "-translate-y-4  rounded-lg text-white",
                },
              }}
            >
              <div className="bg-black bg-opacity-30 rounded-lg p-2" key={i}>
                {record.ChapterDescript.map((event, i) => (
                  <div className="flex" key={"ChapterDescript" + i}>
                    <p className="w-fit">{event.map + ": "}&nbsp;</p>
                    <p>{event.describe}</p>
                  </div>
                ))}
              </div>
            </Fieldset>
            <Checkbox
              onChange={(e) => {
                console.log(e);
                setLoginData((prev) => ({ ...prev, record: e.target.name }));
              }}
              checked={logingData.record === record.recordName}
              name={record.recordName}
              className="absolute top-0 size-12"
            ></Checkbox>
          </div>
        ))}
      </div>
      <form className="w-full max-w-md flex flex-col gap-x-2 gap-y-4 mb-12 shadow-md">
        <div className="flex gap-2">
          <div className="inline-flex flex-wrap justify-content-center gap-3 bg-black rounded-xl text-white  p-3 w-full ">
            <div className="flex align-items-center flex-1">
              <Checkbox
                name="胖虎"
                value="胖虎"
                onChange={() => {
                  setLoginData((prev) => ({ ...prev, playerName: "胖虎" }));
                }}
                checked={logingData.playerName === "胖虎"}
              />
              <label htmlFor="ingredient1" className="ml-2">
                胖虎
              </label>
            </div>
            <div className="flex align-items-center flex-1">
              <Checkbox
                name="小夫"
                value="小夫"
                onChange={() => {
                  setLoginData((prev) => ({ ...prev, playerName: "小夫" }));
                }}
                checked={logingData.playerName === "小夫"}
              />
              <label htmlFor="ingredient2" className="ml-2">
                小夫
              </label>
            </div>
            <div className="flex align-items-center flex-1">
              <Checkbox
                name="靜香"
                value="靜香"
                onChange={() => {
                  setLoginData((prev) => ({ ...prev, playerName: "靜香" }));
                }}
                checked={logingData.playerName === "靜香"}
              />
              <label htmlFor="ingredient3" className="ml-2">
                靜香
              </label>
            </div>
            <div className="flex align-items-center flex-1">
              <Checkbox
                name="大雄"
                value="大雄"
                onChange={() => {
                  setLoginData((prev) => ({ ...prev, playerName: "大雄" }));
                }}
                checked={logingData.playerName === "大雄"}
              />
              <label htmlFor="ingredient4" className="ml-2">
                大雄
              </label>
            </div>
          </div>
        </div>
        <div className="p-inputgroup flex-1">
          <InputText
            placeholder="我就是想叫多拉A夢"
            onChange={(e) => {
              setLoginData((prevData) => ({
                ...prevData,
                playerName: e.target.value,
              }));
            }}
          />
          <Button
            icon="pi pi-check"
            label="進入遊戲"
            className="p-button-warning"
            onClick={(e) => {
              handelEnterGame(e);
            }}
          />
          {/* <Button label="Submit" /> */}
        </div>
      </form>
    </section>
  );
};

export default HomePage;
