import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const connLocalStore = create(
  persist(
    (set) => ({
      connLocal: {},
      updateConnLocal: (newState) => set({ connLocal: newState }),
    }),
    { name: "connLocalStore" }
  )
);

const myStateLocalStore = create(
  persist(
    (set) => ({
      myStateLocal: [],
      updateMyStateLocal: (newState) => set({ myStateLocal: newState }),
    }),
    { name: "myStateLocalStore" }
  )
);

const roomLocalStore = create(
  persist(
    (set) => ({
      roomStateLocal: [],
      updateRoomStateLocal: (newState) => {
        set({ roomStateLocal: newState });
      },
    }),
    { name: "roomLocalStore" }
  )
);

const playerLocalStore = create(
  persist(
    (set) => ({
      playerStateLocal: [],
      updatePlayerStateLocal: (newState) => {
        set({ playerStateLocal: newState });
      },
    }),
    { name: "playerLocalStore" }
  )
);

const gameLocalStore = create(
  persist(
    (set) => ({
      gameStateLocal: [],
      updateGameStateLocal: (newState) => {
        set({ gameStateLocal: newState });
      },
    }),
    { name: "gameLocalStore" }
  )
);

const sceneLocalStore = create(
  persist(
    (set) => ({
      gameSceneLocal: "",
      updateGameSceneLocal: (newState) => {
        set({ gameSceneLocal: newState });
      },
    }),
    { name: "sceneLocalStore" }
  )
);

const monsterLocalStore = create(
  persist(
    (set) => ({
      monsterListLocal: [],
      updateMonsterListLocal: (newState) => {
        set({ monsterListLocal: newState });
      },
    }),
    { name: "playerLocalStore" }
  )
);

export {
  connLocalStore,
  myStateLocalStore,
  roomLocalStore,
  playerLocalStore,
  gameLocalStore,
  sceneLocalStore,
  monsterLocalStore,
};
