<template>
  <div>
    <h2>税前工资去向</h2>
    <h2>（ 共￥{{ salaryBeforeTax }} ）</h2>
    <pie-chart :chartData="personalData" :chartSettings="personalSettings" height="350px" />

    <h2>单位成本去向</h2>
    <h2>（ 共￥{{ orgCost }} ）</h2>
    <pie-chart :chartData="orgData" :chartSettings="orgSettings" :height="'450px'" />
  </div>
</template>

<script>
import PieChart from '@/base/pie-chart/pie-chart'

export default {
  created() {
    let option = {
      dimension: '项目',
      metrics: '钱数',
      dataType: '￥',
      selectedMode: 'single',
      hoverAnimation: false,
      radius: 80,
      label: {
        formatter: '{b}: {d}%'
      }
    }
    this.orgSettings = {
      ...option,
      offsetY: 300
    }

    this.personalSettings = {
      ...option,
      offsetY: 230
    }
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  components: {
    PieChart
  },
  computed: {
    salaryBeforeTax() {
      return this.data.origin_salary
    },
    orgCost() {
      return (+this.data.origin_salary + +this.data.org_allpay).toFixed(2)
    },
    personalData() {
      let rows = [
        {
          项目: '养老保险金',
          钱数: this.data.personal_yanglao
        },
        {
          项目: '税后月薪',
          钱数: this.data.final_salary
        },
        {
          项目: '医疗保险金',
          钱数: this.data.personal_yiliao
        },
        {
          项目: '失业保险金',
          钱数: this.data.personal_shiye
        },
        {
          项目: '基本住房公积金',
          钱数: this.data.personal_gjj
        },
        {
          项目: '补充住房公积金',
          钱数: this.data.personal_exgjj
        },
        {
          项目: '个人所得税',
          钱数: this.data.tax
        }
      ]

      return {
        columns: ['项目', '钱数'],
        rows: rows
      }
    },
    orgData() {
      let rows = [
        {
          项目: '个人养老保险金',
          钱数: this.data.personal_yanglao
        },
        {
          项目: '个人税后月薪',
          钱数: this.data.final_salary
        },
        {
          项目: '个人医疗保险金',
          钱数: this.data.personal_yiliao
        },
        {
          项目: '个人失业保险金',
          钱数: this.data.personal_shiye
        },
        {
          项目: '个人基本住房公积金',
          钱数: this.data.personal_gjj
        },
        {
          项目: '个人补充住房公积金',
          钱数: this.data.personal_exgjj
        },
        {
          项目: '个人所得税',
          钱数: this.data.tax
        },
        {
          项目: '养老保险金',
          钱数: this.data.org_yanglao
        },
        {
          项目: '医疗保险金',
          钱数: this.data.org_yiliao
        },
        {
          项目: '失业保险金',
          钱数: this.data.org_shiye
        },
        {
          项目: '工伤保险金',
          钱数: this.data.org_gongshang
        },
        {
          项目: '生育保险金',
          钱数: this.data.org_shengyu
        },
        {
          项目: '基本住房公积金',
          钱数: this.data.org_gjj
        },
        {
          项目: '补充住房公积金',
          钱数: this.data.org_exgjj
        }
      ]

      return {
        columns: ['项目', '钱数'],
        rows: rows
      }
    }
  }
}
</script>

<style scoped>

</style>
