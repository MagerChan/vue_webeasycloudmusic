import Vue from 'vue';
import Router from 'vue-router';
import popular from '@/components/popular/popular.vue';
import songslist from '@/components/songslist/songslist.vue';
import rating from '@/components/rating/rating.vue';
import singers from '@/components/singers/singers.vue';

Vue.use(Router);

export default new Router({
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
});
