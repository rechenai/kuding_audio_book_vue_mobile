<template>
  <div>
    <infinite-list :ajaxFunction="ajaxFunction" @select-from="selectAudio"></infinite-list>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import infiniteList from 'base/infiniteList/infiniteList'
  import {getVariety} from 'api/variety'
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        ajaxFunction: getVariety
      }
    },
    methods: {
      selectAudio (audio) {
        this.$router.push({
          path: `/variety/${audio.id}`
        })
        this.setAudio(audio)
      },
      ...mapMutations({
        setAudio: 'SET_AUDIO'
      })
    },
    components: {
      infiniteList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
