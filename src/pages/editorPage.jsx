import { useState } from "react";
import Client from '../components/clients';

const EditorPage = () => {
    const [clients, setClients] = useState([
        { socket: 1, username: "Ram mishra" },
        { socket: 2, username: "john doe" },
        { socket: 3, username: "joe rogan" },
    ])

    return (
        <>
            <div className="mianWrapper">
                <div className="aside">
                    <div className="asideInner">
                        <div className="logo"><img
                            className="HomePageLogo mx-auto h-[80px] mb-[20px]"
                            src="/RealtimeCodeCollaboration.png"
                            alt="CodeFusion Logo"
                        />
                        </div>
                        <h3>Connections</h3>
                        <div className="clientslist">
                            {clients.map((client) => (
                                <Client key={client.socket} username={client.username} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditorPage;