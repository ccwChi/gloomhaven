import React, { useEffect } from "react";
import { record } from "../asset/data";
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
  sidebarStore,
} from "../utils/useStore";
import { Sidebar } from "primereact/sidebar";
import { useSessionStorage } from "primereact/hooks";

const CustomizeSidebar = () => {
  const { sidebarVisible, updateSidebarVisible } = sidebarStore();
  const { myState, updateMyState } = myStateStore();
  const { scriptLevel, updateScriptLevel } = scriptLevelStore();
  const { conn, updateConn } = connStore();
  // const [conn, setConn] = useSessionStorage(null, "conn");
  // 用及記錄玩家自身情況，自己的技能卡，經驗，優劣勢卡片狀態
  const [myStateSession, setMyStateSession] = useSessionStorage(
    null,
    "MyState"
  );

  // 用來記錄目前房間中有那些人，如果有人斷線，或加入，則更新每個人的房間狀態
  const { roomState, updateRoomState } = roomStore();

  // 用來記錄遊戲目前狀況，例如怪物的分布，遊戲的每輪狀態
  const { gameState, updateGameState } = gameStore();

  // 用來記錄目前場景，每個場景當四個人都按OK的的話則前往下一個場景
  const { gameScene, updateGameScene } = sceneStore();

  // 用來記錄每個玩家的狀態，哪個玩家選哪個腳色，...
  const { playerState, updatePlayerState } = playerStore();

  // 用來紀錄目前怪物選擇清單，(簡易)
  const { monsterList, updateMonsterList } = monsterStore();
  const { monsterDetailList, updateMonsterDetailList } = monsterDetailStore();
  const { battleRecord, updateBattleRecord } = battleRecordStore();
  return (
    <>
      <Sidebar
        position="bottom"
        visible={sidebarVisible}
        onHide={() => updateSidebarVisible(false)}
        className="bg-amber-100 "
        pt={{ header: { className: "hidden" } }}
      >
        <div
          className="mt-4 bg-amber-800 text-white w-fit px-2 py-1 rounded-lg"
          onClick={() => {
            // console.log("myState", myState);
            // console.log("roomState", roomState);
            // console.log("playerState", playerState);
            // console.log("monsterList", monsterList);
            // console.log("gameScene", gameScene);
            // console.log("monsterDetailList", monsterDetailList);
            console.log("battleRecord", battleRecord);
          }}
        >
          遊戲資訊
          <p className="w-fit text-xs text-rose-100">
            關卡等級 ( L ) = 全隊平均等級 / 2 向上取整
          </p>
        </div>
        <div className="p-2">
          <div className="flex gap-2 w-full ">
            <p className=" flex-1">{myState.name || `角色: ---`}</p>
            <div className="inline-flex flex-1">
              <p className="w-fit">{"經驗值: "}&nbsp;</p>
              <p>{myState.exp || "-"}</p>
            </div>
            <div className="inline-flex flex-1">
              <p className="w-fit">{"最大HP: "}&nbsp;</p>
              <p>{myState.maxHp || "-"}</p>
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="inline-flex flex-1 ">
              <p className="w-fit">{"等級: "}&nbsp;</p>
              <p>{myState.level || "-"}</p>
            </div>
            <div className="inline-flex flex-1 ">
              <p className="w-fit">{"金幣: "}&nbsp;</p>
              <p>{myState.gold || "-"}</p>
            </div>
            <div className="inline-flex flex-1">
              <p className="w-fit">{"關卡等級: "}&nbsp;</p>
              <p>{scriptLevel || "-"}</p>
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="inline-flex flex-1 ">
              <p className="w-fit">{"物品: "}&nbsp;</p>
              {myState.length > 0
                ? myState.object.map((item, index) => (
                    <React.Fragment key={index}>
                      <span>{item}</span>
                      {index !== myState.object.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))
                : "-"}
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="inline-flex flex-1 "></div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default CustomizeSidebar;
