/*const _baseUrl = 'http://musicapi.duapp.com/api.php';
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/';*/
const _baseUrl = 'http://localhost:3000';
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/';
export default {
  /*getPlayListByWhere (cat, order, offset, total, limit) {
    return _baseUrl + '?type=topPlayList&cat=' + cat + '&offset' + offset + '&limit=' + limit;
  },*/
  getPlayListByWhere (cat, limit) {
    return _baseUrl + '/top/playlist/highquality?tag=' + cat +'&limit=' + limit +'';
  },
  getLrc (id) {
    return _baseUrl2 + '?type=lyric&id=' + id;
  },
  getSong (id) {
    return _baseUrl + '?type=url&id='+ id;
  },
  getPlayListDetail (id) {
    return _baseUrl2 + '?type=playlist&id=' + id;
  },
  getMv (id) {
    return _baseUrl2 + '?type=mv&id=' + id;
  },
  search (words) {
    return _baseUrl2 + '?type=search&s=' + words;
  },
  getBanner () {
    return _baseUrl + '/banner';
  },
  getRecommendMv() {
    return _baseUrl + '/personalized/mv';
  }
}
