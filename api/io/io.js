import wrtc from '@roamhq/wrtc';

let users = {};
export function setupConnection(io) { 
  io.on('connection', (socket) => {
    socket.on('join', (userId) => {
      socket.broadcast.emit('user-connected', userId);
    });

    socket.on('offer', ({ id, description }) => {
      users[socket.id] = id;
      socket.to(id).emit('offer', description, socket.id);
    });

    socket.on('answer', ({ id, description }) => {
      users[socket.id] = id;
      socket.to(id).emit('answer', description);
    });

    socket.on('candidate', (signal) => {
      const user = users[socket.id];
      if (user) {
        socket.to(user).emit('candidate', signal);
      }
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
    });
  }); 
}