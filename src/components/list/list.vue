<template>
  <div class="list">
  	<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
  		<div class="title-wrapper">
  			播放列表（{{songList.length}}）
  		</div>
  		<hr class="mu-divider">
  		<div class="list-wrapper">
  			<div class="list-item" :class="{on: item.id == audio.id}" v-for="(item, index) in songList">
  				<div class="left" @click="play(index)">
  					<span class="list-name">{{item.name}}</span>
  					<span class="list-singer">&nbsp;-{{item.singer}}&nbsp;</span>
  				</div>
  				<span class="list-btn" @click="remove(index)">x</span>
  				<hr class="mu-divider">
  			</div>
  		</div>
  	</mu-bottom-sheet>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      bottomSheet: false
    };
  },
  methods: {
    closeBottomSheet() {
      this.bottomSheet = false;
      if (document.querySelector('.playList')) {
        document.querySelector('.playList').style.position = 'static';
      }
    },
    show() {
      this.bottomSheet = true;
      if (document.querySelector('.playList')) {
        document.querySelector('.playList').style.position = 'fixed';
      }
    },
    play(index) {
      console.log(index);
      this.$store.commit('setAudioIndex', index);
    },
    remove(index) {
      console.log(index);
      this.$store.commit('removeAudio', index);
    }
  },
  computed: {
    ...mapGetters([
      'songList',
      'audio'
    ])
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../assets/theme.less";

.title-wrapper{
	height:2rem;
	line-height:2rem;
	font-size:16px;
	text-align:center;
	color:rgba(0,0,0,.87);
	.right-btn{
		line-height:2.1rem;
		padding-right:10px;
		float:right;
		font-size:12px;
		color:#828080;
	}
}
.list{
	&-wrapper{
		height:10rem;
		width:100%;
		padding:0 10px;
		overflow:auto;
		-webkit-overflow-scrolling:touch;
	}
	&-item{
		height:2rem;
		line-height:2rem;
		.left{
			max-width:92%;
			float:left;
			height:2rem;
			overflow:hidden;
		}
	}
	&-name{
		float:left;
		max-width:72%;
		height:2rem;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	&-singer{
		color:#737171;
		font-size:12px;
	}
	&-btn{
		width:32px;
		float:right;
		text-align:center;
		color:#737171;
	}
}
.on{
	color:@primaryColor;
	.list-singer{
		color:@primaryColor;
	}
}
</style>
