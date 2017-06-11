<template>
  <div class="commentsWrapper">
    <div class="inputBox">
      <input v-model.lazy="userComment" type="text" placeholder="  补充弹幕……">
    </div>
    <ul ref="comments">
      <li v-for="item in randomBarrage">{{item}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'
  import {commentChange, format} from 'common/js/comment'
  import {mapGetters} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {getComment} from 'api/comment'

  const animationPlayState = prefixStyle('animationPlayState')
  const fixAnimation = prefixStyle('animation')
  const FONTSIZE = 16

  export default {
    props: {
      triggerTime: {
        type: String
      },
      totalTime: {
        type: Number,
        default: 0
      },
      rawTime: {
        type: Number,
        default: 0
      },
      currentShow: {
        type: String,
        default: 'cd'
      }
    },
    data () {
      return {
        userComment: '',
        currentIndex: -1,
        commentMap: [],
        randomBarrage: []
      }
    },
    computed: {
      ...mapGetters([
        'playing',
        'currentSong'
      ])
    },
    watch: {
      currentSong () {
        this._getComment()
        if (this.totalTime !== 0) {
          this.commentMap = commentChange(this.randomBarrage, this.totalTime)
        }
      },
      userComment (newVal) {
        this.randomBarrage.push(newVal)
        let pushTime = format(Math.floor(this.rawTime + 2))
        this.commentMap.push(pushTime)
        this.$nextTick(() => {
          let childs = this.$refs.comments.childNodes
          let target = childs[this.randomBarrage.length - 1]
          target.style.position = 'absolute'
          target.style.top = this._getRandomTop(400)
          target.style.left = `${window.innerWidth}px`
        })
      },
      playing (newVal) {
        if (this.currentIndex === -1) {
          return
        }
        let childs = this.$refs.comments.childNodes
        if (newVal) {
          childs[this.currentIndex].style[animationPlayState] = 'running'
        } else {
          childs[this.currentIndex].style[animationPlayState] = 'paused'
        }
      },
      totalTime () {
        if (this.randomBarrage.length !== 0) {
          this.commentMap = commentChange(this.randomBarrage, this.totalTime)
        }
      },
      triggerTime (newVal) {
        console.log(this.commentMap)
        if (this.currentShow === 'cd') {
          return
        }
        let index = this.commentMap.findIndex((Val) => {
          return Val === newVal
        })
        if (index === -1) {
          return
        }
        this.currentIndex = index
        let childs = this.$refs.comments.childNodes
        let offsetW = -(childs[this.currentIndex].clientWidth + window.innerWidth)

        let animation = {
          0: {
            transform: `translate3d(0, 0, 0)`
          },
          100: {
            transform: `translate3d(${offsetW}px, 0, 0)`
          }
        }

        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 4000,
            easing: 'linear'
          }
        })

        animations.runAnimation(childs[this.currentIndex], 'move')
        childs[this.currentIndex].addEventListener('animationend', function (e) {
          e.target.style[fixAnimation] = ''
        })
      }
    },
    methods: {
      setTop (height) {
        let childs = this.$refs.comments.childNodes
        for (let i = 0; i < childs.length; i++) {
          childs[i].style.position = 'absolute'
          childs[i].style.top = this._getRandomTop(height)
          childs[i].style.left = `${window.innerWidth}px`
        }
      },
      _getRandomTop (height) {
        let top = Math.floor(Math.random() * (height - FONTSIZE) + 30)
        top = top + 'px'
        return top
      },
      _getComment () {
        getComment({id: this.currentSong.bid}).then((res) => {
          if (res.code === 200) {
            let Barrages = res.comments
            for (let item of Barrages) {
              this.randomBarrage.push(item.content)
            }
            this.$nextTick(() => {
              this.setTop(300)
              this.commentMap = commentChange(this.randomBarrage, this.totalTime)
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/variable'
  .commentsWrapper

    .inputBox
      position: relative
      left: 10%
      width: 80%
      input
        outline: none
        background: transparent
        width: 100%
        border-bottom: 2px solid rgba(255, 255, 255, 0.3)
        border-radius: 4px
</style>
