import React, { useState } from "react";

const ChatRoom = ({ messages, sendMessage }) => {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <div>
        <h1>say something</h1>
        <input
          className="border-solid border-2 border-black rounded-md"
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <button
        className="h-8 w-20 bg-green-600 shadow-md rounded-md mt-4"
        onClick={() => {
          sendMessage(msg);
          console.log("messages", messages);
        }}
      >
        submit
      </button>
      {messages &&
        messages.map((msg, i) => (
          <table>
            <tr key={i}>
              <td>
                {msg.msg} - {msg.username}{" "}
              </td>
            </tr>
          </table>
        ))}
      <button
        className="h-8 w-20 bg-green-600 shadow-md rounded-md mt-4"
        onClick={() => {
          console.log("messages", messages);
        }}
      >
        log
      </button>
      {/* <p className="text-5xl font-extrabold bg-gradient-to-b from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text stroke-2 ">
        火焰守衛
      </p>
      <div className="relative">
        <img
          class="w-10 h-10 rounded object-none object-top"
          src={acc}
          alt="Default avatar"
        />
      </div> */}
    </div>
  );
};

export default ChatRoom;
