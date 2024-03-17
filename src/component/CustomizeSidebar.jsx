import React, { useEffect } from "react";
import { record } from "../asset/data";
import { myStateStore, sidebarStore } from "../utils/useStore";
import { Sidebar } from "primereact/sidebar";

const CustomizeSidebar = () => {
  const { sidebarVisible, updateSidebarVisible } = sidebarStore();
  const { myState, updateMyState } = myStateStore();

  useEffect(() => {}, [myState]);
  function calculateStageLevel(record) {
    const totalLevel = record[0].roleData.reduce(
      (acc, role) => acc + role.level,
      0
    );
    // 計算平均等級
    const averageLevel = Math.ceil(totalLevel / record[0].roleData.length);
    // console.log(averageLevel);
    // 使用 Math.ceil() 函數向上取整

    return averageLevel;
  }

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        position="top"
        visible={sidebarVisible}
        onHide={() => updateSidebarVisible(false)}
        className="bg-amber-100 "
        pt={{ header: { className: "hidden" } }}
      >
        <div
          className="mt-4 bg-amber-800 text-white w-fit px-2 py-1 rounded-lg"
          onClick={() => {
            console.log(myState);
          }}
        >
          遊戲資訊
          <p className="w-fit text-xs text-rose-100">
            關卡等級 ( L ) = 全隊平均等級 / 2 向上取整
          </p>
        </div>
        <div className="p-2">
          <div className="flex gap-2 w-full ">
            <p className=" flex-1">{myState.role}</p>
            <div className="inline-flex flex-1">
              <p className="w-fit">{"經驗值: "}&nbsp;</p>
              <p>{myState.exp}</p>
            </div>
            <div className="inline-flex flex-1">
              <p className="w-fit">{"最大HP: "}&nbsp;</p>
              <p>{myState.exp}</p>
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="inline-flex flex-1 ">
              <p className="w-fit">{"等級: "}&nbsp;</p>
              <p>{myState.level}</p>
            </div>
            <div className="inline-flex flex-1 ">
              <p className="w-fit">{"金幣: "}&nbsp;</p>
              <p>{myState.gold}</p>
            </div>
            <div className="inline-flex flex-1">
              <p className="w-fit">{"關卡等級: "}&nbsp;</p>
              <p>{calculateStageLevel(record)}</p>
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="inline-flex flex-1 ">
              <p className="w-fit">{"物品: "}&nbsp;</p>
              {myState.length > 0 &&
                myState.object.map((item, index) => (
                  <React.Fragment key={index}>
                    <span>{item}</span>
                    {index !== myState.object.length - 1 && <span>, </span>}
                  </React.Fragment>
                ))}
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="inline-flex flex-1 "></div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default CustomizeSidebar;
