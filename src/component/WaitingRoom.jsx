import React from "react";
import { useState } from "react";

const WaitingRoom = ({ joinChatRoom }) => {
  const [username, setUsername] = useState(null);
  const [chatroom, setChatroom] = useState(null);
  return (
    <>
      <div>
        <h1>username</h1>
        <input
          className="border-solid border-2 border-black rounded-md"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <h1>chatroom</h1>
        <input
          className="border-solid border-2 border-black rounded-md"
          onChange={(e) => setChatroom(e.target.value)}
        />
      </div>
      <button
        className="h-8 w-20 bg-green-600 shadow-md rounded-md mt-4"
        onClick={() => {joinChatRoom(username, chatroom); console.log(username, chatroom)}}
      >
        submit
      </button>
    </>
  );
};

export default WaitingRoom;
