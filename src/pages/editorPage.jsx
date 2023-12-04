import { useEffect, useRef, useState } from "react";
import Client from '../components/clients';
import { initScoket } from "../socket";
import ACTIONS from "../Actions";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Editor from "../components/Editor";

const EditorPage = () => {

    const [clients, setClients] = useState([])
    const [value, setValue] = useState("console.log('hello world!');");
    const [code, setCode] = useState([])

    const socketRef = useRef(null);
    const location = useLocation();
    const reactNavigator = useNavigate();
    const { roomID } = useParams();



    useEffect(() => {
        const init = async () => {
            socketRef.current = await initScoket();
            socketRef.current.on('connect_error', (err) => handedlErro(err))
            socketRef.current.on('connect_faild', (err) => handedlErro(err))

            function handedlErro(err) {
                console.log(`socket error: ${err}`);
                toast.error('Socket Connection Faild Try Again')
                reactNavigator('/')
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomID,
                username: location.state?.username
            });

            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketID }) => {
                if (location.state?.username !== username) {
                    toast.success(`${username} has Joined`)
                }
                setClients(clients);
            })

            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketID, username }) => {
                toast.error(`${username} has Left`)
                setClients((prev) => {
                    return prev.filter((client) => client.socketID !== socketID);
                })
                console.log(clients);
            })

            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ roomID, value }) => {
                if (value !== null) {
                    setValue(value)
                }
            })


        }
        init();
        return () => {
            socketRef.current.disconnect();
        }
    }, [])

    if (!location.state.username) {
        return <Navigate to="/" />
    }

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
                                <Client key={client.socketID} username={client.username} />
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
                <Editor value={value} socketRef={socketRef} roomID={roomID} />
            </div>

        </>
    )
}

export default EditorPage;