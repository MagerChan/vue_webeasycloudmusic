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
export default {
  data () {
    return {
    };
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
