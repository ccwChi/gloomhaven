const record = [
  {
    recordName: "紀錄01",
    roleData: [
      {
        role: "赤色守衛",
        player: "",
        gold: "21",
        exp: "73",
        level: 2,
        averageLevel:"",
        hp: "",
        cardMount: 10,
        perk: "",
        object: ["手套", "鞋子", "竹蜻蜓"],
        record: "",
        style:
          "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      {
        role: "石晶爆破手",
        player: "",
        gold: "36",
        exp: "78",
        level: 2,
        averageLevel:"",
        hp: "",
        cardMount: 9,
        perk: "",
        object: ["手套", "鞋子", "竹蜻蜓"],
        record: "",
        style:
          "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      {
        role: "虛空守望者",
        player: "",
        gold: "32",
        exp: "78",
        level: 2,
        averageLevel:"",
        hp: "",
        cardMount: 11,
        perk: "",
        object: ["手套", "鞋子", "竹蜻蜓"],
        record: "",
        style:
          "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      {
        role: "鋼角飛斧手",
        player: "",
        gold: "67",
        exp: "75",
        level: 2,
        averageLevel:"",
        hp: "",
        cardMount: 10,
        perk: "",
        object: ["手套", "鞋子", "竹蜻蜓"],
        record: "",
        style:
          "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ",
      },
    ],
    RoundState: [],
    ChapterDescript: [
      { map: "酒館", describe: "發生什麼事1" },
      { map: "地下水道", describe: "發生什麼事2" },
      { map: "研究室", describe: "發生什麼事3" },
    ],
  },
];

const enemyList =[
  {
      "scriptLv2": [
          {
              "name": "targetPoint",
              "chineseName": "目標點",
              "isElite": false,
              "hp": ""
          },
          {
              "name": "blackSludge",
              "chineseName": "黑色汙泥",
              "isElite": false,
              "hp": 7,
              "move": 1,
              "att": 2,
              "shield": 1,
              "ability": [
                  "中毒"
              ]
          },
          {
              "name": "blackSludgeEX",
              "chineseName": "黑色汙泥-菁英",
              "isElite": true,
              "hp": 11,
              "move": 1,
              "att": 3,
              "shield": 1,
              "ability": [
                  "中毒"
              ]
          },
          {
              "name": "ratMonstrosity",
              "chineseName": "鼠類巨怪",
              "isElite": false,
              "hp": 5,
              "move": 2,
              "att": 2,
              "ability": [
                  "死亡時鄰近一格敵人受到1點傷害"
              ]
          },
          {
              "name": "ratMonstrosityEX",
              "chineseName": "鼠類巨怪-菁英",
              "isElite": true,
              "hp": 8,
              "move": 1,
              "att": 3,
              "ability": [
                  "死亡時鄰近一格敵人受到2點傷害"
              ]
          },
          {
              "name": "giantViper",
              "chineseName": "巨型蝰蛇",
              "isElite": false,
              "hp": 4,
              "move": 3,
              "att": 1,
              "ability": [
                  "中毒"
              ]
          },
          {
              "name": "giantViperEX",
              "chineseName": "巨型蝰蛇-菁英",
              "isElite": true,
              "hp": 7,
              "move": 3,
              "att": 2,
              "ability": [
                  "中毒"
              ]
          },
          {
              "name": "chaosDemon",
              "chineseName": "渾沌惡魔",
              "isElite": false,
              "hp": 11,
              "move": 3,
              "att": 3,
              "ability": [
                  "迷茫"
              ]
          },
          {
              "name": "chaosDemonEX",
              "chineseName": "渾沌惡魔-菁英",
              "isElite": true,
              "hp": 14,
              "move": 4,
              "att": 5,
              "ability": [
                  "迷茫"
              ]
          }
      ]
  },
  {
      "scriptLv3": [
          {
              "name": "targetPoint",
              "chineseName": "目標點",
              "isElite": false,
              "hp": ""
          },
          {
              "name": "blackSludge",
              "chineseName": "黑色汙泥",
              "isElite": false,
              "hp": 8,
              "move": 1,
              "att": 3,
              "shield": 1,
              "ability": [
                  "中毒"
              ]
          },
          {
              "name": "blackSludgeEX",
              "chineseName": "黑色汙泥-菁英",
              "isElite": true,
              "hp": 11,
              "move": 2,
              "att": 3,
              "shield": 1,
              "ability": {}
          },
          {
              "name": "ratMonstrosity",
              "chineseName": "鼠類巨怪",
              "isElite": false,
              "hp": 6,
              "move": 2,
              "att": 3,
              "ability": [
                  "死亡時鄰近一格敵人受到2點傷害"
              ]
          },
          {
              "name": "ratMonstrosityEX",
              "chineseName": "鼠類巨怪-菁英",
              "isElite": true,
              "hp": 10,
              "move": 2,
              "att": 3,
              "ability": [
                  "死亡時鄰近一格敵人受到2點傷害"
              ]
          },
          {
              "name": "giantViper",
              "chineseName": "巨型蝰蛇",
              "isElite": false,
              "hp": 4,
              "move": 3,
              "att": 2,
              "ability": [
                  "中毒"
              ]
          },
          {
              "name": "giantViperEX",
              "chineseName": "巨型蝰蛇-菁英",
              "isElite": true,
              "hp": 8,
              "move": 3,
              "att": 3,
              "ability": [
                  "中毒"
              ]
          },
          {
              "name": "chaosDemon",
              "chineseName": "渾沌惡魔",
              "isElite": false,
              "hp": 12,
              "move": 3,
              "att": 4,
              "ability": [
                  "迷茫"
              ]
          },
          {
              "name": "chaosDemonEX",
              "chineseName": "渾沌惡魔-菁英",
              "isElite": true,
              "hp": 18,
              "move": 5,
              "att": 5,
              "ability": [
                  "迷茫"
              ]
          }
      ]
  }
]

const enemyAction = {
  blackSludge: [
    { name: "精算打擊", as: 66, move: -1, att: +1, attRange: 3 },
    {
      name: "吞物進食",
      as: 66,
      move: +0,
      loot: +1,
      healSelf: 2,
      useElement: "dark",
      elementEffect: "治療自己1",
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
      useElement: "leaf",
      elementEffect: "目標+1",
    },
    {
      name: "電漿結界",
      as: 85,
      firstAction: ["推一格並中毒"],
      target: "周圍一格",
      att: +1,
      attRange: 2,
    },
    {
      name: "黑色巫術",
      as: 85,
      action: ["視線內最近敵人承受 1+L/2 向上取整傷害，無視距離"],
      healSelf: 1,
      createElement: ["dark"],
    },
    {
      name: "敗血巫術",
      as: 85,
      action: ["視線內最近敵人承受 1+L/2 向上取整傷害，無視距離"],
      healSelf: 1,
      createElement: ["wind"],
    },
  ],
  chaosDemon: [
    {
      name: "冰凍吐息",
      as: 13,
      move: -1,
      att: +0,
      attRange: 1,
      useElement: "ice",
      elementEffect: "遭受攻擊時，攻擊方受到2點傷害",
    },
    {
      name: "高溫爆彈",
      as: 1,
      move: +1,
      att: -1,
      attRange: 3,
      useElement: "fire",
      elementEffect: "負傷",
    },
    {
      name: "震波拳擊",
      as: 67,
      move: -2,
      att: +1,
      afterAtt: "推2格",
      useElement: "leaf",
      elementEffect: "變成範圍攻擊",
    },
    {
      name: "氣流旋風",
      as: 20,
      move: 0,
      att: -1,
      attRange: 2,
      useElement: "wind",
      elementEffect: "本回合護盾2",
    },
    {
      name: "飢餓巨口",
      as: 98,
      move: -1,
      att: -1,
      useElement: "any",
      elementEffect: "繳械",
    },
    {
      name: "魔力爆破",
      as: 76,
      move: +0,
      att: +0,
      createElement: ["fire", "ice", "wind", "leaf", "light", "dark"],
    },
    {
      name: "黑色觸鬚",
      as: 52,
      move: -1,
      att: +1,
      useElement: "dark",
      elementEffect: "所有與目標相鄰的敵人承受1傷害",
    },
    {
      name: "閃光利爪",
      as: 41,
      move: 0,
      att: 0,
      useElement: "light",
      elementEffect: "自療自己4",
    },
  ],
  giantViper: [
    {
      name: "迅捷尖牙",
      as: 33,
      move: +1,
      att: +0,
      target: 2,
    },
    {
      name: "尋找掩護",
      as: 18,
      move: +1,
      att: -1,
      discript: "本輪以巨型蝰蛇為目標的攻擊獲得劣勢",
    },
    {
      name: "精算打擊",
      as: 58,
      move: -1,
      att: +1,
    },
    {
      name: "劇毒狂亂",
      as: 43,
      move: +1,
      att: -1,
      discript: "目標為所有相鄰的敵人",
    },
    {
      name: "包抄圍堵",
      as: 32,
      move: +0,
      att: +0,
      discript: "目標與任何蝰蛇的盟友相鄰，攻擊+2",
    },
    {
      name: "包抄圍堵",
      as: 32,
      move: +0,
      att: +0,
      discript: "目標與任何蝰蛇的盟友相鄰，攻擊+2",
    },
    {
      name: "防禦打擊",
      as: 11,
      move: +0,
      att: +0,
      shield: +1,
    },
    {
      name: "纏身收束",
      as: 23,
      move: -1,
      att: -2,
      discript: "禁足",
    },
  ],
  ratMonstrosity: [
    {
      name: "普通攻擊",
      as: 39,
      move: +0,
      att: +0,
    },
    {
      name: "精算打擊",
      as: 60,
      move: -1,
      att: +1,
    },
    {
      name: "不穩爪擊",
      as: 52,
      move: 0,
      att: +1,
      discript: "攻擊成功的話，自身遭受一點傷害",
    },
    {
      name: "群體攻擊",
      as: 21,
      move: +1,
      att: -1,
      discript: "如果對象鄰近鼠類巨怪的盟友身邊，則攻擊+1",
    },
    {
      name: "群體攻擊",
      as: 21,
      move: +1,
      att: -1,
      discript: "如果對象鄰近鼠類巨怪的盟友身邊，則攻擊+1",
    },
    {
      name: "致虛啃咬",
      as: 34,
      move: +0,
      att: +0,
      discript: "導致混亂",
    },
    {
      name: "爆裂氣泡",
      as: 9,
      move: +1,
      discript: "本輪中如果遭受攻擊，攻擊方受到兩點傷害",
    },
    {
      name: "不穩狂熱",
      as: 74,
      move: 0,
      att: +1,
      discript: "自身受到1點傷害，鄰近所有敵人皆為攻擊目標",
    },
  ],
};

export { record, enemyList as enenmyList, enemyAction };


// const enenmyList =[
//   {
//       "scriptLv0": [
//           {
//               "name": "targetPoint",
//               "chineseName": "目標點",
//               "isElite": false,
//               "hp": ""
//           },
//           {
//               "name": "blackSludge",
//               "chineseName": "黑色汙泥",
//               "isElite": false,
//               "hp": 4,
//               "move": 1,
//               "att": 2,
//               "ability": []
//           },
//           {
//               "name": "blackSludgeEX",
//               "chineseName": "黑色汙泥-菁英",
//               "isElite": true,
//               "hp": 8,
//               "move": 1,
//               "ability": []
//           },
//           {
//               "name": "ratMonstrosity",
//               "chineseName": "鼠類巨怪",
//               "isElite": false,
//               "hp": 4,
//               "move": 1,
//               "att": 1,
//               "ability": [
//                   "死亡時鄰近一格敵人受到1點傷害"
//               ]
//           },
//           {
//               "name": "ratMonstrosityEX",
//               "chineseName": "鼠類巨怪-菁英",
//               "isElite": true,
//               "hp": 6,
//               "move": 1,
//               "att": 2,
//               "ability": [
//                   "死亡時鄰近一格敵人受到1點傷害"
//               ]
//           },
//           {
//               "name": "giantViper",
//               "chineseName": "巨型蝰蛇",
//               "isElite": false,
//               "hp": 2,
//               "move": 2,
//               "att": 1,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "giantViperEX",
//               "chineseName": "巨型蝰蛇-菁英",
//               "isElite": true,
//               "hp": 3,
//               "move": 2,
//               "att": 2,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "chaosDemon",
//               "chineseName": "渾沌惡魔",
//               "isElite": false,
//               "hp": 7,
//               "move": 3,
//               "att": 2,
//               "ability": [
//                   "迷茫"
//               ]
//           },
//           {
//               "name": "chaosDemonEX",
//               "chineseName": "渾沌惡魔-菁英",
//               "isElite": true,
//               "hp": 10,
//               "move": 4,
//               "att": 3,
//               "ability": [
//                   "迷茫"
//               ]
//           }
//       ]
//   },
//   {
//       "scriptLv1": [
//           {
//               "name": "targetPoint",
//               "chineseName": "目標點",
//               "isElite": false,
//               "hp": ""
//           },
//           {
//               "name": "blackSludge",
//               "chineseName": "黑色汙泥",
//               "isElite": false,
//               "hp": 5,
//               "move": 1,
//               "att": 2,
//               "ability": []
//           },
//           {
//               "name": "blackSludgeEX",
//               "chineseName": "黑色汙泥-菁英",
//               "isElite": true,
//               "hp": 9,
//               "move": 1,
//               "ability": []
//           },
//           {
//               "name": "ratMonstrosity",
//               "chineseName": "鼠類巨怪",
//               "isElite": false,
//               "hp": 4,
//               "move": 1,
//               "att": 2,
//               "ability": [
//                   "死亡時鄰近一格敵人受到1點傷害"
//               ]
//           },
//           {
//               "name": "ratMonstrosityEX",
//               "chineseName": "鼠類巨怪-菁英",
//               "isElite": true,
//               "hp": 7,
//               "move": 1,
//               "att": 2,
//               "ability": [
//                   "死亡時鄰近一格敵人受到2點傷害"
//               ]
//           },
//           {
//               "name": "giantViper",
//               "chineseName": "巨型蝰蛇",
//               "isElite": false,
//               "hp": 3,
//               "move": 2,
//               "att": 1,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "giantViperEX",
//               "chineseName": "巨型蝰蛇-菁英",
//               "isElite": true,
//               "hp": 5,
//               "move": 2,
//               "att": 2,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "chaosDemon",
//               "chineseName": "渾沌惡魔",
//               "isElite": false,
//               "hp": 8,
//               "move": 3,
//               "att": 3,
//               "ability": [
//                   "迷茫"
//               ]
//           },
//           {
//               "name": "chaosDemonEX",
//               "chineseName": "渾沌惡魔-菁英",
//               "isElite": true,
//               "hp": 12,
//               "move": 4,
//               "att": 4,
//               "ability": [
//                   "迷茫"
//               ]
//           }
//       ]
//   },
//   {
//       "scriptLv2": [
//           {
//               "name": "targetPoint",
//               "chineseName": "目標點",
//               "isElite": false,
//               "hp": ""
//           },
//           {
//               "name": "blackSludge",
//               "chineseName": "黑色汙泥",
//               "isElite": false,
//               "hp": 7,
//               "move": 1,
//               "att": 2,
//               "shield": 1,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "blackSludgeEX",
//               "chineseName": "黑色汙泥-菁英",
//               "isElite": true,
//               "hp": 11,
//               "move": 1,
//               "att": 3,
//               "shield": 1,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "ratMonstrosity",
//               "chineseName": "鼠類巨怪",
//               "isElite": false,
//               "hp": 5,
//               "move": 2,
//               "att": 2,
//               "ability": [
//                   "死亡時鄰近一格敵人受到1點傷害"
//               ]
//           },
//           {
//               "name": "ratMonstrosityEX",
//               "chineseName": "鼠類巨怪-菁英",
//               "isElite": true,
//               "hp": 8,
//               "move": 1,
//               "att": 3,
//               "ability": [
//                   "死亡時鄰近一格敵人受到2點傷害"
//               ]
//           },
//           {
//               "name": "giantViper",
//               "chineseName": "巨型蝰蛇",
//               "isElite": false,
//               "hp": 4,
//               "move": 3,
//               "att": 1,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "giantViperEX",
//               "chineseName": "巨型蝰蛇-菁英",
//               "isElite": true,
//               "hp": 7,
//               "move": 3,
//               "att": 2,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "chaosDemon",
//               "chineseName": "渾沌惡魔",
//               "isElite": false,
//               "hp": 11,
//               "move": 3,
//               "att": 3,
//               "ability": [
//                   "迷茫"
//               ]
//           },
//           {
//               "name": "chaosDemonEX",
//               "chineseName": "渾沌惡魔-菁英",
//               "isElite": true,
//               "hp": 14,
//               "move": 4,
//               "att": 5,
//               "ability": [
//                   "迷茫"
//               ]
//           }
//       ]
//   },
//   {
//       "scriptLv3": [
//           {
//               "name": "targetPoint",
//               "chineseName": "目標點",
//               "isElite": false,
//               "hp": ""
//           },
//           {
//               "name": "blackSludge",
//               "chineseName": "黑色汙泥",
//               "isElite": false,
//               "hp": 8,
//               "move": 1,
//               "att": 3,
//               "shield": 1,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "blackSludgeEX",
//               "chineseName": "黑色汙泥-菁英",
//               "isElite": true,
//               "hp": 11,
//               "move": 2,
//               "att": 3,
//               "shield": 1,
//               "ability": {}
//           },
//           {
//               "name": "ratMonstrosity",
//               "chineseName": "鼠類巨怪",
//               "isElite": false,
//               "hp": 6,
//               "move": 2,
//               "att": 3,
//               "ability": [
//                   "死亡時鄰近一格敵人受到2點傷害"
//               ]
//           },
//           {
//               "name": "ratMonstrosityEX",
//               "chineseName": "鼠類巨怪-菁英",
//               "isElite": true,
//               "hp": 10,
//               "move": 2,
//               "att": 3,
//               "ability": [
//                   "死亡時鄰近一格敵人受到2點傷害"
//               ]
//           },
//           {
//               "name": "giantViper",
//               "chineseName": "巨型蝰蛇",
//               "isElite": false,
//               "hp": 4,
//               "move": 3,
//               "att": 2,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "giantViperEX",
//               "chineseName": "巨型蝰蛇-菁英",
//               "isElite": true,
//               "hp": 8,
//               "move": 3,
//               "att": 3,
//               "ability": [
//                   "中毒"
//               ]
//           },
//           {
//               "name": "chaosDemon",
//               "chineseName": "渾沌惡魔",
//               "isElite": false,
//               "hp": 12,
//               "move": 3,
//               "att": 4,
//               "ability": [
//                   "迷茫"
//               ]
//           },
//           {
//               "name": "chaosDemonEX",
//               "chineseName": "渾沌惡魔-菁英",
//               "isElite": true,
//               "hp": 18,
//               "move": 5,
//               "att": 5,
//               "ability": [
//                   "迷茫"
//               ]
//           }
//       ]
//   }
// ]