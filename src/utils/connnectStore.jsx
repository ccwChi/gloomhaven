import { create } from "zustand";

const connStore = create((set) => ({
  roomPlayers: [],
  setRoomPlayers: (newRoomPlayers) => set({ roomPlayers: newRoomPlayers }),
  conn: null,
  setConn: (newConn) => set({ conn: newConn }),
}));

export { connStore };
