import React, { useEffect } from "react";
import { characters } from "../asset/data";

const WaitingRoom = ({ roomMember }) => {
  useEffect(() => {}, [roomMember]);

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center gap-8 
     bg-fit bg-center bg-blend-screen bg-no-repeat "
    >
      {roomMember.map((role, i) => (
        <div key={i}>
          <button className="">{role.username}</button>
        </div>
      ))}

      <button
        onClick={() => {
          console.log(roomMember);
        }}
      >
        Console.log用
      </button>
    </div>
  );
};

export default WaitingRoom;
