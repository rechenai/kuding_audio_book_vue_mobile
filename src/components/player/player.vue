<template>
  <div class="player" v-show="showPlayer">
    <transition name="full" @enter="enter"
                            @afterEnter="afterEnter"
                            @leave="leave"
                            @afterLeave="afterLeave">
      <div class="fullPlayer" v-show="fullScreen">
        <div class="background">
            <img width="100%" height="100%" :src="audio.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-navigate_before"></i>
          </div>
          <h1 class="bookName">{{currentSongTitle}}</h1>
        </div>
        <div class="middle" @touchstart="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentImg">
              </div>
            </div>
            <div class="cdTitle">
              {{currentSong.section_title}}
            </div>
          </div>
          <div class="middle-r" ref='middleR'>
            <bullet-screen :triggerTime="currentTime" :totalTime="totalTime" :rawTime="rawTime" :currentShow="currentShow"></bullet-screen>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='bullet'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{currentTime}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(totalTime)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left-l">
              <i class="icon-previous" @click="prev"></i>
            </div>
            <div class="icon i-left">
              <div :class="lrotate" @animationend="lremove">
                <i class="icon-replay_10" @click="backwardTen" ref="iLeft"></i>
              </div>
            </div>
            <div class="icon i-center" @click="togglePlay">
              <i :class="iconClass"></i>
            </div>
            <div class="icon i-right">
              <div :class="rrotate" @animationend="rremove">
                <i class="icon-forward_10 iRight" @click="forwardTen" ref="iRight"></i>
              </div>
            </div>
            <div class="icon i-right-r">
              <i class="icon-next" @click="next"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name='min'>
      <div class="minPlayer" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" width="40" height="40" :src="currentImg">
        </div>
        <div class="text">
          <h2 class="name">{{currentSongTitle}}<span>第{{currentSong.section_index}}章</span></h2>
        </div>
        <div class="control">
          <i :class="iconClass" @click.stop="togglePlay"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.audio" ref="audio" @canplay="songReady" @error="songError" @timeupdate="updateTime"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {prefixStyle} from 'common/js/dom'
  import progressBar from 'base/progressBar/progressBar'
  import bulletScreen from 'base/bulletScreen/bulletScreen'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    data () {
      return {
        songReadyFlag: false,
        currentTime: '',
        rawTime: 0,
        totalTime: 0,
        lrotate: '',
        rrotate: '',
        currentShow: 'cd'
      }
    },
    computed: {
      percent () {
        return this.currentTime / this.totalTime
      },
      iconClass () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      cdCls () {
        return this.playing ? 'play' : 'play pause'
      },
      ...mapGetters([
        'audio',
        'fullScreen',
        'playList',
        'playing',
        'currentIndex',
        'showPlayer',
        'currentSong',
        'currentImg',
        'currentSongTitle'
      ])
    },
    methods: {
      percentChange (p) {
        this.$refs.audio.currentTime = p * this.totalTime
        this.setPlayingStatus(true)
      },
      lremove () {
        this.lrotate = ''
      },
      rremove () {
        this.rrotate = ''
      },
      backwardTen () {
        let time = this.$refs.audio.currentTime - 11
        if (time < 0) {
          time = 0
        }
        this.$refs.audio.currentTime = time
        this.lrotate = 'iconLeft'
        this.setPlayingStatus(true)
      },
      forwardTen () {
        let time = this.$refs.audio.currentTime + 9
        if (time > this.totalTime) {
          time = this.totalTime
        }
        this.$refs.audio.currentTime = time
        this.rrotate = 'iconRight'
        this.setPlayingStatus(true)
      },
      updateTime (e) {
        this.rawTime = e.target.currentTime
        this.currentTime = this.format(e.target.currentTime)
      },
      songReady () {
        this.songReadyFlag = true
        this.totalTime = this.$refs.audio.duration
      },
      songError () {
        this.songReadyFlag = true
      },
      togglePlay () {
        if (!this.songReadyFlag) {
          return
        }
        this.setPlayingStatus(!this.playing)
      },
      _getPosAndScale () {
        const targetX = 81
        const targetY = 115
        const width = window.innerWidth * 0.6 - 20
        const posX = window.innerWidth * 0.5
        const posY = 80 + width / 2 + 10
        const x = -(posX - targetX)
        const y = -(posY - targetY)
        const scale = 130 / width
        return {x, y, scale}
      },
      enter (el, done) {
        const {x, y, scale} = this._getPosAndScale()

        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }

        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter () {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave (el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave () {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      back () {
        this.setFullScreen(false)
      },
      open () {
        this.setFullScreen(true)
      },
      prev () {
        if (!this.songReadyFlag) {
          return
        }
        let currentIndex = this.currentIndex - 1
        if (currentIndex < 0) {
          currentIndex = this.playList.length - 1
        }
        this.setCurrentIndex(currentIndex)
        if (!this.playing) {
          this.togglePlay()
        }
      },
      next () {
        if (!this.songReadyFlag) {
          return
        }
        let currentIndex = this.currentIndex + 1
        if (currentIndex === this.playList.length) {
          currentIndex = 0
        }
        this.setCurrentIndex(currentIndex)
        if (!this.playing) {
          this.togglePlay()
        }
      },
      format (interval) {
        interval = Math.floor(interval)
        const minute = Math.floor(interval / 60)
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad (num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      middleTouchStart (e) {
        this.touch.initiated = true
        this.touch.moved = false
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      middleTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.middleR.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.middleR.style[transitionDuration] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style[transitionDuration] = 0
      },
      middleTouchEnd () {
        if (!this.touch.moved) {
          return
        }
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = 'bullet'
            this.$refs.middleR.style.display = 'inline-block'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.currentShow = 'cd'
            opacity = 1
            this.$refs.middleR.style.display = 'none'
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.middleR.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.middleR.style[transitionDuration] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingStatus: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    },
    watch: {
      currentSong () {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing (newVal) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newVal ? audio.play() : audio.pause()
        })
      }
    },
    created () {
      this.touch = {}
    },
    components: {
      progressBar,
      bulletScreen
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/variable'

  .player
    .fullPlayer
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      &.full-enter-active, &.full-leave-active
        transition: all 0.4s
        .top,.bottom
          transition: all 0.4s
      &.full-enter, &.full-leave-active
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
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
            transform: rotate(-90deg)
        .bookName
          position: absolute
          top: 0
          z-index: 80
          width: 100%
          text-align: center
          line-height: 40px
          font-size: $font-size-large
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 60%
          .cd-wrapper
            position: absolute
            left: 20%
            top: 0
            width: 60%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                width: 100%
                height: 100%
                border-radius: 50%
          .cdTitle
            position: absolute
            left: 20%
            top: 160%
            width: 60%
            height: 30px
            text-align: center
            font-size: $font-size-large
        .middle-r
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          font-size: $font-size-large
          ul
            position: absolute
            top: 0
            left: 100%
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 32px
            line-height: 30px
            width: 30px
            &.time-l
              padding-right: 5px
              text-align: left
            &.time-r
              padding-left: 5px
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            .iconLeft
              animation: backwardTen 0.3s linear
            .iconRight
              animation: forwardTen 0.3s linear
          .i-left
            display: flex
            justify-content: flex-end
          .i-left, .i-right
            font-size: 35px
          .i-right
            display: flex
            justify-content: flex-start
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right-r
            text-align: left
          .i-left-l
            text-align: right
          .i-right-r,.i-left-l
            font-size: 25px
    .minPlayer
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.min-enter-active, &.min-leave-active
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.min-enter, &.min-leave-active
        opacity: 0
        transform: translate3d(0, 60px, 0)
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          font-size: $font-size-medium
          color: $color-text
        span
          margin: 10px
          font-size: $font-size-small
          color: $color-text-ll
      .control
        flex: 0 0 80px
        width: 30px
        padding: 0 10px
        font-size: 25px
        color: $color-theme
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
  @keyframes backwardTen
    0%
      transform: rotate(0)
    100%
      transform: rotate(-360deg)
  @keyframes forwardTen
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
