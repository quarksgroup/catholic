<template>
  <div class="study">
    <div class="video">
      <iframe
        width="560"
        height="315"
        :src="`//www.youtube.com/embed/${videoURL}`"
        frameborder="0"
        allowfullscreen
        v-if="videoURL"
      ></iframe>
      <div class="invalid-video" v-else>
        <i class="fa fa-ban fa-2x" />
        <p>video not found</p>
      </div>
    </div>
    <div class="description">
      <div class="study-title">
        <h5 class="truncate">{{video.title}}</h5>
        <ellipsis :dropdowns="dropdowns" @readMore="alert('reading more')" />
      </div>
      <div class="study-subtitle line-clamp">
        <p>{{video.body}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "video-card-component",
  props: { video: Object },
  data() {
    return {
      dropdowns: [{ name: "Read more", action: this.readMore }]
    };
  },
  computed: {
    videoURL() {
      // if (this.video.video_url) {
      //   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      //   const match = this.video.video_url.match(regExp);
      //   return match && match[2].length === 11
      //     ? match[2]
      //     : this.video.video_url;
      // } else
      return null;
    }
  },
  mounted() {},
  methods: {
    readMore() {
      alert("reading more...");
    }
  }
};
</script>

<style lang="scss">
.study {
  background: white;
  box-shadow: 0 2px 5px 0 rgba(32, 33, 36, 0.23);
  border-radius: 3px;
  height: 100%;

  .video {
    position: relative;
    min-height: 150px;
    background: #23063e;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    iframe {
      background-color: black;
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .invalid-video {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        color: white;
      }
      p {
        margin-bottom: 0;
        margin-top: 1rem;
        color: #fff;
      }
    }
  }
  .description {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .study-title {
      margin-bottom: 0.65rem;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;

      h5 {
        font-size: 1.15rem;
        font-weight: bold;
        flex: 1;
      }
    }
    .study-subtitle {
      margin-bottom: 0.75rem;
      p {
        color: inherit;
        font-size: 0.85rem;
        opacity: 0.9;
      }
    }
    button {
      align-self: flex-end;
      width: fit-content;
      margin-left: auto;
      margin-top: 1rem;
      padding: 1rem 0.75rem;
      font-size: 0.9rem !important;
    }
  }
}
</style>