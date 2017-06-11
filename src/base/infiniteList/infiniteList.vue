<template>
  <div>
    <scroll class="infinite-wrapper" :data="listData" @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType" ref='scroll'>
      <list :listData="listData" :getAjax="getAjax" ref="scrollList" @select="selectItem"></list>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getPublish} from 'api/publish'
  import List from 'base/list/list'
  import scroll from 'base/scroll/scroll'
  import {playlistMixin} from 'common/js/mixin'

  export default {
    mixins: [playlistMixin],
    props: {
      ajaxFunction: {
        type: Function,
        default: undefined
      }
    },
    data () {
      return {
        listData: [],
        getAjax: getPublish,
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
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.scroll.$el.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem (item) {
        this.$emit('select-from', item)
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      fireAjax () {
        if (this.ajaxend) {
          this._getData()
        }
      },
      _getData () {
        this.ajaxFunction({page: this.ajaxflag, pageSize: 28}).then((res) => {
          if (res.code === 200) {
            this.listData = this.listData.concat(res.categoryBookList)
            this.$nextTick(() => { this.$refs.scroll.refresh() })
            this.ajaxflag += 1
          }
        })
      }
    },
    watch: {
      ajaxFunction (newVal) {
        this.getAjax = newVal
      },
      listData (newVal, oldVal) {
        if (newVal.length !== oldVal.length) {
          this.ajaxend = true
        }
      },
      scrollY (newVal) {
        let diff = Math.abs(this.$refs.scrollList.$el.clientHeight - Math.abs(newVal))
        let h = this.$refs.scroll.$el.clientHeight
        if (diff < 100 + h) {
          this.fireAjax()
          this.ajaxend = false
        }
      }
    },
    components: {
      List,
      scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .infinite-wrapper
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    overflow: hidden
    z-index: 10
</style>
