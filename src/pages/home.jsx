import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";

const Home = () => {
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("");

  const createRoom = (e) => {
    e.preventDefault();
    setRoomID(uuidV4());
  };

  return (
    <>
      <div className="homePageWrapper">
        
        <div className="formWrapper bg-[#242f42] text-[#fff]">
          <img
            className="HomePageLogo"
            src="logo192.png"
            alt="CodeFusion Logo"
          />
          <h4 className="mainLable">Enter Room ID</h4>
          <div className="inputGroup">
            <input
              onChange={(e) => {
                setRoomID(e.target.value);
              }}
              value={roomID}
              type="text"
            />
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              type="text"
            />
            <button></button>
            <span className="createinfo">
              <a href="" className="createRoom" onClick={createRoom}>Create a new Room</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
