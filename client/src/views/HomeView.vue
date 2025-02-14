<template>
  <div class="flex w-screen h-screen">
    <div class="w-4/6 h-96 bg-red-500 my-auto mx-auto bg-slate-300 px-12">
      <div class="m-6">
        <h1 class="text-4xl">
          Remote Track
        </h1>
      </div>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div class="bg-slate-100 flex flex-col p-4 rounded-sm">
          <div class="card-title">Join</div>
          <div class="card-subtitle">
            Enter Code To Join
          </div>
          <div class="flex gap-2 my-4 mx-0 px-0 w-full">
            <input type="text" v-model="meetingId" class="p-2 border border-slate-300 rounded-sm min-w-0" />
            <button class="button min-w-14 py-4 ml-auto" @click="joinMeeting">Join</button>
          </div>
        </div>
        <div class="bg-slate-100 flex flex-col p-4 rounded-sm">
          <div class="card-title">Host</div>
          <div class="card-subtitle">
            Create a new meeting
          </div>
          <button class="button my-4" @click="createMeeting">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      meetingId: "",
    }
  },
  methods: {
    joinMeeting() {
      this.$store.commit("setHost", false);
      this.$router.push(`/meeting/${this.meetingId}`);
    },
    createMeeting() {
      this.$store.commit("setHost", true);
      this.meetingId = Math.random().toString(36).substring(2, 16 + 2);
      console.log(this.meetingId);
      this.$router.push(`/meeting/${this.meetingId}`, { props: { host: "true" }},  );
    }
  },
  mounted() {
    console.log("mounted");
    if (this.$route.params.meetingId) {
      this.meetingId = this.$route.params.meetingId;
    }
  },
}
</script>
<style lang="postcss">
.card-title {
  @apply mb-10 text-xl;
}

.card-subtitle {
  @apply my-2;
}

.button {
  @apply bg-slate-500 text-white rounded-md p-2
}

</style>