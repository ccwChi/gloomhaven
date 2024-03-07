import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const gameStateStore = create(
  persist((set) => ({
    roomMember: (roomMemberList) => {
      set((store) => {
        return {
          roomMemberList: roomMemberList,
        };
      });
    },
  }))
);
