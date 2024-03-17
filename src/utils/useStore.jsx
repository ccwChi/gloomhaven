import { create } from "zustand";

const connStore = create((set) => ({
  conn: null,
  updateConn: (newState) => {
    set({ conn: newState });
  },
}));

const myStateStore = create((set) => ({
  myState: [],
  updateMyState: (newState) => set({ myState: newState }),
}));

const roomStore = create((set) => ({
  roomState: [],
  updateRoomState: (newState) => set({ roomState: newState }),
}));

const playerStore = create((set) => ({
  playerState: [],
  updatePlayerState: (newState) => {
    set({ playerState: newState });
  },
}));

const gameStore = create((set) => ({
  gameState: [],
  updateGameState: (newState) => set({ gameState: newState }),
}));

const sceneStore = create((set) => ({
  gameScene: "",
  updateGameScene: (newState) => set({ gameScene: newState }),
}));

const sidebarStore = create((set) => ({
  sidebarVisible: false,
  updateSidebarVisible: (newState) => set({ sidebarVisible: newState }),
}));

const monsterStore = create((set) => ({
  monsterList: false,
  updateMonsterList: (newState) => set({ monsterList: newState }),
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
};
