<template>
    <scroll class="infinite-wrapper" :data="listData" @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType" ref="scrollAudio">
      <ul ref="scrollAudioList">
        <li v-for="(item, index) in listData" @click="selectItem(item, index)">
          <div class="listItem">
            <div class="listLeft">
              <div class="listIndex">第{{index + 1}}章</div>
              <div class="listItemTitle">{{item.section_title}}</div>
            </div>
            <div class="listItemTime">{{item.updateTime}}</div>
          </div>
        </li>
      </ul>
    </scroll>
</template>

<script type="text/ecmascript-6">
  import {getDetialList} from 'api/detail'
  import scroll from 'base/scroll/scroll'
  import {mapActions, mapGetters} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  export default {
    mixins: [playlistMixin],
    props: {
      id: {
        type: Number
      },
      top: {
        type: Number
      }
    },
    data () {
      return {
        listData: [],
        scrollY: -1,
        ajaxflag: 1,
        ajaxend: false
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
      this._getData()
    },
    computed: {
      ...mapGetters([
        'audio'
      ])
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.scrollAudio.$el.style.bottom = bottom
        this.$refs.scrollAudio.refresh()
      },
      selectItem (item, index) {
        this.selectPlay({list: this.listData, index: index, title: this.audio.name, img: this.audio.image})
      },
      scroll (pos) {
        this.scrollY = pos.y
        this.$emit('scrollPos', this.scrollY)
      },
      fireAjax () {
        if (this.ajaxend) {
          this._getData()
        }
      },
      _getData () {
        getDetialList({page: this.ajaxflag, id: this.id, pageSize: 10}).then((res) => {
          if (res.code === 200) {
            let length = this.listData.length
            this.listData = this.listData.concat(res.bookArticleList)
            this.$nextTick(() => {
              this.$refs.scrollAudio.$el.style.top = `${this.top}px`
              this.$refs.scrollAudio.refresh()
              if (this.listData.length !== length) {
                this.ajaxend = true
              }
            })
            this.ajaxflag += 1
          }
        })
      },
      ...mapActions([
        'selectPlay',
        'updateList'
      ])
    },
    watch: {
      top () {
        this.$refs.scrollAudio.$el.style.top = `${this.top}px`
        this.$refs.scrollAudio.refresh()
      },
      scrollY (newVal) {
        let diff = Math.abs(this.$refs.scrollAudioList.clientHeight - Math.abs(newVal))
        let h = this.$refs.scrollAudio.$el.clientHeight
        if (diff < 20 + h) {
          this.fireAjax()
          this.ajaxend = false
        }
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable"
  .infinite-wrapper
    position: fixed
    left: 0
    bottom: 0
    width: 100%
  .listItem
    display: flex
    height: 30px
    padding: 5px 20px
    line-height: 30px
    justify-content: space-between
    .listLeft
      display: flex
    .listIndex
      width: 50px
      line-height: 30px
      font-size: $font-size-small
      color: $color-text-ll
    .listItemTitle
      font-size: $font-size-medium-x
    .listItemTime
      align-self: flex-end
      font-size: $font-size-small-s
      color: $color-text-d
</style>
