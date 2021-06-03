// 1.包裹区域 2.内容区域 3.内容的替换区域
// ref绑定在组件中，那么通过this.$refs.refname获得的是一个的是一个组件对象
// ref绑定在普通元素中，那么通过this.$refs.refname获得的是一个的是一个元素对象
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)
import ObserveImage from '@better-scroll/observe-image'
BScroll.use(ObserveImage)

export default {
  name: "Scroll",
  data() {
    return {
      scroll: {}
    }
  },
  props: {
		  probeType: {
		    type: Number,
        default: 1
      },
      data: {
		    type: Array,
        default: () => {
          return []
        }
      },
      pullUpLoad: {
		    type: Boolean,
        default: false
      }
    },
  mounted() {
    setTimeout(this.__initScroll, 20)

  },
  methods: {
    __initScroll() {
		    // 1.初始化BScroll对象
		    if (!this.$refs.wrapper) return
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad,
          observeDOM: true,
          observeImage: true
        })
        

        // 3.监听滚动的位置
        if(this.probeType === 2 || this.probeType === 3){
          this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
        }
        // 4.监听上拉到底部
        this.scroll.on('pullingUp', () => {
          console.log('上拉加载');
          this.$emit('pullingUp')
        })
      },
       refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      finishPullUp() {
		    this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      // 延迟time时间，回到（x，y）
      scrollTo(x, y, time) {
		    this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      }
  },
  watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    }
}
</script>

// scoped 作用域 只让样式在当前组件生效
<style scoped>
</style>
