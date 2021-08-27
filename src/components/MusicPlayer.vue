<script>
import { reactive, ref } from "@vue/reactivity";
import {
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "MusicPlayer",
  setup() {
    const audio = ref({});
    const store = useStore();
    const axios = inject("axios");
    const state = reactive({
      src: "", //源文件
      songName: "", //歌曲名
      songPic:
        "https://s4.music.126.net/style/web2/img/default/default_album.jpg", //图片
      songArtist: "", //创作者
      duration: "", //歌曲格式化时长
      paused: true, //播放状态（是否暂停）
      sliderPosition: 0, //当前播放进度点
    });
    let interval; //定时器
    //监听歌曲切换
    watch(
      () => store.state.playSongId,
      async (id) => {
        state.src = await axios
          .get("/song/url?id=" + id)
          .then((res) => res.data[0].url);
        let res = await axios
          .get("/song/detail?ids=" + id)
          .then((res) => res.songs[0]);
        [
          state.songName,
          state.songPic,
          state.songArtist,
          state.sliderPosition,
        ] = [res.name, res.al.picUrl, res.ar[0].name, 0];
        await nextTick();
        state.duration =
          Math.floor(audio.value.duration / 60).toString() +
          ":" +
          Math.floor(audio.value.duration % 60).toString();
        state.paused = false;
      },
      {
        immediate: true,
      }
    );
    //监听播放状态变化
    watch(
      () => state.paused,
      (paused) => {
        if (paused) {
          audio.value.pause();
          clearInterval(interval);
        } else {
          audio.value.play();
          interval = setInterval(() => {
            if (state.sliderPosition === 100) {
              state.sliderPosition = 0;
              audio.value.pause();
              state.paused = true;
              clearInterval(interval);
            }
            state.sliderPosition += 1;
          }, Math.floor(audio.value.duration * 10));
        }
      }
    );
    //处理滑块滑动
    function handleSliderMove(val) {
      audio.value.currentTime = Math.floor((val / 100) * audio.value.duration);
    }
    onMounted(() => {});

    onBeforeUnmount(() => {
      clearInterval(interval);
    });
    return {
      audio,
      state,
      handleSliderMove,
    };
  },
};
</script>

<template>
  <div class="player-box">
    <div class="main-container">
      <div class="control-btns">
        <a href="javascript:;" class="prev-btn"></a>
        <a
          href="javascript:;"
          class="play-btn"
          :style="
            state.paused
              ? { backgroundPosition: '0 -204px' }
              : { backgroundPosition: '0 -165px' }
          "
          @click="state.paused = !state.paused"
        ></a>
        <a href="javascript:;" class="next-btn"></a>
      </div>
      <audio ref="audio" class="audio" :src="state.src"></audio>
      <el-slider
        class="slider"
        :show-tooltip="false"
        v-model="state.sliderPosition"
        @change="handleSliderMove"
      ></el-slider>
      <div class="time">
        时长
        {{ state.duration }}
      </div>
      <div class="music-info">
        <img
          style="margin-top: 5px"
          width="34"
          :src="state.songPic"
          :alt="state.songName"
        />
        <span class="info-name">{{ state.songName }}</span>
        <span class="info-artist">{{ state.songArtist }}</span>
      </div>
      <div class="tool-btns">
        <a
          href="javascript:;"
          @click="audio.muted = !audio.muted"
          :style="
            audio.muted
              ? { backgroundPosition: '-104px -69px' }
              : { backgroundPosition: '0 -248px' }
          "
          class="volume-btn"
        ></a>
        <a href="javascript:;" class="loop-btn"></a>
        <a href="javascript:;" class="list-btn"></a>
      </div>
    </div>
    <div class="lock">
      <span></span>
    </div>
  </div>
</template>
<style scoped>
.player-box {
  width: 100%;
  background: transparent;
  position: fixed;
  bottom: 0;
  height: 52px;
  background-image: url("../assets/playbar.png");
}
.main-container {
  width: 1080px;
  height: 45px;
  display: flex;
  align-items: center;
  margin: 5px auto 0;
}
/* .lock {
  height: 67px;
  width: 52px;
  background-image: url("../assets/playbar.png");
  background-position: 0 -380px;
  position: absolute;
  right: 100px;
  top: -15px;
} */

.control-btns {
  margin: 0 10px;
}
.control-btns > .prev-btn {
  display: inline-block;
  width: 28px;
  height: 28px;
  background-image: url("../assets/playbar.png");
  background-position: 0 -130px;
}
.control-btns > .prev-btn:hover {
  background-position: -30px -130px;
}
.control-btns > .play-btn {
  display: inline-block;
  width: 36px;
  height: 36px;
  background-image: url("../assets/playbar.png");
  background-position: 0 -204px;
  margin: 0 10px;
}
.control-btns > .next-btn {
  display: inline-block;
  width: 28px;
  height: 28px;
  background-image: url("../assets/playbar.png");
  background-position: -80px -130px;
}
.control-btns > .next-btn:hover {
  background-position: -110px -130px;
}
.slider {
  width: 500px;
  padding: 0 10px;
}
.time {
  color: white;
  font-size: 0.7em;
  width: 100px;
}
.music-info {
  position: relative;
  height: 40px;
  color: white;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.music-info > .info-name {
  position: absolute;
  left: 45px;
  top: 0;
}
.music-info > .info-artist {
  position: absolute;
  left: 45px;
  top: 23px;
  color: gray;
  font-size: 0.6em;
}
.tool-btns {
  margin: 0 10px;
}
.tool-btns > .volume-btn {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../assets/playbar.png");
  background-position: 0 -248px;
}
.tool-btns > .volume-btn:hover {
  background-position: -29px -248px;
}
.tool-btns > .loop-btn {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../assets/playbar.png");
  background-position: -66px -344px;
  margin: 0 10px;
}
.tool-btns > .list-btn {
  display: inline-block;
  width: 65px;
  height: 25px;
  background-image: url("../assets/playbar.png");
  background-position: -42px -68px;
}
.tool-btns > .list-btn:hover {
  background-position: -42px -98px;
}
</style>