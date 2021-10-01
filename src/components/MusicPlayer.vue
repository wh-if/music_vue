<script>
import { ref, shallowReactive } from "@vue/reactivity";
import { inject, onBeforeUnmount, onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
export default {
  name: "MusicPlayer",
  setup() {
    const audio = ref({});
    const store = useStore();
    const axios = inject("axios");
    const state = shallowReactive({
      src: "", //源文件
      songName: "", //歌曲名
      songPic:
        "https://s4.music.126.net/style/web2/img/default/default_album.jpg", //图片
      songArtist: "", //创作者
      duration: "", //歌曲格式化时长
      paused: true, //播放状态（是否暂停）
      sliderPosition: 0, //当前播放进度点
      listDrawer: false, //播放列表显示
      playSongList: [],
    });
    let interval; //定时器
    //监听歌曲切换
    watch(
      () => [store.state.playSongList, store.state.playSongIndex],
      ([list, index]) => handleSongChange(list, index, false)
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
    onMounted(async () => {
      // console.log(store.state.playSongList.toString());

      handleSongChange(
        store.state.playSongList,
        store.state.playSongIndex,
        true
      );
    });
    //响应歌曲切换
    async function handleSongChange(list, index, paused) {
      if (list.length == 0) return;
      state.src = await axios.get("/song/url?id=" + list[index]).then((res) => {
        if (res.data[0].code == 200) return res.data[0].url;
        else {
          ElMessage.error("当前歌曲资源不存在，请切换歌曲！");
          return "404";
        }
      });
      let res = await axios
        .get("/song/detail?ids=" + list[index])
        .then((res) => res.songs[0]);
      [state.songName, state.songPic, state.songArtist, state.sliderPosition] =
        [res.name, res.al.picUrl, res.ar[0].name, 0];
      // console.log(state.src);
      if (state.src == "404") {
        handleChangeBtn(true);
      } else {
        setTimeout(() => {
          if (isNaN(audio.value.duration)) {
            state.duration = "";
            state.paused = true;
            return;
          }
          state.duration =
            Math.floor(audio.value.duration / 60).toString() +
            ":" +
            Math.floor(audio.value.duration % 60).toString();
          state.paused = paused;
        }, 500);
      }
    }

    //监听播放列表变化
    watch(
      () => store.state.playSongList,
      async (list) => {
        if (list.length == 0) return;
        state.playSongList = await axios
          .get("/song/detail?ids=" + list.toString())
          .then((res) => res.songs);
      },
      {
        immediate: true,
      }
    );

    onBeforeUnmount(() => {
      clearInterval(interval);
    });
    //处理上一首、下一首事件
    function handleChangeBtn(isNext) {
      let i = store.state.playSongIndex;
      if (isNext) {
        if (i + 1 === store.state.playSongList.length)
          store.commit("changePlaySong", { index: 0 });
        else store.commit("changePlaySong", { index: i + 1 });
      } else {
        if (i === 0)
          store.commit("changePlaySong", {
            index: store.state.playSongList.length - 1,
          });
        else store.commit("changePlaySong", { index: i - 1 });
      }
    }
    function listItemPlay(val) {
      // console.log(val);
      store.commit("changePlaySong", {
        index: val,
      });
    }
    return {
      audio,
      state,
      handleSliderMove,
      handleChangeBtn,
      listItemPlay,
    };
  },
};
</script>

<template>
  <div class="player-box">
    <div class="main-container">
      <div class="control-btns">
        <a
          href="javascript:;"
          class="prev-btn"
          @click="handleChangeBtn(false)"
        ></a>
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
        <a
          href="javascript:;"
          class="next-btn"
          @click="handleChangeBtn(true)"
        ></a>
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
        <a
          href="javascript:;"
          class="list-btn"
          @click="state.listDrawer = true"
        ></a>
      </div>
    </div>
    <el-dialog title="播放列表" width="950px" center v-model="state.listDrawer">
      <el-table size="small" height="600px" :data="state.playSongList">
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="歌名">
          <template #default="scope">
            <img
              width="50"
              :src="scope.row.al.picUrl"
              :alt="scope.row.al.name"
              style="vertical-align: middle"
            />
            <span class="text-overflow">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
        <el-table-column prop="al.name" label="专辑"></el-table-column>
        <el-table-column label="操作">
          <template #default="row">
            <el-link
              icon="el-icon-video-play"
              href="javascript:;"
              @click="listItemPlay(row.$index)"
            ></el-link>
            <el-link icon="el-icon-plus" style="margin: 0 20px"></el-link>
            <el-link icon="el-icon-share"></el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<style scoped>
.player-box {
  width: 100%;
  background: transparent;
  position: fixed;
  z-index: 99;
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
.player-list-dialog {
  height: 500px;
}
</style>
<style>
.player-box .el-dialog__body {
  padding: 0 !important;
}
</style>