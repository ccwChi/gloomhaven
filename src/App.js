import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import HomeButton from "./component/HomeButton";
import { characters } from "./asset/data";
import {
  connStore,
  gameStore,
  myStateStore,
  playerStore,
  roomStore,
  sceneStore,
} from "./utils/useStore";
import { mylocalStore } from "./utils/usePersistStore";

const App = () => {
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { gameState, updateGameState } = gameStore();
  const { gameScene, updateGameScene } = sceneStore();
  const { playerState, updatePlayerState } = playerStore();
  const mylocalsotre = myStateStore((store) => store.myState);
  const updatemylocalsotre = mylocalStore((store) => store.updatemyState);

  useEffect(() => {
    if (!!conn) {
      updateGameScene("scene1");
    }
  }, [conn]);

  const joinRoom = async (playerName, recordNum) => {
    try {
      const newConn = new HubConnectionBuilder()
        .withUrl("https://localhost:7169/room")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      newConn.on("LeaveRoom", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
      });

      newConn.on("JoinRoom", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        console.log("joinroom myState", myState);
      });

      newConn.on("SelectRole", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        console.log("SelectRole myState", myState);
      });

      newConn.on("ReadyChangeScene", (connectedPlayers) => {
        updatePlayerState(connectedPlayers);
        updateGameState(connectedPlayers);
        console.log("SelectRole myState", myState);
      });

      await newConn.start();
      await newConn.invoke("JoinRoom", { playerName, recordNum });

      // 在用戶離開頁面時發送通知給伺服器
      window.addEventListener("beforeunload", function () {
        if (newConn) {
          newConn.invoke("LeaveRoom", { playerName, recordNum });
        }
      });
      updateConn(newConn);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* {!conn && <HomePage joinRoom={joinRoom} />} */}
      <EnemySelect />
      {conn && gameScene === "scene1" && <RoleSelectPage />}
      {conn && gameScene === "scene2" && <EnemySelect />}
    </>
  );
};

export default App;

const HomePage = ({ joinRoom }) => {
  const [logingData, setLoginData] = useState({
    username: "可拉",
    record: "record01",
  });
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { playerState, updatePlayerState } = playerStore();
  const { gameState, updateGameState } = gameStore();

  return (
    <section
      className="w-full h-screen flex flex-col  items-center gap-8
      bg-[url('/src/asset/BG/cover-2.jpeg')] bg-cover sm:bg-center bg-[-450px] bg-blend-screen bg-no-repeat bg-black"
    >
      <div className="px-4 w-full flex flex-col flex-1 mx-auto max-w-screen-xl text-center pt-24 lg:pt-56">
        <div className="flex flex-col flex-1">
          <div className="bg-black bg-opacity-80 rounded-lg mb-4">
            <h1
              className="py-5 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
              onClick={() => {
                console.log(conn);
              }}
            >
              請選擇紀錄
            </h1>
          </div>
          <div className="flex flex-col space-y-4 mx-8 sm:flex-row sm:justify-center sm:space-y-0">
            <p
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium
         text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 dark:focus:ring-blue-900"
              onClick={() => {
                setLoginData((prev) => ({ ...prev, record: "record01" }));
              }}
            >
              紀錄1
            </p>
          </div>
        </div>
      </div>
      <form className="w-full max-w-md px-6 mb-12 flex flex-col gap-2">
        <div className="flex gap-2">
          <p
            className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium
         text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={() => {
              setLoginData((prev) => ({ ...prev, username: "可拉" }));
            }}
          >
            可拉
          </p>
          <p
            className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium
         text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={() => {
              setLoginData((prev) => ({ ...prev, username: "大蔥" }));
            }}
          >
            大蔥
          </p>
          <p
            className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium
         text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={() => {
              setLoginData((prev) => ({ ...prev, username: "阿修" }));
            }}
          >
            阿修
          </p>
          <p
            className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium
         text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={() => {
              setLoginData((prev) => ({ ...prev, username: "祐祐" }));
            }}
          >
            祐祐
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
          <input
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="你是誰 我是誰"
            onChange={(e) => {
              setLoginData((prevData) => ({
                ...prevData,
                username: e.target.value,
              }));
            }}
          />
          <div
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              joinRoom(logingData.username, logingData.record);
              updateMyState(logingData.username);
            }}
          >
            加入房間
          </div>
        </div>
      </form>
    </section>
  );
};

const RoleSelectPage = () => {
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { playerState, updatePlayerState } = playerStore();
  const { gameState, updateGameState } = gameStore();
  const { gameScene, updateGameScene } = sceneStore();

  useEffect(() => {
    console.log("myState", myState);

    const checkedNum = Object.values(gameState).filter(
      (i) => i.changeScene === true
    ).length;
    if (checkedNum > 0 && checkedNum === Object.values(gameState).length) {
      console.log(checkedNum);
      updateGameScene("scene2");
    }
  }, [gameState]);

  const selectRole = (selectRole) => {
    conn.invoke("SelectRole", selectRole);
  };

  const readyChangeScene = (prepare) => {
    conn.invoke("ReadyChangeScene", prepare);
    // 這邊的prepare用true跟false
  };

  return (
    <section
      className="w-full h-screen flex flex-col items-center p-6
  bg-[url('/src/asset/BG/bg-03.webp')] bg-cover sm:bg-center  bg-blend-screen bg-no-repeat bg-black"
    >
      <div className="flex flex-1 flex-col gap-y-2 items-center">
        <div
          className="bg-black bg-opacity-30 p-3 rounded-md w-fit text-center font-bold text-white"
          onClick={() => {
            console.log("conn", conn);
            console.log("myState", myState);
            console.log("gameState", gameState);
            console.log("playerState", playerState);
            console.log("gameScene", gameScene);
          }}
        >
          請選擇你要操作的角色
        </div>
        <div className="w-full bg-black">
          {characters.map((char, i) => {
            const isSelected = Object.values(playerState).some(
              (player) => player.selectRole === char.name
            );
            const isSelectable = Object.values(playerState)
              .filter((i) => i.playerName === myState)
              .some((i) => i.selectRole === "");
            const thisButt = Object.values(playerState).filter(
              (i) => i.selectRole === char.name
            );
            const buttonDisplay =
              thisButt.length > 0
                ? char.name + " - " + thisButt[0].playerName
                : char.name;
            return (
              <React.Fragment key={i}>
                <HomeButton
                  isSelectable={isSelectable}
                  isSelected={isSelected}
                  charData={char}
                  selectRole={selectRole}
                  buttonDisplay={buttonDisplay}
                  // joinChatRoom={joinRoom}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-black bg-opacity-70 px-6 w-full rounded-lg text-center relative gap-y-2">
        <p className="text-white mt-2">已選擇角色</p>
        <div className="flex flex-col flex-1w-full h-full gap-2 ">
          {characters.map((char, i) => {
            const isSelected = Object.values(playerState).some(
              (player) => player.selectRole === char.name
            );
            const thisButt = Object.values(playerState).filter(
              (i) => i.selectRole === char.name
            );
            const buttonDisplay =
              thisButt.length > 0
                ? char.name + " - " + thisButt[0].playerName
                : char.name;
            const isSelectable = Object.values(playerState)
              .filter((i) => i.playerName === myState)
              .some((i) => i.selectRole === char.name);
            // console.log(
            //   "Object.values(playerState)",
            //   Object.values(playerState)
            // );
            // console.log("isSelectable", isSelectable, "char", char.name);
            return (
              <React.Fragment key={i}>
                <HomeButton
                  isSelected={!isSelected}
                  buttonDisplay={buttonDisplay}
                  isSelectable={isSelectable}
                  charData={char}
                  selectRole={selectRole}
                  inSelectArea={true}
                  playerName={myState}
                  // joinChatRoom={joinRoom}
                />
              </React.Fragment>
            );
          })}
        </div>
        <div className=" pb-3 flex  flex-1 gap-2  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
          <button
            disabled={Object.values(playerState)
              .filter((i) => i.playerName === myState)
              .some((i) => i.selectRole === "")}
            className="w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => readyChangeScene(true)}
          >
            確認
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
          {/* <div className="w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            確認並輸入怪物資料
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </div> */}
        </div>
      </div>
    </section>
  );
};

const EnemySelect = () => {
  return (
    <section
      className="w-full h-screen flex flex-col gap-y-2 items-center py-6
bg-[url('/src/asset/BG/bg-03.webp')] bg-cover sm:bg-center  bg-blend-screen bg-no-repeat bg-black"
    >
      <div className="w-full overflow-y-auto flex-1 flex flex-col gap-y-2 items-center">
        <div
          className="bg-black bg-opacity-30 p-3 rounded-md w-fit text-center font-bold text-white"
          onClick={() => {
            // console.log("conn", conn);
            // console.log("myState", myState);
            // console.log("gameState", gameState);
            // console.log("playerState", playerState);
            // console.log("gameScene", gameScene);
          }}
        >
          怪物資訊
        </div>
        <div className="bg-black bg-opacity-30 p-3 rounded-md w-fit text-center font-bold text-white">
          選擇難度
        </div>
        <div className="bg-black bg-opacity-30 p-3 rounded-md w-fit text-center font-bold text-white">
          選擇門的數量
        </div>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose a country</option>
          <option className="min-h-3"
          value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div className=" py-3 flex w-2/3  gap-2  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
        <button
          // disabled={Object.values(playerState)
          //   .filter((i) => i.playerName === myState)
          //   .some((i) => i.selectRole === "")}
          className="w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          // onClick={() => readyChangeScene(true)}
        >
          確認
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
        {/* <div className="w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            確認並輸入怪物資料
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </div> */}
      </div>
    </section>
  );
};
