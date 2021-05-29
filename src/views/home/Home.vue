<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>

    
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'


  import {getHomeMultidata} from "network/home"


  export default {
		name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
        FeatureView 
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        // this.result = res;
        // 保证数据不被销毁,新接口上新加了一层data
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    } 
  
	}
</script>

<style scoped>
  #home{
    /* position: sticky; */
    padding-top: 44px;
  }
/* 对于在不同页面有区别的样式在具体定义 */
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>
