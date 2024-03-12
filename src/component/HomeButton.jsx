import React from "react";

const HomeButton = ({
  myData,
  charData,
  playersData,
  buttonDisplay,
  selectRole,
  isSelected,
  isSelectable = true,
  inSelectArea = false,
}) => {
  // console.log(charData.name, isSelected);
  return (
    <button
      className={`${
        charData.style
      } shadow-lg rounded-lg text-lg px-5  text-center me-2 mb-2 font-bold w-full py-2.5 h-fit ${
        isSelected && "hidden"
      }`}
      disabled={!isSelectable}
      onClick={() => {
        !inSelectArea ? selectRole(charData.name) :  selectRole("");
      }}
      // 玩家A已選擇，則上面disable，下面只能點自己的
    >
      {buttonDisplay}
    </button>
  );
};

export default HomeButton;
