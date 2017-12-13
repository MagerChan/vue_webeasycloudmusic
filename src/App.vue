<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/popular">时下流行</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/songslist">歌单</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">排行榜</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/singers">热门歌手</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header';

export default {
  name: 'app',
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tab
  display:flex
  width:100%
  height:40px
  line-height:40px
  .tab-item
    flex:1
    text-align:center
    border-bottom:2px solid #fff
    & > a
      display:block
      text-decoration:none
      font-size:14px
      color:rgb(77,85,93)
      &.active
        color:rgb(240,20,20)
        border-bottom:2px solid rgb(240,20,20)
</style>
