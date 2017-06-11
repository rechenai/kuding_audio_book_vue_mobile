<template>
  <div class="recommend" ref="recommend">
    <scroll :data="swiperArray" class="recommend-wrapper" ref="scroll">
      <div>
        <swiper :swiperArray="swiperArray" @onload="imgLoad"></swiper>
        <div class="audio-list">
          <h1 class="list-title">{{recommendArray.name}}</h1>
          <ul>
            <li v-for="(item, index) in recommendArray.contentList" class="item" @click="selectAudio(item)">
              <div class="left-image"><img v-lazy="item.image"></div>
              <div class="right-content">
                <h2 class="name">{{item.name}}</h2>
                <p class="info"><span class="anchor">{{item.anchor}}</span><span class="number">更新至{{item.articleNumber}}章</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-show="!swiperArray.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import swiper from 'base/swiper/swiper'
  import scroll from 'base/scroll/scroll'
  import {getRecommendIndex} from 'api/recommend'
  import loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  export default {
    mixins: [playlistMixin],
    created () {
      this._getRecommendIndex()
    },
    data () {
      return {
        swiperArray: [],
        recommendArray: {}
      }
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
        console.log('List')
      },
      _getRecommendIndex () {
        getRecommendIndex().then((res) => {
          if (res.code === 200) {
            this.swiperArray = res.focusPictureList
            this.recommendArray = res.categoryList[0]
          }
        })
      },
      imgLoad () {
        this.$refs.scroll.refresh()
      },
      selectAudio (audio) {
        this.$router.push({
          path: `/recommend/${audio.id}`
        })
        this.setAudio(audio)
      },
      ...mapMutations({
        setAudio: 'SET_AUDIO'
      })
    },
    components: {
      swiper,
      scroll,
      loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-wrapper
      height: 100%
      overflow: hidden
    .audio-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .left-image
          flex: 0 0 80px
          width: 80px
          height: 80px
          padding-right: 20px
          img
            width: 100%
        .right-content
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .info
            position:relative
            color: $color-text-d
            .number
              position: absolute
              left: 50%
              font-size: $font-size-small
    .loading-wrapper
        position: absolute
        top: 50%
        width: 100%
        transform: translateY(-50%)
</style>
