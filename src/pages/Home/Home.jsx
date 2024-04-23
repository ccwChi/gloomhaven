import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { myStateStore, playerStore } from "../../utils/useStore";
import { record } from "../../asset/data";
import { useLocalStorage } from "primereact/hooks";
// import { useSessionStorage } from "primereact/hooks";

const Home = ({ joinRoom, isLoading, setIsLoading }) => {
  const [logingData, setLoginData] = useState({
    playerName: "",
    record: "紀錄",
  });
  const [myStateLocal, setMyStateLocal] = useLocalStorage({}, "MyState");
  const { myState, updateMyState } = myStateStore();
  const { playerState } = playerStore();
  const [scene, setScene] = useLocalStorage("", "Scene");
  // 用來記錄目前場景，每個場景當四個人都按OK的的話則前往下一個場景

  const handelEnterGame = (e) => {
    e.preventDefault();
    if (!!logingData.playerName && !!logingData.record) {
      joinRoom(logingData.playerName, logingData.record);
      if (scene === "scene3") return;
      updateMyState({ player: logingData.playerName });
      setMyStateLocal({ player: logingData.playerName });
    }
  };

  const playerList = [
    { name: "胖虎" },
    { name: "小夫" },
    { name: "靜香" },
    { name: "大雄" },
  ];
  return (
    <>
      <div
        className="w-80 h-24 bg-[length:20rem_6rem] bg-no-repeat bg-transparent border-none flex justify-center items-center
               bg-[url('/src/asset/img/title.webp')]"
      >
        <img
          className="w-40 -translate-y-1"
          src={require(`../../asset/img/titletext.webp`)}
          alt="幽港迷城"
        />
      </div>
      <div className="px-4 w-full flex flex-col flex-1 gap-y-4 p-1 overflow-y-auto">
        {record.map((record, i) => (
          <div className="relative" key={"record" + i}>
            <Fieldset
              legend={record.name}
              toggleable
              className="bg-transparent rounded-xl border-none "
              pt={{
                legend: { className: " translate-x-8" },
                toggler: { className: " h-fit !m-0 !p-2" },
                content: {
                  className: "-translate-y-4  rounded-lg text-white",
                },
              }}
            >
              <div className="bg-black bg-opacity-30 rounded-lg p-2" key={i}>
                {record.ChapterDescript.map((event, i) => (
                  <div className="flex flex-col" key={"ChapterDescript" + i}>
                    <p className="w-fit py-1">{event.map}&nbsp;</p>
                    <p className="mx-2">{event.describe}</p>
                  </div>
                ))}
              </div>
            </Fieldset>
            <Checkbox
              disabled
              onChange={(e) => {
                setLoginData((prev) => ({ ...prev, record: e.target.name }));
              }}
              checked={logingData.record === record.name}
              name={record.recordName}
              className="absolute top-0 size-12"
            ></Checkbox>
          </div>
        ))}
      </div>
      <form className="w-full max-w-md flex flex-col gap-x-2 gap-y-4 mb-12 shadow-md">
        <div className="flex flex-col gap-2">
          <p className="text-white ps-4 ">* 請跟夥伴們取不同名稱</p>
          <div className="inline-flex flex-wrap justify-content-center gap-3 bg-black rounded-xl text-white  p-3 w-full ">
            {playerList.map((player) => (
              <>
                <div className="flex align-items-center flex-1">
                  <Checkbox
                    name={player.name}
                    value={player.name}
                    onChange={() => {
                      setLoginData((prev) => ({
                        ...prev,
                        playerName: player.name,
                      }));
                    }}
                    checked={logingData.playerName === player.name}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    {player.name}
                  </label>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="p-inputgroup flex-1">
          <InputText
            placeholder="我就是想叫多拉A夢"
            onChange={(e) => {
              setLoginData((prevData) => ({
                ...prevData,
                playerName: e.target.value,
              }));
            }}
          />
          <Button
            icon={"pi pi-arrow-right"}
            iconPos="right"
            label="進入遊戲"
            className="p-button-warning"
            disabled={isLoading || !logingData.playerName}
            onClick={(e) => {
              handelEnterGame(e);
              setIsLoading(true);
            }}
          />
        </div>
      </form>
    </>
  );
};

export default Home;
