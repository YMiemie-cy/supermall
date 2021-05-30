<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods" ></goods-list>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

  </div>
</template>

<script>
// Home子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

// 公共组件
  import NavBar from "components/common/navbar/NavBar"
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'


// 路由
  import { getHomeMultidata, getHomeGoods } from "network/home"


  export default {
		name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
        GoodsList 
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        Nowindex: 'pop'
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.Nowindex].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
    
     // 2.请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    },
    methods: {
// 事件监听相关方法
      tabClick(index){
        switch(index){
          case 0:
            this.Nowindex = 'pop'
          break
          case 1:
            this.Nowindex = 'new'
          break
          case 2:
            this.Nowindex = 'sell'
          break
        }
      }, 




      // 网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        // 保证数据不被销毁,新接口上新加了一层data
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 按顺序导入元素入数组方法
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          })
      }
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
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;

    z-index: 9;
  }
</style>
