<template> 
<div class="flex w-full">
  <div class="inline-flex border-red-500">
    <video ref="video" autoplay></video>
  </div>
  <div class="inline-flex border-red-500 ">
    <video ref="otherVideo" :src="remoteSrc" autoplay></video>
  </div>
</div>
</template>

<script>
import webRTC from '@/mixins/webRTC';

export default {
  data() {
    return {
      stream: null,
      mediaRecorder: null,
      chunks: [],
      chunkLengthms: 1,
      sourceBuffer: null,
    };
  },
  mixins: [webRTC],
  methods: {
    setupRecorder(stream) {
      let options = {
        type: "video",
        mimeType: "video/webm",
        disableLogs: true,
      };
      this.mediaRecorder = new MediaRecorder(stream, options); 
      this.mediaRecorder.ondataavailable = (event) => {
        console.log("data available");
        this.$socket.emit("videoChunk", event.data);
      };
      this.mediaRecorder.start(this.chunkLengthms);
    },
    sendVideo(chunk) {
      const arrayBuffer = new Uint8Array(chunk).buffer;
      this.sourceBuffer.appendBuffer(arrayBuffer);
    },
    setupOtherVideo() {
      const otherVideo = this.$refs.otherVideo;
      const mediaSource = new MediaSource();

      otherVideo.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener('sourceopen', () => {
        this.sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8, opus"');
      });
    },
  },
  async mounted() {
    // this.$socket.on('connect', () => {
    //   console.log('Connected to server')
    // });

    // this.setupOtherVideo();
    // this.$socket.on("sendvideo", this.sendVideo);

    const video = this.$refs.video;
    const constraints = {
      video: true,
      audio: true
    };
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    this.setupRTCConnection(stream, false, this.$refs.otherVideo);



    // console.log(this.$socket);
    // console.log("emitting");
    // this.$socket.emit("test");

  }
}
</script>

<style scoped>
.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.w-full {
  width: 100%;
}

.border-red-500 {
  border: 1px solid #f56565;
}
</style>