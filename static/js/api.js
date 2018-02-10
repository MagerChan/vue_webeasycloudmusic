const _baseUrl = 'http://localhost:3000';
export default {
  getPlayListByWhere (cat, limit) {
    return _baseUrl + '/top/playlist/highquality?tag=' + cat +'&limit=' + limit +'';
  },
  getLrc (id) {
    return _baseUrl + '/lyric?id=' + id;
  },
  getSong (id) {
    return _baseUrl + '/music/url?id='+ id;
  },
  getPlayListDetail (id) {
    return _baseUrl + '/playlist/detail?id=' + id;
  },
  getMv (id) {
    return _baseUrl + '/mv?mvid=' + id;
  },
  search (words) {
    return _baseUrl + '/search?keywords=' + words;
  },
  getBanner () {
    return _baseUrl + '/banner';
  },
  getRecommendMv() {
    return _baseUrl + '/personalized/mv';
  }
}
