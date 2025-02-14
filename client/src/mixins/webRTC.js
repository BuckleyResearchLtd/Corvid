export default {
  data() {
    return {
      peer: null,
      remoteSrc: new MediaStream(),
      peerConnection: null,
      streamReady: false,
    };
  },
  methods: {
    async setupRTCConnection(localStream, host, remoteVideo) {
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
        ]
      };

      this.peerConnection = new RTCPeerConnection(configuration);

      this.peerConnection.ontrack = (event) => { 
        this.streamReady = true;
        console.log("remotevideo", remoteVideo);
        // remoteVideo.srcObject = event.streams[0];
        event.streams[0].getTracks().forEach(track => {
          console.log("adding track", track);
          this.remoteSrc.addTrack(track);
        });
      };

      this.peerConnection.onicecandidate = (event) => {
        this.$socket.emit("candidate", event.candidate, this.meetingId);
      };

      localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, localStream);
      });

      this.$socket.on('user-connected', async (userId) => {
        this.peer = userId;

        if (host) {
          await this.sendOffer();
        }
      });

      this.$socket.on('offer', this.handleOffer);

      this.$socket.on("answer", (description) => {
        this.peerConnection.setRemoteDescription(description);
      });

      this.$socket.on('candidate', (data) => {
        this.peerConnection.addIceCandidate(data);
      });
   
      this.$socket.on('connect', () => {
        console.log("connected, joining meeting", this.meetingId);
        this.$socket.emit("join", this.meetingId);
      });
    },
    async handleOffer(description) {
      if (this.host) { return; }
      console.log("handleOffer");
      this.peerConnection.setRemoteDescription(description);
      let answer = await this.peerConnection.createAnswer();
      this.peerConnection.setLocalDescription(answer);
      this.$socket.emit('answer', { id: this.meetingId, description: answer });
    },
    async sendOffer() {
      console.log("creating call");
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      let offerToSend =  {
        id: this.meetingId,
        description: offer 
      };
      console.log("sending offer", offerToSend);
      this.$socket.emit('offer', offerToSend);
    }
  },
  computed: {
    meetingId() {
      return this.$route.params.id;
    }
  },
}