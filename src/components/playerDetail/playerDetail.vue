<template>
  <div class="playerDetail">
  	<div class="content">
  		<div class="player-wrapper">
  			<div class="player-inner">
  				<mu-appbar>
  					<mu-icon-button icon="arrow_back" @click="back" slot="left" />
  					<div class="play-title">
  						<div class="play-name"><span>{{audio.name}}</span></div>
  						<div class="play-singer">{{audio.singer}}</div>
  					</div>
  					<mu-icon-button icon="share" slot="right"/>
  				</mu-appbar>
  				<div class="bar-line"></div>
          <mu-flexbox orient="vertical" class="main">
  					<mu-flexbox-item order="0">
  						<div class="cd-holder" :class="{'cd-play':playing}">
                <div class="stick"></div>
                <div class="cd-wrapper" :class="{'cd-rotate':playing}">
                  <div class="cd-mask"></div>
                  <img class="cd-img" :src="audio.albumPic + '?param=500y500'"/>
                </div>
  						</div>
  					</mu-flexbox-item>
  					<mu-flexbox-item order="2" class="bottom-wrapper">
  						<div class="lyric-holder">
  							<div class="lrc-inner" style="transition:-webkit-transform 0.3s ease-out;transform-origin:0px 0px 0px" :style="{'transform':'translate3d(0px,'+lrcOffset+'px,0px)'}">
  								<p v-for="(item,index) in afterLrc" :id="'line-'+index" :key="index">{item.txt}</p>
  							</div>
  						</div>
              <div class="process-bar">
                <div class="pro">
                  <div class="pro-wrap">
                    <mu-slider class="song-slider" @changer="changeTime" v-model="prCurrentTime"/>
                  </div>
                  <div class="time">
                    <time id="cur">{{currentTime | time}}</time>
                    <time id="total">{{durationTime | time}}</time>
                  </div>
                </div>
              </div>
              <div class="control-bar">
                <mu-icon-button class="bun d-mode" />
                <mu-icon-button class="bun d-play" @click="playPrev" />
                <mu-icon-button class="bun d-play btn-big" @click="togglePlay" :class="{'d-pause':playing}" />
                <mu-icon-button class="bun d-next" @click="playNext" />
                <mu-icon-button class="bun d-list" @click="showList" />
              </div>
  					</mu-flexbox-item>
          </mu-flexbox>
  			</div>
  		</div>
      <div class="mask">
        <div class="album-cover" :style="{'background-image':'url('+audio.albumPic+'?param=500y500)'}"></div>
        <div class="cover-mask" style="opacity:0.6;"></div>
      </div>
      <BottomSheet ref="bottomSheet"></BottomSheet>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex';
import BottomSheet from '../list.vue';
import api from '../../static/js/api.js;'
export default {
  data () {
    return {
      lyric: '',
      afterLrc: [],
      lrcIndex: 0
    };
  },
  components: {
    BottomSheet
  },
  beforeRouterEnter: (to, from, next) => {
    // 这里判断是否重复打开的同一个歌曲页面
    next(vm => {
      if (parseInt(to.params.id) !== parseInt(vm.audio.id)) {
        console.log('vm: id' + vm.audio.id);
        vm.loadLrc(vm.audio.id);
      }
    });
  },
  watch: {
    audio (val) {
      this.loadLrc(val.id);
    }
  },
  methods: {
    togglePlay () {
      if (this.playing) {
        this.$store.commit('pause');
        document.getElementById('audioPlay').pause();
      } else {
        this.$store.commit('play');
        document.getElementById('audioPlay').play();
      }
    },
    back () {
      this.$route.go(-1);
      this.$store.commit('toggleDetail');
    },
    changeTime (value) { // 改变播放时间事件
      var time = (value * this.durationTime) / 100;
      this.$store.commit('changeTime', time);
      this.$store.commit('setChange', true);
    },
    loadLrc (id) {
      var self = this;
      this.aterLrc = [{'txt': '正在加载中...'}];
      if (!id) {
        this.afterLrc = [{'text': '这里显示歌词哦！'}];
        return;
      }
      this.$http.get(api.getLrc(id)).then((res) => {
        // 1、先判断是否有歌词
        if (res.data.nolyric) {
          this.afterLrc = [{'txt': '(⊙０⊙) 暂无歌词'}];
        } else {
          this.lyric = res.data.lrc.lyric;
          this.getLrc();
        }
      }, (res) = {
        console.log('lrc fail');
        this.afterLrc = [{'txt': '加载歌词失败'}]
      })
      .catch(function (error) {
        console.log(error);
        self.afterLrc = [{'txt': '(⊙０⊙) 暂无歌词'}];
      });
    },
    getLrc () {
      if (this.lyric) {
        var lyrics = this.lyric.split('\n');
        var lrcObj = [];
        /* eslint-disable */
        var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
        /* eslint-enable */
        // 思路： 1、把歌词进行处理以时间和歌词组成一个对象，当如afterLrc数组中
        // 2、在computed方法中根据当前的时间进行匹配歌词，然后查找在数据中的位置计算offset值
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.content{
	height:100%;
	min-height:25rem;
	overflow:hidden;
}
.player-wrapper{
	.player-inner{
		position:relative;
		box-sizing:border-box;
		z-index:2;
	}
	.play-title{
		height:56px;
		font-size:16px;
		color:#fff;
		.play-name{
			padding-top:0.4rem;
			line-height:1.8;
		}
		.play-singer{
			line-height:1;
			font-size:14px;
			text-align:left;
			color:#a8a7a7;
		}
	}
}
.bar-line{
  display:block;
  width:100%;
  height:0.05rem;
  left:0;
  bottom:0;
  background:radial-ragdient(#d3d3d3 -90%,transparent 100%);
}
.main{
	height:100%;
  .cd-holder{
    position:relative;
    overflow:hidden;
    .stick{
      position:absolute;
      width:4rem;
      height:6rem;
      right:30%;
      background:url('./stick_bg') no-repeat left -.4rem;
      background-size:cover;
      z-index:8;
      transition:all 300ms ease-in;
      -webkit-transition:all 300ms ease-in;
      transform-origin:left top;
      -webkit-transform-origin:left top;
      transform:rotate(-20deg);
      -webkit-transform:rotate(-20deg);
    }
    .cd-wrapper{
      position:relative;
      max-width:65%;
      min-height:80px;
      padding:.8rem .9rem;
      margin:3rem auto 0;
      border-radius:50%;
      background:rgba(107,107,107,0.3);
      .cd-mask{
        position:absolute;
        width:100%;
        height:100%;
        top:0;
        left:0;
        background:url('./cd_wrapper.png') no-repeat center center;
        background-size:contain;
      }
      img{
        width:100%;
        height:100%;
        min-height:80px;
        border-radius:50%;
      }
    }
  }

  .cd-play{
    .stick{
      background-position-y:-.7rem;
      -webkit-transform:rotate(0deg);
      -moz-transform:rotate(0deg);
      -ms-transfomr:rotate(0deg);
      transform:rotate(0deg);
    }
  }
  .cd-rotate{
    -webkit-animation:rotating 10s linear .3s infinite;
    animation:ratating 10s linear .3s infinite;
  }
  .cd-img{
    border-radius:50%;
  }

  .bottom-wrapper{
    padding:0 1rem 0;
    color:#fff;
    align-items:flex-end;
    .lyric-holder{
      position:relative;
      height:3rem;
      overflow:hidden;
      margin-top:.6rem;
      .lrc-inner{
        position:absolute;
        left:10px;
        right:10px;
        overflow:hidden;
        p{
          height:42px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          font-size:16px;
          text-align:center;
          color:#fff;
        }
        .on{
          color:#fff;
          font-size:16px;
        }
      }
    }
    .pro{
      positon:relative;
      .pro-wrap{
        position:relative;
        margin:0 2rem;
        padding:1rem 0 0;
        .song-slider{
          margin-bottom:0;
        }
      }
      .time{
        position:absolute;
        top:54%;
        color:#fff;
        font-size:12px;
        opacity:.5;
        #cur{
          left:0;
        }
        #total{
          right:0;
        }
      }
    }
    .control-bar{
      .btn{
        width:2.6rem;
        height:2.6rem;
      }
      .d-mode{
        background:url('./seq.png') no-repeat;
        background-size:cover;
      }
      .d-prev{
        backgrond:url('./prev.png') no-repeat;
        background-size:cover;
      }
      .d-play{
        background:url('./play.png') no-repeat;
        background-size:cover;
      }
      .d-pause{
        background:url('./pause.png') no-repeat;
        background-size:cover;
      }
      .d-next{
        background:url('./next.png') no-repeat;
        background-size:cover;
      }
      .d-list{
        background:url:('./list.png') no-repeat;
        background-size:cover;
      }
    }
  }
}

.mask{
  position:absolute;
  width:100%;
  height:100%;
  overflow:hidden;
  left:0;
  top:0;
  z-index:1;
  .album-cover{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    width:100%;
    height:100%;
    z-index:2;
    background-size:cover;
    background-position:center;
    filter:blur(1.2rem);
    -webkit-filter:blur(1.2rem);
    -webkit-transform:scale(1.05);
  }
  .cover-mask{
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    bottom:0;
    left:0;
    z-index:3;
    background-color:rgba(0,0,0,.8);
  }
}

@-webkit-keyframes rotating{
  0% { -webkit-transform:rotate(0deg); }
  100% { -webkit-transform:rotate(360deg); }
}
@keyframes rotating {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
</style>
