<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in swiperDate" class="slide-custom"><img class="needsclick" @load="onload" :src="item.pic"></swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'carrousel',
  props: {
    swiperArray: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      swiperDate: [],
      swiperOption: {
        notNextTick: true,
        autoplay: 3000,
        direction: 'horizontal',
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        observeParents: true
      }
    }
  },
  watch: {
    swiperArray (newValue) {
      this.swiperDate = newValue
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    onload () {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$emit('onload')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
img
  width: 100%
.slide-custom
  font-size: 0
</style>
