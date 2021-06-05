<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

//获取网络请求
import {getDetail} from "network/detail";

  export default {
		name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    date() {
      return {
        iid: null,
        topImages: []
      }
    },
    created() {
      // 1.保存传入的iid
      const iid = this.$route.params.iid
      this.iid = iid

      // 2.根据iid请求 详情数据
      getDetail(iid).then(res => {
        console.log(res);
        // 1.获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages;
      })
    },
	}
</script>

<style scoped>

</style>
