import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const mylocalStore = create(
  persist(
    (set) => ({
      myState: [],
      updatemyState: (newState) => set({ myState: newState }),
    }),
    { name: "myState" }
  )
);

const playerPersistStore = create(
  persist(
    (set) => ({
      playerPersistState: [],
      updatePlayerPersistState: (newState) => {
        set({ playerPersistState: newState });
      },
    }),
    { name: "playerPersistStore" }
  )
);

const gamePersistStore = create(
  persist(
    (set) => ({
      gamePersistState: [],
      updateGamePersistState: (newState) => {
        set({ gamePersistState: newState });
      },
    }),
    { name: "gamePersistStore" }
  )
);

export { mylocalStore, playerPersistStore, gamePersistStore };
