<template>
  <div class="playerBar">
  	<div class="foot">
  		<div class="mini-content">
  			<audio :src="audio.location" @timeupdate="updateTime" @canplay="canPlaySong" @error="loadError" @ended="next" id="audioPlay" />
  			<div class="cover" @click="showDetail">
  				<mu-circular-progress v-show="loading" :size="30" />
  				<img class="xmplogo" :src="audio.albumPic + '?param=100y100'" v-show="!loading" :alt="audio.name">
  			</div>
  			<div class="info">
  				<div class="name xmpname">{{audio.name}}</div>
  				<div class="artist xmpartist">{{audio.singer}}</div>
  			</div>
  		</div>
  		<div class="control">
  			<mu-icon-button class="mini-btn player-list" @click="showList" />
  			<mu-icon-button class="mini-btn player" :class="{pause: playing}" @click="toggleStatus"/>
  			<mu-icon-button class="mini-btn next" @click="next" />
  		</div>
  		<div class="pro">
  			<div class="pro-load proload" :style="{'-webkit-transform':'translateX(' + prBufferedTime + '%)'}"></div>
  			<div class="pro-play proplay" :style="{'-webkit-transform':'translateX(' + prCurrentTime + '%)'}"></div>
  		</div>
  	</div>
  	<BottomSheet ref="bottomSheet"></BottomSheet>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations, mapGetters } from 'vuex';
import BottomSheet from "../list/list.vue";
export default {
  data () {
    return {
      loadedTime: 0,
      playerTime: 0
    };
  },
  components: {
    BottomSheet
  },
  methods: {
    showDetail() {
      this.$router.push({name: 'playerDetail', params: {id: this.audio.id}});
      this.$store.commit('toggleDetail');
    },
    showList() {
      this.$refs.bottomSheet.show();
    },
    ...mapMutations([
      'play',
      'pause',
      'playNext'
    ]),
    canPlaySong() {
      this.$store.commit('closeLoading');
      this.$store.commit('play');
      document.getElementById('audioPlay').play();
    },
    toggleStatus() {
      if (this.playing) {
        document.getElementById('audioPlay').pause();
        this.$store.commit('pause');
      } else {
        document.getElementById('audioPlay').play();
        this.$store.commit('play');
      }
    },
    // 文件加载出错
    loadError() {
      // 判断是第一次打开程序还是后来程序加载的路径有错根据src是否为空
      if(document.getElementById('audioPlay').currentSrc) {
        this.loading = false;
        this.$store.commit('closeLoading');
      } else {
        console.log('APP 程序第一次加载')
      }
    },
    next() {
      this.toggleStatus();
      this.$store.commit('playNext');
    },
    // 更新进度条事件
    updateTime() {
      var vm = this;
      var myaudio = document.getElementById('audioPlay');
      var time = pauseInt(myaudio.currentTime);
      // 防护在未加载完成时，切歌出现的错误
      // Failed to execute 'end' on 'TimeRanges':
      // 由onprogress 更改为 onsuspend事件。参考：http://www.cnblogs.com/tianma3798/p/6038908.html
      myaudio.onsuspend = function () {
        var timeRange = myaudio.buffered;
        if (timeRange.length > 0 && myaudio.duration > 0) {
          vm.$store.commit('updateBufferedTime', parseInt(myaudio.buffered.end(0)));
        }
      }
      vm.$store.commit('updateDurationTime', parseInt(myaudio.duration));
      if(this.change) {
        myaudio.currentTime = this.tmpCurrentTime;
        this.$store.commit('setChange', false);
      } else {
        this.$store.commit('updateCurrentTime', time);
      }
    }
  },
  computed: {
    ...mapGetters([
      'audio',
      'change',
      'playing',
      'loading',
      'currentTime',
      'prBufferedTime',
      'tmpCurrentTime',
      'prCurrentTime'
    ]);
  }
};
</script>

<style lang="less" rel="stylesheet/less">

</style>
