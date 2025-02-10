import { io } from "socket.io-client";

export default {
  data() {
    return {
      peer: null,
      remoteSrc: null,
    };
  },
  methods: {
    async setupRTCConnection(localStream, host, remoteStream) {
      const configuration = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" } // Google's primary STUN server [1][7]
        ]
      };

      const peerConnection = new RTCPeerConnection(configuration);

      peerConnection.ontrack = (event) => { 
        remoteStream.srcObject = event.streams[0];
      };

      peerConnection.onicecandidate = (event) => {
        this.$socket.emit("candidate", event.candidate);
      };

      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });

      this.$socket.on('user-connected', async (userId) => {
        this.peer = userId;

        if (host) {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);

          let offerToSend =  {
            id: userId,
            description: peerConnection.localDescription 
          };
          this.$socket.emit('offer', offerToSend);
        }
      });

      this.$socket.on('offer', async (description, userId) => {
        this.peer = userId;
        peerConnection.setRemoteDescription(description);
        let answer = await peerConnection.createAnswer();
        peerConnection.setLocalDescription(answer);
        this.$socket.emit('answer', { id: this.peer, description: answer });
      });

      this.$socket.on("answer", (description) => {
        peerConnection.setRemoteDescription(description);
      });

      this.$socket.on('candidate', (data) => {
        peerConnection.addIceCandidate(data);
      });
   
      this.$socket.on('connect', () => {
        this.$socket.emit("join", this.$socket.id);
      });
    }
  },
}