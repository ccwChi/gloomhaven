import React from "react";

const HomeButton = ({
  charData,
  username,
  roleName,
  style,
  joinChatRoom,
  selectRole,
  isSelected,
  disabled = false,
}) => {
  // console.log(charData.name, isSelected);
  return (
    <button
      disabled={isSelected}
      className={`${
        !isSelected ? charData.style : charData.disableStyle
      } font-bold text-4xl w-full  ${isSelected && "hidden"}`}
      onClick={() => {
        selectRole(charData.name);
      }}
    >
      {charData.name}
    </button>
  );
};

export default HomeButton;
