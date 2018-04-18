<template>
  <div>
    <ve-pie :data="chartData" :settings="chartSettings" :height="height" legend-position="top"></ve-pie>
  </div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    chartSettings: {
      type: Object,
      default: function() {
        return {}
      }
    },
    height: {
      type: String,
      default: '400px'
    }
  }
}
</script>

<style scoped>

</style>
