<template>
  <div class="recomend">
    <div v-for="item in recommends" class="recomend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recomend{
    display: flex;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recomend-item{
    flex: 1;
  }
  .recomend-item img{
    width: 80px;
    margin-bottom: 3px;
  }
</style>