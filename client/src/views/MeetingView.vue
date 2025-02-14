<template> 
  <div class="m-2">
    <div class="">
      <h1 class="text-2xl font-bold">Meeting: {{ meetingId }}</h1>
    </div>
    <div class="flex w-full gap-2 mt-6">
      <div class="inline-flex">
        <video ref="video" autoplay></video>
      </div>
      <div class="inline-flex">
        <video ref="otherVideo" :srcObject="remoteSrc" autoplay></video>
      </div>
    </div>
  </div>
</template>

<script>
import webRTC from '@/mixins/webRTC';
''
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
  },
  async mounted() {
    console.log("host", this.host);
    const video = this.$refs.video;
    const constraints = {
      video: true,
      audio: true
    };
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    this.setupRTCConnection(stream, true, this.$refs.otherVideo);
    if (this.host) {
      if (this.$socket.connected) {
        this.sendOffer();
      } else {
        this.$socket.on("connect", () => {
          this.sendOffer();
        });
      }
    }
    console.log("connected", this.$socket.connected)
  },
  computed: {
    host() {
      return this.$store.getters.host;
    }
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