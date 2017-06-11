<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <div class="back" @click="back">
        <i class="icon-navigate_before"></i>
      </div>
      <h1 class="bookName">{{AudioInfo.bookName}}</h1>
      <div class="InfoHead" ref="InfoHead">
        <div class="img-wrapper">
          <img :src="AudioInfo.bookImg">
        </div>
        <div class="infoBox">
          <p class="anchor">演播：<span>{{AudioInfo.anchor}}</span></p>
          <p class="author">作者：<span>{{AudioInfo.bookAuthor}}</span></p>
          <p class="updateNum">章节：<span>{{AudioInfo.articleNum}}</span></p>
          <p class="updateTime">更新时间：<span>{{AudioInfo.lastUpdateTime}}</span></p>
          <div class="tag">
            <span v-for="item in AudioInfo.bookPertag">{{item}}</span>
          </div>
        </div>
      </div>
      <div class="desc" ref="audioDesc">
        <h2 class="descTitle">简介：</h2>
        <p class="descInfo">{{AudioInfo.bookOutline}}</p>
      </div>
      <div class="listTitle" ref="listTitle">
        <h2>章节列表</h2>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <infinite-audio :id="this.audio.id" :top="clientTop"
      @scrollPos="scrollHandler"
      ref="detailList"></infinite-audio>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getDetialInfo} from 'api/detail'
  import infiniteAudio from 'base/infiniteAudio/infiniteAudio'

  const LEAVE = 40

  export default {
    computed: {
      ...mapGetters([
        'audio'
      ])
    },
    data () {
      return {
        AudioInfo: {},
        clientTop: 0,
        scrollY: 0,
        minTranslateY: 0
      }
    },
    created () {
      this._getInfo()
    },
    mounted () {
      this.$refs.detailList.$el.style.top = `${this.clientTop}px`
    },
    watch: {
      scrollY (newVal) {
        this.minTranslateY = LEAVE - this.clientTop
        let translateY = Math.max(this.minTranslateY, newVal)
        this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
        this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`
      }
    },
    methods: {
      scrollHandler (val) {
        this.scrollY = val
      },
      back () {
        this.$router.back()
      },
      _getInfo () {
        if (!this.audio.id) {
          this.$router.push('/recommend')
          return
        }
        getDetialInfo({id: this.audio.id}).then((res) => {
          if (res.code === 200) {
            this.AudioInfo = res.bookInfo
            this.$nextTick(() => {
              this.clientTop = this.$refs.listTitle.clientHeight + this.$refs.InfoHead.clientHeight + this.$refs.audioDesc.clientHeight
            })
          }
        })
      }
    },
    components: {
      infiniteAudio
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .detail-wrapper
    position: fixed
    top: 0
    bottom: 0
    left: 0
    width: 100%
    z-index: 50
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 100
      .icon-navigate_before
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .bookName
      position: absolute
      top: 0
      z-index: 80
      width: 100%
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
      background: $color-background
    .InfoHead
      display: flex
      padding-top: 40px
      .img-wrapper
        flex: 0 0 130px
        width: 130px
        height: 130px
        margin: 10px 16px 10px 16px
        img
          width: 100%
          height: 100%
      .infoBox
        margin-top: 12px
        font-size: $font-size-small
        color: $color-text-ll
        p
          margin-top: 4px
          span
            padding-left: 4px
        .tag
          display: flex
          flex-wrap: wrap
          span
            font-size: $font-size-small
            display: inline-block
            color: $color-text
            margin: 8px 5px 0 5px
            padding: 3px
            border: 1px solid #FFF
            border-radius: 4px
    .desc
      .descTitle
        font-size: $font-size-medium-x
        padding-left: 15px
        color: $color-theme
      .descInfo
        width: 92%
        font-size: $font-size-medium
        line-height: 16px
        margin-top: 5px
        padding-left: 15px
        text-indent: 2em
        color: $color-text-ll
        height: 48px
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 3
        overflow: hidden
    .listTitle
      color: $color-theme
      padding: 25px 15px
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-active
    transform: translate3d(100%, 0, 0)
</style>
