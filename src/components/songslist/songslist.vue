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
export default {
  data () {
    return {
    };
  }
};
</script>

<style lang="less" rel="stylesheet/less">

</style>
