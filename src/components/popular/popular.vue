<template>
  <div class="popular">
  	<div class="loading-wrapper" v-if="isloading">
  		<div class="loading"></div>
  		<div class="loading-txt">正在加载中</div>
  	</div>
  	<div class="container" v-show="!isloading">
  		<div id="slider">
  			<swiper :options="swiperOption"  ref="mySwiper">
  				<swiper-slide v-for="item in banner" :key="item.targetId"><img :src="item.pic"/></swiper-slide>
  				<div class="swiper-pagination" slot="pagination"></div>
  			</swiper>
  		</div>
  		<div class="wrapper">
  			<div class="g-title song-list">
  				推荐歌单
  				<router-link :to="{path: '/header/songslist'}">更多></router-link>
  			</div>
  			<mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
  				<mu-flexbox-item basis="28%" class="item" v-for="item in playList" :key="item.id">
  					<router-link :to="{name: 'playListDetail', params: {id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description}}">
  						<div class="bar">{{item.playCount | formatCount}}</div>
  						<img class="item-img img-response" :src="item.coverImgUrl + '?param=230y230'" lazy="loading">
  						<div class="item-name">{{item.name}}</div>
  					</router-link>
  				</mu-flexbox-item>
  			</mu-flexbox>
  			<div class="g-title mv">
  				推荐MV
  				<router-link :to="{}">更多></router-link>
  			</div>
  			<mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
  				<mu-flexbox-item v-for="item in RecommendMv" :key="item.id" basis="40%" class="mv-item">
  					<img class="img-response" :src="item.picUrl">
					<div class="mv-name">{{item.name}}</div>
					<div class="mv-author">{{item.artistName}}</div>
  				</mu-flexbox-item>
  			</mu-flexbox>
  		</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import '../../../static/css/swiper.min.css';
import api from '../../../static/js/api.js';

export default {
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        speed: 600,
        autoplay: {
          disableOnInteraction: false
        },
        onTouchEnd: function() {
          swiper.startAutoplay();
        }
      },
      isloading: true,
      playList: [],
      mvList: [],
      banner: [],
      RecommendMv: []
    };
  },
  created() {
    this.get();
    this.getBanner();
    this.getRecommendMv();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {},
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    get() {
      this.$http.get(api.getPlayListByWhere('全部', 6)).then((res) => {
        this.isloading = false;
        this.playList = res.data.playlists;
      });
    },
    getBanner() {
      this.$http.get(api.getBanner()).then((res) => {
        this.banner = res.data.banners;
      });
    },
    getRecommendMv() {
      this.$http.get(api.getRecommendMv()).then((res) => {
        this.RecommendMv = res.data.result;
      });
    }
  },
  filters: {
    formatCount (v) {
      if (v < 9999) {
        return v;
      } else {
        return (v / 10000).toFixed(0) + '万';
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import '../../../static/css/swiper.min.css';

.loading{
	position:absolute;
	width:2.5rem;
	height:2.5rem;
	top:0;
	margin-top:70%;
	margin-left:-1.25rem;
	left:50%;
	background:url('rage_loading.png') no-repeat;
	background-size:cover;
	-webkit-animation:rotating 5s linear infinite;
	animation:rotating 5s linear infinite;
}
.loading-txt{
	position:absolute;
	width:100%;
	top:0;
	margin-top:87%;
	color:#4a4a4a;
	text-align:center;
}
@keyframes rotating{
	0%{transform:rotate(0deg);}
	100%{transform:rotate(360deg);}
}
.swiper-container{
	width:100%;
	height:10rem;
	.swiper-wrapper{
		width:100%;
		height:100%;
	}
	.swiper-slide{
		background-position:center;
		background-size:cover;
		width:100%;
		height:100%;
		img{
			width:100%;
			height:100%;
		}
	}
	.swiper-pagination-bullet{
		width:0.833rem;
		height:0.833rem;
		display:inline-block;
		background:#7c5e53;
	}
}
.wrapper{
	padding:0 5px;
}

.img-response{
	max-width:100%;
	height:auto;
}

.g-title{
	height:35px;
	line-height:35px;
	padding-left:25px;
	font-size:16px;
	color:#333;
	a{
		float:right;
		font-size:12px;
		color:#666;
	}
}
.song-list{
	background:url('./aei.png') no-repeat left center;
	background-size:20px 20px;
}
.item{
	position:relative;
	margin:0 5px 5px 10px;
	height:100%;
	a{
		color:rgba(0,0,0,0.87);
	}
	.bar{
		position:absolute;
		width:100%;
		padding:2px 5px;
		top:0;
		left:0;
		color:#fff;
		text-align:right;
		bakcground-color:rgba(0,0,0,.2)
	}
	&-img{
		min-width:5rem;
		min-height:5rem;
	}
	&-img[lazy=loading] {
      background: url('./default_cover.png') no-repeat;
      background-size: cover;
    }
	
	&-name{
		height:2.4rem;
		font-size:12px;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		overflow:hidden;
	}
}
.mv{
	background:url("aee.png") no-repeat left center;
	background-size:20px 20px;
	&-name{
		display:-webkit-box;
		overflow:hidden;
		text-overflow:ellipsis;
		-webkit-line-clamp:1;
		-webkit-box-orient:vertical;
	}
	&-item{
		position:relative;
		margin:0 5px 5px 10px;
	}
	&-author{
		font-size:12px;
		color:#666;
	}
}
</style>
