import { create } from "zustand";

const connStore = create((set) => ({
  conn: null,
  updateConn: (newState) => {
    set({ conn: newState });
  },
}));

const myStateStore = create((set) => ({
  //myState = {name:playername, role: role, ... }
  myState: null,
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
  updateGgameState: (newState) => set({ gameState: newState }),
}));

export { connStore, myStateStore, roomStore, gameStore, playerStore };
