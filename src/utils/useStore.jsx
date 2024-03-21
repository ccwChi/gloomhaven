import { create } from "zustand";

const connStore = create((set) => ({
  conn: null,
  updateConn: (newState) => {
    set({ conn: newState });
  },
}));

  // 用及記錄玩家自身情況，自己的技能卡，經驗，優劣勢卡片狀態
const myStateStore = create((set) => ({
  myState: [],
  updateMyState: (newState) => set({ myState: newState }),
}));

 // 用來記錄目前房間中有那些人，如果有人斷線，或加入，則更新每個人的房間狀態
const roomStore = create((set) => ({
  roomState: [],
  updateRoomState: (newState) => set({ roomState: newState }),
}));

  // 用來記錄每個玩家的狀態，哪個玩家選哪個腳色，..
const playerStore = create((set) => ({
  playerState: [],
  updatePlayerState: (newState) => {
    set({ playerState: newState });
  },
}));

  // 用來記錄遊戲目前狀況，例如怪物的分布，遊戲的每輪狀態
const gameStore = create((set) => ({
  gameState: [],
  updateGameState: (newState) => set({ gameState: newState }),
}));

  // 用來記錄目前場景，每個場景當四個人都按OK的的話則前往下一個場景
const sceneStore = create((set) => ({
  gameScene: "",
  updateGameScene: (newState) => set({ gameScene: newState }),
}));

const sidebarStore = create((set) => ({
  sidebarVisible: false,
  updateSidebarVisible: (newState) => set({ sidebarVisible: newState }),
}));

  // 用來紀錄目前怪物選擇清單，(簡易)
const monsterStore = create((set) => ({
  monsterList: [],
  updateMonsterList: (newState) => set({ monsterList: newState }),
}));
const scriptLevelStore = create((set) => ({
  scriptLevel: "",
  updateScriptLevel: (newState) => set({ scriptLevel: newState }),
}));

export {
  connStore,
  myStateStore,
  roomStore,
  gameStore,
  playerStore,
  sceneStore,
  sidebarStore,
  monsterStore,
  scriptLevelStore,
};
