<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load="true"
            :probe-type="3">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" ></goods-list>
    
    </scroll>
            

    <back-top @backTop="backTop" />

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
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'


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
        GoodsList,
        Scroll,
        BackTop 
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
        Nowindex: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.Nowindex].list
      },
      // 离开首页时记录saveY位置，再次进入时将位置设置为原来的saveY
      activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.Scroll.Scroll.getScrollY()
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      }, 
      contentScroll(position) {
		    // 1.决定tabFixed是否显示
        this.isTabFixed = position.y < -this.tabOffsetTop

        // 2.决定backTop是否显示
        this.showBackTop = (-position.y) > 1000 
      },
      loadMore() {
        // console.log('上拉加载更多')
		    this.getHomeGoods(this.currentType)
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
          
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
          })

      },
      // getHomeProducts(type) {
      //   getHomeData(type, this.goodsList[type].page).then(res => {
      //     const goodsList = res.data.list;
      //     this.goodsList[type].list.push(...goodsList)
      //     this.goodsList[type].page += 1

      //     this.$refs.scroll.finishPullUp()
      //   })
      // }
	}
}
</script>

<style scoped>
  #home{
    /* position: sticky; */
    padding-top: 44px;
    position: relative;
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
  .content{
    position: absolute;
    
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
  .tab-control{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  
</style>
