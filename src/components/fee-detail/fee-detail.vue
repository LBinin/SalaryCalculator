<template>
  <div class="fee-detail">
    <template v-if="data">
      <h2>五险一金汇缴明细</h2>
      <el-card>
        <el-table :data="tableData" stripe row-class-name="HEllo" style="width: 100%" :fit="true">
          <el-table-column prop="title" header-align="center" width="100" fixed="left">
          </el-table-column>
          <el-table-column prop="personal" header-align="center" label="个人应缴部分">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.personalTips" class="item" effect="dark" :content="scope.row.personalTips" placement="top">
                <p>{{ scope.row.personal }}
                  <i class="el-icon-question"></i>
                </p>
              </el-tooltip>
              <p v-else>{{ scope.row.personal }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="org" header-align="center" label="单位应缴部分">
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 饼图 -->
      <salary-chart :data="data" />
    </template>
  </div>
</template>

<script>
import SalaryChart from '@/components/salary-chart/salary-chart'

export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    tableData() {
      let resutl = [
        {
          title: '养老保险金',
          personal: `${this.data.personal_yanglao} (${(
            +this.data.personal_yanglao /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`,
          org: `${this.data.org_yanglao} (${(
            +this.data.org_yanglao /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`
        },
        {
          title: '医疗保险金',
          personal: `${this.data.personal_yiliao} (${(
            +this.data.personal_yiliao /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`,
          org: `${this.data.org_yiliao} (${(
            +this.data.org_yiliao /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`
        },
        {
          title: '失业保险金',
          personal: `${this.data.personal_shiye} (${(
            +this.data.personal_shiye /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`,
          org: `${this.data.org_shiye} (${(
            +this.data.org_shiye /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`
        },
        {
          title: '基本住房公积金',
          personal: `${this.data.personal_gjj} (${(
            +this.data.personal_gjj /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`,
          org: `${this.data.org_gjj} (${(
            +this.data.org_gjj /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`
        },
        {
          title: '补充住房公积金',
          personal: `${this.data.personal_exgjj} (${(
            +this.data.personal_exgjj /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`,
          org: `${this.data.org_exgjj} (${(
            +this.data.org_exgjj /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`
        },
        {
          title: '工伤保险金',
          personal: '',
          org: `${this.data.org_gongshang} (${(
            +this.data.org_gongshang /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`
        },
        {
          title: '生育保险金',
          personal: '',
          org: `${this.data.org_shengyu} (${(
            +this.data.org_shengyu /
            +this.data.origin_salary *
            100
          ).toFixed(1)}%)`
        },
        {
          title: '共计支出',
          personal: this.data.personal_allpay,
          org: this.data.org_allpay
        },
        {
          title: '扣除四金后月薪',
          personal: this.data.before_tax,
          org: '',
          personalTips: '税前工资扣除掉个人缴纳的五险一金以后，即为「应税工资」'
        },
        {
          title: '个人所得税',
          personal: this.data.tax,
          org: ''
        },
        {
          title: '税后月薪',
          personal: this.data.final_salary,
          org: '',
          personalTips: '最终发到手里的可支配工资'
        }
      ]
      return resutl
    }
  },
  components: {
    SalaryChart
  }
}
</script>

<style lang="stylus" scoped>
.fee-detail
  margin-top 30px
</style>
