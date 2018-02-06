<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <Player v-show="songList.length > 0 && !showDetail"></Player> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Player from './components/playerBar/playerBar.vue';
import {mapGetters} from 'vuex';
export default {
  name: 'app',
  components: {
    Player
  },
  computed: {
    ...mapGetters([
      'songList',
      'showDetail'
    ])
  }
};
</script>

<style lang="less" rel="stylesheet/less">
</style>
