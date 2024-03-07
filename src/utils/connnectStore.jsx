import { create } from "zustand";

const connStore = create((set) => ({
  myState:[],
  
  playerState: [],
  setRoomPlayerState: (newState) => set({ roomPlayers: newState }),
  conn: null,
  setConn: (newConn) => set({ conn: newConn }),
  // playerState: [],
  // setPlayerState: (data) => {
  //   set((state) => {
  //     const index = state.playerState.findIndex(
  //       (player) => player.player === data.player
  //     );
  //     if (index !== -1) {
  //       const updatedState = [...state.playerState];
  //       updatedState[index] = data;
  //       return { ...state, playerState: updatedState };
  //     } else {
  //       return { ...state, playerState: [...state.playerState, data] };
  //     }
  //   });
  // },
}));

export { connStore };
