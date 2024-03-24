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

// 用來紀錄目前怪物選擇清單，(簡易)
const monsterDetailStore = create((set) => ({
  monsterDetailList: [],
  updateMonsterDetailList: (newState) => set({ monsterDetailList: newState }),
}));

const scriptLevelStore = create((set) => ({
  scriptLevel: "",
  updateScriptLevel: (newState) => set({ scriptLevel: newState }),
}));

const battleRecordStore = create((set) => ({
  battleRecord: {
    myState: {
      name: "虛空守望者",
      color: "secondary",
      order: 3,
      player: "靜香",
      gold: "32",
      exp: "78",
      level: 2,
      averageLevel: "",
      maxHp: "",
      cardMount: 11,
      perk: "",
      object: ["手套", "鞋子", "竹蜻蜓"],
      record: "",
      attackFix: {
        "+0": 6,
        "+1": 5,
        "+2": 1,
        "-1": 5,
        "-2": 1,
        x2: 1,
        x0: 1,
      },
      skillLib: [
        {
          id: "151",
          value: 22,
          lv: "1",
        },
        {
          id: "152",
          value: 22,
          lv: "1",
        },
        {
          id: "153",
          value: 77,
          lv: "1",
        },
        {
          id: "154",
          value: 22,
          lv: "1",
        },
        {
          id: "155",
          value: 20,
          lv: "1",
        },
        {
          id: "156",
          value: 28,
          lv: "1",
        },
        {
          id: "157",
          value: 88,
          lv: "1",
        },
        {
          id: "158",
          value: 42,
          lv: "1",
        },
        {
          id: "159",
          value: 19,
          lv: "1",
        },
        {
          id: "160",
          value: 37,
          lv: "1",
        },
        {
          id: "161",
          value: 66,
          lv: "1",
        },
        {
          id: "162",
          value: 55,
          lv: "X",
        },
        {
          id: "163",
          value: 61,
          lv: "X",
        },
        {
          id: "164",
          value: 52,
          lv: "X",
        },
        {
          id: "165",
          value: 33,
          lv: "2",
        },
        {
          id: "166",
          value: 74,
          lv: "2",
        },
        {
          id: "167",
          value: 24,
          lv: "3",
        },
        {
          id: "168",
          value: 39,
          lv: "3",
        },
      ],
      selectAttackMod: {
        "+0": 6,
        "+1": 5,
        "+2": 1,
        "-1": 5,
        "-2": 1,
        x2: 1,
        x0: 1,
      },
      selectSkill: [
        {
          id: "162",
          value: 55,
          lv: "X",
        },
        {
          id: "163",
          value: 61,
          lv: "X",
        },
        {
          id: "164",
          value: 52,
          lv: "X",
        },
        {
          id: "153",
          value: 77,
          lv: "1",
        },
        {
          id: "158",
          value: 42,
          lv: "1",
        },
        {
          id: "157",
          value: 88,
          lv: "1",
        },
        {
          id: "152",
          value: 22,
          lv: "1",
        },
        {
          id: "151",
          value: 22,
          lv: "1",
        },
        {
          id: "156",
          value: 28,
          lv: "1",
        },
        {
          id: "161",
          value: 66,
          lv: "1",
        },
        {
          id: "159",
          value: 19,
          lv: "1",
        },
      ],
    },
    scene: "scene3",
    battleInitState: {
      monsterState: {
        1: [
          {
            name: "targetPoint",
            chineseName: "目標點",
            isElite: false,
            hp: 0,
            index: 1,
          },
          {
            name: "targetPoint",
            chineseName: "目標點",
            isElite: false,
            hp: 0,
            index: 2,
          },
        ],
        2: [
          {
            name: "blackSludge",
            chineseName: "黑色汙泥",
            isElite: false,
            hp: 7,
            move: 1,
            att: 2,
            ability: ["護盾1"],
            debuff: ["中毒"],
            index: 4,
          },
          {
            name: "blackSludgeEX",
            chineseName: "黑色汙泥-菁英",
            isElite: true,
            hp: 11,
            move: 1,
            att: 3,
            ability: ["護盾1"],
            debuff: ["中毒"],
            index: 5,
          },
        ],
        3: [
          {
            name: "targetPoint",
            chineseName: "目標點",
            isElite: false,
            hp: 0,
            index: 7,
          },
        ],
      },
      playersState: [
        {
          name: "虛空守望者",
          color: "secondary",
          order: 3,
          player: "靜香",
          gold: "32",
          exp: "78",
          level: 2,
          averageLevel: "",
          maxHp: 12,
          cardMount: 11,
          perk: "",
          object: ["手套", "鞋子", "竹蜻蜓"],
          record: "",
          attackFix: {
            "+0": 6,
            "+1": 5,
            "+2": 1,
            "-1": 5,
            "-2": 1,
            x2: 1,
            x0: 1,
          },
          skillLib: [
            {
              id: "151",
              value: 22,
              lv: "1",
            },
            {
              id: "152",
              value: 22,
              lv: "1",
            },
            {
              id: "153",
              value: 77,
              lv: "1",
            },
            {
              id: "154",
              value: 22,
              lv: "1",
            },
            {
              id: "155",
              value: 20,
              lv: "1",
            },
            {
              id: "156",
              value: 28,
              lv: "1",
            },
            {
              id: "157",
              value: 88,
              lv: "1",
            },
            {
              id: "158",
              value: 42,
              lv: "1",
            },
            {
              id: "159",
              value: 19,
              lv: "1",
            },
            {
              id: "160",
              value: 37,
              lv: "1",
            },
            {
              id: "161",
              value: 66,
              lv: "1",
            },
            {
              id: "162",
              value: 55,
              lv: "X",
            },
            {
              id: "163",
              value: 61,
              lv: "X",
            },
            {
              id: "164",
              value: 52,
              lv: "X",
            },
            {
              id: "165",
              value: 33,
              lv: "2",
            },
            {
              id: "166",
              value: 74,
              lv: "2",
            },
            {
              id: "167",
              value: 24,
              lv: "3",
            },
            {
              id: "168",
              value: 39,
              lv: "3",
            },
          ],
          selectAttackMod: {
            "+0": 6,
            "+1": 5,
            "+2": 1,
            "-1": 5,
            "-2": 1,
            x2: 1,
            x0: 1,
          },
          selectSkill: [
            {
              id: "162",
              value: 55,
              lv: "X",
            },
            {
              id: "163",
              value: 61,
              lv: "X",
            },
            {
              id: "164",
              value: 52,
              lv: "X",
            },
            {
              id: "153",
              value: 77,
              lv: "1",
            },
            {
              id: "158",
              value: 42,
              lv: "1",
            },
            {
              id: "157",
              value: 88,
              lv: "1",
            },
            {
              id: "152",
              value: 22,
              lv: "1",
            },
            {
              id: "151",
              value: 22,
              lv: "1",
            },
            {
              id: "156",
              value: 28,
              lv: "1",
            },
            {
              id: "161",
              value: 66,
              lv: "1",
            },
            {
              id: "159",
              value: 19,
              lv: "1",
            },
          ],
        },
        {
          name: "虛空守望者",
          color: "secondary",
          order: 3,
          player: "靜香",
          gold: "32",
          exp: "78",
          level: 2,
          averageLevel: "",
          maxHp: 12,
          cardMount: 11,
          perk: "",
          object: ["手套", "鞋子", "竹蜻蜓"],
          record: "",
          attackFix: {
            "+0": 6,
            "+1": 5,
            "+2": 1,
            "-1": 5,
            "-2": 1,
            x2: 1,
            x0: 1,
          },
          skillLib: [
            {
              id: "151",
              value: 22,
              lv: "1",
            },
            {
              id: "152",
              value: 22,
              lv: "1",
            },
            {
              id: "153",
              value: 77,
              lv: "1",
            },
            {
              id: "154",
              value: 22,
              lv: "1",
            },
            {
              id: "155",
              value: 20,
              lv: "1",
            },
            {
              id: "156",
              value: 28,
              lv: "1",
            },
            {
              id: "157",
              value: 88,
              lv: "1",
            },
            {
              id: "158",
              value: 42,
              lv: "1",
            },
            {
              id: "159",
              value: 19,
              lv: "1",
            },
            {
              id: "160",
              value: 37,
              lv: "1",
            },
            {
              id: "161",
              value: 66,
              lv: "1",
            },
            {
              id: "162",
              value: 55,
              lv: "X",
            },
            {
              id: "163",
              value: 61,
              lv: "X",
            },
            {
              id: "164",
              value: 52,
              lv: "X",
            },
            {
              id: "165",
              value: 33,
              lv: "2",
            },
            {
              id: "166",
              value: 74,
              lv: "2",
            },
            {
              id: "167",
              value: 24,
              lv: "3",
            },
            {
              id: "168",
              value: 39,
              lv: "3",
            },
          ],
          selectAttackMod: {
            "+0": 6,
            "+1": 5,
            "+2": 1,
            "-1": 5,
            "-2": 1,
            x2: 1,
            x0: 1,
          },
          selectSkill: [
            {
              id: "162",
              value: 55,
              lv: "X",
            },
            {
              id: "163",
              value: 61,
              lv: "X",
            },
            {
              id: "164",
              value: 52,
              lv: "X",
            },
            {
              id: "153",
              value: 77,
              lv: "1",
            },
            {
              id: "158",
              value: 42,
              lv: "1",
            },
            {
              id: "157",
              value: 88,
              lv: "1",
            },
            {
              id: "152",
              value: 22,
              lv: "1",
            },
            {
              id: "151",
              value: 22,
              lv: "1",
            },
            {
              id: "156",
              value: 28,
              lv: "1",
            },
            {
              id: "161",
              value: 66,
              lv: "1",
            },
            {
              id: "159",
              value: 19,
              lv: "1",
            },
          ],
        },
        {
          name: "虛空守望者",
          color: "secondary",
          order: 3,
          player: "靜香",
          gold: "32",
          exp: "78",
          level: 2,
          averageLevel: "",
          maxHp: 12,
          cardMount: 11,
          perk: "",
          object: ["手套", "鞋子", "竹蜻蜓"],
          record: "",
          attackFix: {
            "+0": 6,
            "+1": 5,
            "+2": 1,
            "-1": 5,
            "-2": 1,
            x2: 1,
            x0: 1,
          },
          skillLib: [
            {
              id: "151",
              value: 22,
              lv: "1",
            },
            {
              id: "152",
              value: 22,
              lv: "1",
            },
            {
              id: "153",
              value: 77,
              lv: "1",
            },
            {
              id: "154",
              value: 22,
              lv: "1",
            },
            {
              id: "155",
              value: 20,
              lv: "1",
            },
            {
              id: "156",
              value: 28,
              lv: "1",
            },
            {
              id: "157",
              value: 88,
              lv: "1",
            },
            {
              id: "158",
              value: 42,
              lv: "1",
            },
            {
              id: "159",
              value: 19,
              lv: "1",
            },
            {
              id: "160",
              value: 37,
              lv: "1",
            },
            {
              id: "161",
              value: 66,
              lv: "1",
            },
            {
              id: "162",
              value: 55,
              lv: "X",
            },
            {
              id: "163",
              value: 61,
              lv: "X",
            },
            {
              id: "164",
              value: 52,
              lv: "X",
            },
            {
              id: "165",
              value: 33,
              lv: "2",
            },
            {
              id: "166",
              value: 74,
              lv: "2",
            },
            {
              id: "167",
              value: 24,
              lv: "3",
            },
            {
              id: "168",
              value: 39,
              lv: "3",
            },
          ],
          selectAttackMod: {
            "+0": 6,
            "+1": 5,
            "+2": 1,
            "-1": 5,
            "-2": 1,
            x2: 1,
            x0: 1,
          },
          selectSkill: [
            {
              id: "162",
              value: 55,
              lv: "X",
            },
            {
              id: "163",
              value: 61,
              lv: "X",
            },
            {
              id: "164",
              value: 52,
              lv: "X",
            },
            {
              id: "153",
              value: 77,
              lv: "1",
            },
            {
              id: "158",
              value: 42,
              lv: "1",
            },
            {
              id: "157",
              value: 88,
              lv: "1",
            },
            {
              id: "152",
              value: 22,
              lv: "1",
            },
            {
              id: "151",
              value: 22,
              lv: "1",
            },
            {
              id: "156",
              value: 28,
              lv: "1",
            },
            {
              id: "161",
              value: 66,
              lv: "1",
            },
            {
              id: "159",
              value: 19,
              lv: "1",
            },
          ],
        },
        {
          name: "虛空守望者",
          color: "secondary",
          order: 3,
          player: "靜香",
          gold: "32",
          exp: "78",
          level: 2,
          averageLevel: "",
          maxHp: 12,
          cardMount: 11,
          perk: "",
          object: ["手套", "鞋子", "竹蜻蜓"],
          record: "",
          attackFix: {
            "+0": 6,
            "+1": 5,
            "+2": 1,
            "-1": 5,
            "-2": 1,
            x2: 1,
            x0: 1,
          },
          skillLib: [
            {
              id: "151",
              value: 22,
              lv: "1",
            },
            {
              id: "152",
              value: 22,
              lv: "1",
            },
            {
              id: "153",
              value: 77,
              lv: "1",
            },
            {
              id: "154",
              value: 22,
              lv: "1",
            },
            {
              id: "155",
              value: 20,
              lv: "1",
            },
            {
              id: "156",
              value: 28,
              lv: "1",
            },
            {
              id: "157",
              value: 88,
              lv: "1",
            },
            {
              id: "158",
              value: 42,
              lv: "1",
            },
            {
              id: "159",
              value: 19,
              lv: "1",
            },
            {
              id: "160",
              value: 37,
              lv: "1",
            },
            {
              id: "161",
              value: 66,
              lv: "1",
            },
            {
              id: "162",
              value: 55,
              lv: "X",
            },
            {
              id: "163",
              value: 61,
              lv: "X",
            },
            {
              id: "164",
              value: 52,
              lv: "X",
            },
            {
              id: "165",
              value: 33,
              lv: "2",
            },
            {
              id: "166",
              value: 74,
              lv: "2",
            },
            {
              id: "167",
              value: 24,
              lv: "3",
            },
            {
              id: "168",
              value: 39,
              lv: "3",
            },
          ],
          selectAttackMod: {
            "+0": 6,
            "+1": 5,
            "+2": 1,
            "-1": 5,
            "-2": 1,
            x2: 1,
            x0: 1,
          },
          selectSkill: [
            {
              id: "162",
              value: 55,
              lv: "X",
            },
            {
              id: "163",
              value: 61,
              lv: "X",
            },
            {
              id: "164",
              value: 52,
              lv: "X",
            },
            {
              id: "153",
              value: 77,
              lv: "1",
            },
            {
              id: "158",
              value: 42,
              lv: "1",
            },
            {
              id: "157",
              value: 88,
              lv: "1",
            },
            {
              id: "152",
              value: 22,
              lv: "1",
            },
            {
              id: "151",
              value: 22,
              lv: "1",
            },
            {
              id: "156",
              value: 28,
              lv: "1",
            },
            {
              id: "161",
              value: 66,
              lv: "1",
            },
            {
              id: "159",
              value: 19,
              lv: "1",
            },
          ],
        },
      ],
    },
    prevTurn: {},
    currentTurnState: {
      mySkillSpeed: "",
      monsterState: [],
      playersState: [],
    },
  },
  updateBattleRecord: (newState) => set({ battleRecord: newState }),
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
  battleRecordStore,
  monsterDetailStore,
};
