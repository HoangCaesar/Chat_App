import io from 'socket.io-client'; // Add this

let socket: any;

const connectSocket = (user_id: string) => {
    socket = io('https://netsmessenger-api.onrender.com', {
        query: `user_id=${user_id}` as any,
    });
    socket.emit('msg', 'hei hei')
}; // Add this -- our server will run on port 4000, so we connect to it from here

export { socket, connectSocket };
