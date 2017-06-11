<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import myHeader from 'components/myheader/myheader'
import tab from 'components/tab/tab'
import player from 'components/player/player'

export default {
  components: {
    myHeader,
    tab,
    player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
