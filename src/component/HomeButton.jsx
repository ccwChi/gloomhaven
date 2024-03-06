import React from "react";

const HomeButton = ({
  username,
  roleName,
  style,
  joinChatRoom,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`${style} font-bold text-4xl w-80`}
      onClick={() => {
        joinChatRoom(roleName, "kickMoush");
        console.log(roleName, "kickMoush");
      }}
    >
      {roleName}
    </button>
  );
};

export default HomeButton;
