import {io} from "socket.io-client"

export const initScoket = async () => {
    const options = {
        'force new connection': true,
        reconectionAttempt : 'infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(process.env.REACT_APP_BACKEND_URL, options)
}