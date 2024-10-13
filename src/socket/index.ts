import { Socket, io } from "socket.io-client";

class SocketSingleton {
    private static instance: Socket;
    private constructor() {}
    public static getInstance(): Socket {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = io("http://localhost:5001");
        }
        return SocketSingleton.instance;
    }
}
export default SocketSingleton;