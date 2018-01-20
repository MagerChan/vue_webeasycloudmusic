<template>
  <div class="songslist">
  	<div class="wrapper playList">
  		<div class="content">
  			<div class="title">全部歌单</div>
  			<mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
  				<mu-flexbox-item basis="40%" class="list-item" :key="ite.id" v-for="item in playList">
  					<router-link :to="{name: 'playListDetail', params: {id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description}}">
  						<div class="list-bar">{{item.playCount | formatCount}}</div>
  						<img class="list-img img-response" :src="item.coverImgUrl + '?para=300y300'" lazy="loading">
  						<div class="list-name">{{item.name}}</div>
  					</router-link>
  				</mu-flexbox-item>
  			</mu-flexbox>
  			<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"></mu-infinite-scroll>
  		</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '../../../static/js/api.js';

export default {
  data () {
    return {
      scroller: null,
      playList: [],
      offset: 0,
      loading: false
    };
  },
  create () {
    this.get();
  },
  mounted () {
    this.scroller = this.$el;
  },
  methods: {
    get () {
      this.loading = true;
      this.$http.get(api.getPlayListByWhere('全部', 'hot', this.offset, true, 6)).then((res) => {
        var total = res.data.total;
        var list = res.data.playlists;
        for (let i = 0; i < list.length; i++) {
          this.playList.push(list[i]);
        }
        this.offset = this.offset + 6;
        if (this.offset > total) {
          this.offset = total;
        }
        this.loading = false;
      });
    },
    loadMore () {
      this.get();
    }
  },
  filters: {
    formatCount (v) {
      if (v < 100000) {
        return v;
      } else {
        return (v / 10000).toFixed(0) + '万';
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../assets/theme.less";

.wrapper{
	width:100%;
	height:28rem;
	padding:0 10px;
	overflow:auto;
	-webkit-overflow-scrolling:touch;
	.title{
		margin:.2rem 0 .3rem 0;
		paddiing-left:.2rem;
		border-left:.15rem solid @primaryColor;
	}
	.img-response{
		max-width:100%;
		height:auto;
	}
	.list{
		&-bar{
			position:absolute;
			width:100%;
			padding:2px 5px;
			top:0;
			left:0;
			text-algin:right;
			color:#fff;
			background-color:rgba(0,0,0,.2);
		}
		&-item{
			position:relative;
			margin:0 5px 5px 10px;
			a{
				color:rgba(0,0,0,.87);
			}
		}
		&-img{
			width:8rem;
			height:8rem;
		}
		&-img[lazy=loading]{
			background:url('./default_cover.png') no-repeat;
			background-size:cover;
		}
		&-name{
			display:-webkit-box;
			overflow:hidden;
			text-overflow:ellipsis;
			-webkit-line-clamp:1;
			-webkit-box-orient:vertical;
		}
	}
}
</style>
