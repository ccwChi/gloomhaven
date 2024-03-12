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

export { characters, record };
