import { useState } from "react";
import Client from '../components/clients';
import Editor from "../components/Editor";

const EditorPage = () => {
    const [clients, setClients] = useState([
        { socket: 1, username: "Ram mishraRam mishraRam mishra" },
        { socket: 2, username: "john doe" },
        { socket: 3, username: "jsfgdgsgfdgdfgdfgdfg" },
        { socket: 4, username: "Ram mishra" },
        { socket: 5, username: "john doe" },
    ])

    return (
        <>
            <div className="mianWrapper h-screen grid grid-cols-[250px,1fr]">
                <div className="aside flex flex-col p-[10px]">
                    <div className="asideInner flex-1">
                        <div className="logo border-b-[1px] border-[#424242]">
                            <img
                                className="HomePageLogo mx-auto h-[60px] my-[20px]"
                                src="/RealtimeCodeCollaboration.png"
                                alt="CodeFusion Logo"
                            />
                        </div>
                        <h3 className="font-bold my-[20px]">Connections</h3>
                        <div className="clientslist flex flex-wrap justify-evenly gap-3">
                            {clients.map((client) => (
                                <Client key={client.socket} username={client.username} />
                            ))}
                        </div>
                    </div>
                    <button className="transition-all text-black ease-in-out duration-300 h-10 bg-[#ffffff] rounded-[5px] font-bold hover:bg-[#8f8f8f] mb-3">
                        Copy RoomID
                    </button>
                    <button className="transition-all ease-in-out duration-300 h-10 bg-[#61dafb] rounded-[5px] font-bold hover:bg-[#309cb9]">
                        Leave
                    </button>
                </div>
                <Editor />
            </div>

        </>
    )
}

export default EditorPage;