const characters = [
  {
    name: "赤色守衛",
    style:
      "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80",
  },
  {
    name: "石晶爆破手",
    style:
      "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 ",
  },
  {
    name: "虛空守望者",
    style:
      "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 ",
  },
  {
    name: "鋼角飛斧手",
    style:
      "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80  ",
  },
];

const record = {
  record01: {
    roleData: {
      RG: {
        name: "赤色守衛",
        player: "可拉",
        gold: "21",
        exp: "73",
        level: "",
        hp: "",
        cardMount: "",
        perk: "",
        object: {},
        record: "",
        style:
          "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      DE: {
        name: "石晶爆破手",
        player: "祐祐",
        gold: "36",
        exp: "78",
        level: "",
        hp: "",
        cardMount: "",
        perk: "",
        object: {},
        record: "",
        style:
          "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      VW: {
        name: "虛空守望者",
        player: "阿修",
        gold: "32",
        exp: "78",
        level: "",
        hp: "",
        cardMount: "",
        perk: "",
        object: {},
        record: "",
        style:
          "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      HA: {
        name: "鋼角飛斧手",
        player: "大蔥",
        gold: "67",
        exp: "75",
        level: "",
        hp: "",
        cardMount: "",
        perk: "",
        object: {},
        record: "",
        style:
          "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ",
      },
    },
    RoundState: [],
    ChapterRecord: {
      map1: "發生什麼事1",
      map2: "發生什麼事2",
      map3: "發生什麼事3",
    },
  },
};

const enenmyList = [
  {
    name: "targetPoint",
    chineseName: "目標點",
    isElite: false,
    scriptLv0: { hp: "x" },
    scriptLv1: { hp: "x" },
    scriptLv2: { hp: "x" },
    scriptLv3: { hp: "x" },
  },
  {
    name: "blackSludge",
    chineseName: "黑色汙泥",
    isElite: false,
    scriptLv0: { hp: 4, move: 1, att: 2, ability: [] },
    scriptLv1: { hp: 5, move: 1, att: 2, ability: [] },
    scriptLv2: { hp: 7, move: 1, att: 2, shield: 1, ability: ["中毒"] },
    scriptLv3: { hp: 8, move: 1, att: 3, shield: 1, ability: ["中毒"] },
  },
  {
    name: "blackSludgeEX",
    chineseName: "黑色汙泥-菁英",
    isElite: true,
    scriptLv0: { hp: 8, move: 1, ability: [] },
    scriptLv1: { hp: 9, move: 1, ability: [] },
    scriptLv2: {
      hp: 11,
      move: 1,
      att: 3,
      shield: 1,
      ability: ["中毒"],
    },
    scriptLv3: {
      hp: 11,
      move: 2,
      att: 3,
      shield: 1,
      ability: {},
    },
  },
  {
    name: "ratMonstrosity",
    chineseName: "鼠類巨怪",
    isElite: false,
    scriptLv0: {
      hp: 4,
      move: 1,
      att: 1,
      ability: ["死亡時鄰近一格敵人受到1點傷害"],
    },
    scriptLv1: {
      hp: 4,
      move: 1,
      att: 2,
      ability: ["死亡時鄰近一格敵人受到1點傷害"],
    },
    scriptLv2: {
      hp: 5,
      move: 2,
      att: 2,
      ability: ["死亡時鄰近一格敵人受到1點傷害"],
    },
    scriptLv3: {
      hp: 6,
      move: 2,
      att: 3,
      ability: ["死亡時鄰近一格敵人受到2點傷害"],
    },
  },
  {
    name: "ratMonstrosityEX",
    chineseName: "鼠類巨怪-菁英",
    isElite: true,
    scriptLv0: {
      hp: 6,
      move: 1,
      att: 2,
      ability: ["死亡時鄰近一格敵人受到1點傷害"],
    },
    scriptLv1: {
      hp: 7,
      move: 1,
      att: 2,
      ability: ["死亡時鄰近一格敵人受到2點傷害"],
    },
    scriptLv2: {
      hp: 8,
      move: 1,
      att: 3,
      ability: ["死亡時鄰近一格敵人受到2點傷害"],
    },
    scriptLv3: {
      hp: 10,
      move: 2,
      att: 3,
      ability: ["死亡時鄰近一格敵人受到2點傷害"],
    },
  },
  {
    name: "giantViper",
    chineseName: "巨型蝰蛇",
    isElite: false,
    scriptLv0: { hp: 2, move: 2, att: 1, ability: ["中毒"] },
    scriptLv1: { hp: 3, move: 2, att: 1, ability: ["中毒"] },
    scriptLv2: { hp: 4, move: 3, att: 1, ability: ["中毒"] },
    scriptLv3: { hp: 4, move: 3, att: 2, ability: ["中毒"] },
  },
  {
    name: "giantViperEX",
    chineseName: "巨型蝰蛇-菁英",
    isElite: true,
    scriptLv0: { hp: 3, move: 2, att: 2, ability: ["中毒"] },
    scriptLv1: { hp: 5, move: 2, att: 2, ability: ["中毒"] },
    scriptLv2: { hp: 7, move: 3, att: 2, ability: ["中毒"] },
    scriptLv3: { hp: 8, move: 3, att: 3, ability: ["中毒"] },
  },
  {
    name: "chaosDemon",
    chineseName: "渾沌惡魔",
    isElite: false,
    scriptLv0: { hp: 7, move: 3, att: 2, ability: ["迷茫"] },
    scriptLv1: { hp: 8, move: 3, att: 3, ability: ["迷茫"] },
    scriptLv2: { hp: 11, move: 3, att: 3, ability: ["迷茫"] },
    scriptLv3: { hp: 12, move: 3, att: 4, ability: ["迷茫"] },
  },
  {
    name: "chaosDemonEX",
    chineseName: "巨型蝰蛇-菁英",
    isElite: true,
    scriptLv0: { hp: 10, move: 4, att: 3, ability: ["迷茫"] },
    scriptLv1: { hp: 12, move: 4, att: 4, ability: ["迷茫"] },
    scriptLv2: { hp: 14, move: 4, att: 5, ability: ["迷茫"] },
    scriptLv3: { hp: 18, move: 5, att: 5, ability: ["迷茫"] },
  },
];

const enemyAction = {
  blackSludge: [
    { name: "精算打擊", as: 66, move: -1, att: +1, attRange: 3 },
    {
      name: "吞物進食",
      as: 66,
      move: +0,
      att: +1,
      attRange: 3,
      healSelf: 2,
      useElement: ["dark", { healSelf: +1 }],
    },
    {
      name: "倉促攻擊",
      as: 36,
      move: +1,
      att: -1,
      attRange: 3,
    },
    {
      name: "普通攻擊",
      as: 57,
      move: +0,
      att: +0,
      attRange: 2,
    },
    {
      name: "劇毒爆破",
      as: 57,
      att: +0,
      attRange: 2,
      target: 2,
      effect: "中毒",
      useElement: ["wind", { target: +1 }],
    },
    {
      name: "電漿結界",
      as: 85,
      action: ["推一格並中毒"],
      target: "周圍一格",
      att: +1,
      attRange: 2,
    },
    {
      name: "黑色巫術",
      as: 85,
      action: ["視線內最近敵人承受 1+L/2 向上取整傷害，無視距離"],
      healSelf: 1,
      element: "dark",
    },
    {
      name: "敗血巫術",
      as: 85,
      action: ["視線內最近敵人承受 1+L/2 向上取整傷害，無視距離"],
      healSelf: 1,
      element: "wind",
    },
  ],
  chaosDemon: [
    { name: "精算打擊", as: 13, move: -1, att: +0, attRange: 1, target: 2, useElement:["ice", "本回合任何攻擊混沌惡魔的角色受到兩點傷害"] },
  ],
};

export { characters, record };
