import React from "react";

const HomeButton = ({
  charData,
  username,
  roleName,
  style,
  joinChatRoom,
  selectRole,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${charData.style} font-bold text-4xl w-80`}
      onClick={() => {
        selectRole(charData.name)
      }}
    >
      {charData.name}
    </button>
  );
};

export default HomeButton;
