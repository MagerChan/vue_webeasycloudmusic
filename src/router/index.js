import Vue from 'vue';
import Router from 'vue-router';
import header from '@/components/header/header.vue';
import popular from '@/components/popular/popular.vue';
import songslist from '@/components/songslist/songslist.vue';
import rating from '@/components/rating/rating.vue';
import singers from '@/components/singers/singers.vue';
import playerDetail from '@/components/playerDetail/playerDetail.vue';
import playListDetail from '@/components/playListDetail/playListDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/header',
      component: header,
      children: [
        {
          path: '/popular',
          component: popular
        },
        {
          path: '/songslist',
          component: songslist
        },
        {
          path: '/rating',
          component: rating
        },
        {
          path: '/singers',
          component: singers
        }
      ]
    },
    {
      path: '/playerDetail',
      name: 'playerDetail',
      component: playerDetail
    },
    {
      path: '/playListDetail/:id',
      name: 'playListDetail',
      component: playListDetail
    },
    {
      path: '*',
      redirect: '/popular'
    }
  ],
  linkActiveClass: 'active'
});

/* export default new Router({
  routes: [
    {
      path: '/popular',
      name: 'popular',
      component: popular
    },
    {
      path: '/songslist',
      name: 'songslist',
      component: songslist
    },
    {
      path: '/rating',
      name: 'rating',
      component: rating
    },
    {
      path: '/singers',
      name: 'singers',
      component: singers
    },
    {
      path: '*',
      redirect: '/popular'
    }
  ],
  linkActiveClass: 'active'
}); */
