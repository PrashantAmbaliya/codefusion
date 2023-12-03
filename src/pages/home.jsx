import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("");

  const joinroom = () => {
    if (!roomID || !username) {
      toast.error("RoomID and Username is Required!");
      return;
    }

    navigate(`/editor/${roomID}`,
      {
        state: {
          username,
        }
      }
    );
  };

  const createRoom = (e) => {
    e.preventDefault();
    setRoomID(uuidV4());
    toast.success("New Room Created!");
  };

  return (
    <>
      <div className="homePageWrapper flex items-center justify-center h-screen">
        <div className="formWrapper bg-[#242f42] rounded-[10px] p-[20px] w-[400px] max-w-[90%] ">
          <img
            className="HomePageLogo mx-auto h-[80px] mb-[20px]"
            src="/RealtimeCodeCollaboration.png"
            alt="CodeFusion Logo"
          />
          <h4 className="mainLable font-bold pb-1 text-[#fff]">
            Enter Room ID
          </h4>
          <div className="inputGroup flex flex-col gap-3">
            <input
              className="h-8 rounded-[5px] pl-[10px] bg-[#eee]"
              onChange={(e) => {
                setRoomID(e.target.value);
              }}
              value={roomID}
              type="text"
              placeholder="ROOM ID"
            />
            <input
              className="h-8 rounded-[5px] pl-[10px] bg-[#eee]"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              type="text"
              placeholder="Username"
            />
            <button
              className="transition-all ease-in-out duration-300 bg-[#61dafb] rounded-[5px] h-[35px] w-[100px] ml-auto font-bold hover:bg-[#309cb9]"
              onClick={joinroom}
            >
              JOIN
            </button>
            <span className="createinfo text-[#fff] m-auto">
              Create a{" "}
              <a
                href="/editor/"
                className="createRoom transition-all ease-in-out duration-300 text-[#61dafb] hover:text-[#309cb9]"
                onClick={createRoom}
              >
                New Room
              </a>
            </span>
          </div>
        </div>

        <footer className="fixed bottom-0 p-1 text-[#fff]">
          <h4>© {new Date().getFullYear()} Prashant Ambaliya</h4>
        </footer>
      </div>
    </>
  );
};

export default Home;
