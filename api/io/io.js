import wrtc from '@roamhq/wrtc';

let users = {};
export function setupConnection(io) { 
  console.log("setup");
  io.on('connection', (socket) => {
    console.log('connected');
    socket.on('join', (meetingId) => {
      socket.join(meetingId);
      console.log("socket", socket.id, "joined", meetingId);
      socket.broadcast.emit('user-connected', meetingId);
    });

    socket.on('offer', ({ id: meetingId, description }) => {
      console.log('offer seting for meeting', meetingId);
      socket.to(meetingId).emit('offer', description);
    });

    socket.on('answer', ({ id: meetingId, description }) => {
      console.log("answer sent for meeting", meetingId);
      socket.to(meetingId).emit('answer', description);
    });

    socket.on('candidate', (signal, meetingId) => {
      socket.to(meetingId).emit('candidate', signal);
    });

    socket.on('disconnect', () => {
    });
  }); 
}