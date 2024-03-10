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
} from "./utils/useStore";
import { mylocalStore } from "./utils/usePersistStore";

const App = () => {
  const { conn, updateConn } = connStore();
  const { myState, updateMyState } = myStateStore();
  const { roomState, updateRoomState } = roomStore();
  const { gameState, updateGameState } = gameStore();
  const { playerState, updatePlayerState } = playerStore();
  const mylocalsotre = myStateStore((store) => store.myState);
  const updatemylocalsotre = mylocalStore((store) => store.updatemyState);

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

  return <>{!conn ? <HomePage joinRoom={joinRoom} /> : <RoleSelectPage />} </>;
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
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium
         text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={() => {
              setLoginData((prev) => ({ ...prev, username: "可拉" }));
            }}
          >
            可拉
          </p>
          <p
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium
         text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={() => {
              setLoginData((prev) => ({ ...prev, username: "大蔥" }));
            }}
          >
            大蔥
          </p>
          <p
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium
         text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={() => {
              setLoginData((prev) => ({ ...prev, username: "阿修" }));
            }}
          >
            阿修
          </p>
          <p
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium
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
  const { gameState, updateGgameState } = gameStore();

  useEffect(() => {
    console.log("myState", myState);
  }, [myState]);

  const selectRole = (selectRole) => {
    conn.invoke("selectRole", selectRole);
  };

  return (
    <section
      className="w-full h-screen flex flex-col items-center p-6
  bg-[url('/src/asset/BG/bg-03.webp')] bg-cover sm:bg-center  bg-blend-screen bg-no-repeat bg-black"
    >
      <div className="flex flex-1 flex-col gap-y-2 items-center">
        {" "}
        <div
          className="bg-black bg-opacity-30 p-3 rounded-md w-fit text-center font-bold text-white"
          onClick={() => {
            console.log("conn", conn);
            console.log("myState", myState);
            console.log("gameState", gameState);
            console.log("playerState", playerState);
          }}
        >
          請選擇你要操作的角色
        </div>
        {characters.map((char, i) => {
          const isSelected = Object.values(playerState).some(
            (player) => player.selectRole === char.name
          );
          return (
            <React.Fragment key={i}>
              <HomeButton
                isSelected={isSelected}
                charData={char}
                selectRole={selectRole}
                // joinChatRoom={joinRoom}
              />
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex flex-1 flex-col bg-black bg-opacity-70 px-6 w-full rounded-lg text-center relative gap-y-2">
        <p className="text-white mt-2">已選擇角色</p>
        {characters.map((char, i) => {
          const isSelected = Object.values(playerState).some(
            (player) => player.selectRole === char.name
          );
          return (
            <React.Fragment key={i}>
              <HomeButton
                isSelected={!isSelected}
                charData={char}
                selectRole={selectRole}
                // joinChatRoom={joinRoom}
              />
            </React.Fragment>
          );
        })}

        <div className=" absolute bottom-2 flex  flex-1 gap-2  justify-center items-center text-white font-medium rounded-lg text-sm  text-center">
          <div className="w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
          </div>
          <div className="w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
          </div>
        </div>
      </div>
    </section>
  );
};
