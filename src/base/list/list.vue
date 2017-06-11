<template>
  <div class="list-wrapper" ref="wrapper">
    <div class="item" v-for="(item, index) in listData" @click="selectItem(item)">
      <div class="item-img">
        <img v-lazy="item.image">
      </div>
      <h2>{{item.name}}</h2>
      <h3>{{item.anchor}}</h3>
      <h3>更新至{{item.articleNumber}}章</h3>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      listData: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem (item) {
        this.$emit('select', item)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import "../../common/stylus/variable"
   @import '../../common/stylus/mixin'

  .list-wrapper
    display: flex
    flex-wrap: wrap
    .item
      margin-top: 5px
      item-width()
      color: $color-text
      text-align: center
      h2
        margin-top: -5px
        padding-left: 5px
        padding-right: 5px
        font-size: $font-size-small
      h3
        margin-top: 5px
        font-size: $font-size-small-s
        color: $color-text-d
        padding-bottom: 5px
      .item-img                      // 用padding-top：100%撑开item高度，使每个item高度在image加载完之前就确定，提前知道高度初始化better-scroll
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 5%
          width: 90%
    .spinner-wrapper
      position: relative
      width: 100%
      left: 100%
      top: 100%
    .info-wrapper
      padding-left: 20px

</style>
