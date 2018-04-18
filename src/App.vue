<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <calculator @data="setData"></calculator>
    <fee-detail :data="data"/>
    <m-footer/>
  </div>
</template>

<script>
import Calculator from '@/components/calculator/calculator'
import MFooter from '@/components/footer/footer'
import FeeDetail from '@/components/fee-detail/fee-detail'

export default {
  data() {
    return {
      data: null
    }
  },
  methods: {
    setData(data) {
      console.log(data)
      this.data = data
    }
  },
  components: {
    Calculator,
    MFooter,
    FeeDetail
  }
}
</script>

<style lang="stylus" scoped>
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  max-width 800px
  margin 0 auto
  margin-top 30px
</style>
