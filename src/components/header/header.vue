<template>
  <div class="header">
    <div class="fixed-bar">
      <mu-appbar>
        <div class="logo" slot="left"></div>
        <mu-icon-button icon="search" slot="right"/>
      </mu-appbar>
      <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
        <mu-tab value="popular" title="时下流行"/>
        <mu-tab value="songslist" title="歌单"/>
        <mu-tab value="rating" title="排行榜" />
        <mu-tab value="singers" title="热门歌手" />
      </mu-tabs>
    </div>
    <div class="default-view" :class="{view: songList.length > 0}">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';

export default {
  name: 'header',
  data () {
    return {
      activeTab: 'popular'
    };
  },
  created () {
    // 当created函数时监测路由信息，防止页面刷新tab高亮错误
    var tmpArr = this.$route.path.split('/');
    if (tmpArr[1] === 'header') {
      this.handleTabChange(tmpArr[2]);
    }
  },
  // watch函数监测路由的变化，保持tab面板的高亮位置正确
  watch: {
    '$route' (to, from) {
      const path = to.path;
      var tmpArr = path.split('/');
      if (tmpArr[1] === 'header') {
        this.handleTabChange(tmpArr[2]);
      }
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val;
      this.$router.push({ path: '/header/' + val });
    }
  },
  computed: {
    ...mapGetters([
      'songList'
    ])
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../assets/theme.less";

.fixed-bar{
  position:fixed;
  width:100%;
  top:0;
  left:0;
  z-index:15;
  .logo{
    width:150px;
    height:48px;
    background:url("./logo.png") no-repeat left center;
    background-size:cover;
  }
  .view-tabs{
    background-color:#fff;
    color:rgba(0,0,0,0.87);
    >.mu-tab-link{
      color:rgba(102,102,102,1);
    }
    >.mu-tab-active{
      color:@primaryColor;
    }
  }
}
.default-view{
  margin-top:104px;
}

.view{
  margin-bottom:2.3rem;
}


</style>
