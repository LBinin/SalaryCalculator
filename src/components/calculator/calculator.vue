<template>
  <div class="calculator">
    <el-card :body-style="cardBodyStyle">
      <div slot="header" class="clearfix">
        <span class="cal-title">五险一金及税后工资计算器</span>
      </div>
      <el-form class="cal-form" :model="calForm" :rules="formRules" label-width="150px" :label-position="labelPosition" ref="calForm">

        <el-form-item label="税前：" prop="originSalary">
          <el-col :span="isMobile ? 24 : 18">
            <el-input type="originSalary" placeholder="请输入税前工资" v-model.number="calForm.originSalary" ref="salaryInput">
              <template slot="prepend">￥</template>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="社保汇缴基数：" prop="base3jCustomize">
          <el-col :span="isMobile ? 24 : 18">
            <el-input type="base3j" placeholder="请输入社保汇缴基数" v-model.number="calForm.base3j" :disabled="base3jDisable">
              <template slot="prepend">￥</template>
            </el-input>
          </el-col>
          <el-col :span="isMobile ? 24 : 6">
            <el-checkbox v-model="calForm.base3jCustomize">自定义</el-checkbox>
          </el-col>
        </el-form-item>

        <el-form-item label="公积金汇缴基数：" prop="gjjCustomize">
          <el-col :span="isMobile ? 24 : 18">
            <el-input type="gjj" placeholder="请输入公积金汇缴基数" v-model.number="calForm.gjj" :disabled="gjjDisable">
              <template slot="prepend">￥</template>
            </el-input>
          </el-col>
          <el-col :span="isMobile ? 24 : 6">
            <el-checkbox v-model="calForm.gjjCustomize">自定义</el-checkbox>
          </el-col>
        </el-form-item>

        <el-form-item class="item-align-left" prop="isGjj">
          <el-checkbox v-model="calForm.isGjj">汇缴公积金</el-checkbox>
        </el-form-item>
        <el-form-item class="item-align-left" prop="isExGjj">
          <el-checkbox v-model="calForm.isExGjj">汇缴补充住房公积金( 非政策强制 )</el-checkbox>
        </el-form-item>
        <el-form-item class="item-align-left" :class="{ 'center': isMobile }" prop="factorExgjj">
          单位与个人汇缴比例：
          <el-select v-model="calForm.factorExgjj" placeholder="" size="mini" :disabled="factorExgjjDisable">
            <el-option v-for="item in 8" :key="item" :label="item + '%'" :value="item + '%'" />
          </el-select>
        </el-form-item>

        <el-button icon="el-icon-delete" type="default" class="cal-submit-btn" @click="resetForm('calForm')">重置</el-button>
        <el-button icon="el-icon-edit" type="primary" class="cal-submit-btn" @click="submitForm('calForm')">计算</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getBasicInfo, getCalculateResult } from 'api/calculate'
// import CitySelect from ''

const MOBILE_WIDTH = 670

export default {
  created() {
    this._resize()

    this._getBasicInfo(this.currCity)
  },
  mounted() {
    window.addEventListener('resize', () => {
      this._resize()
    })
  },
  data() {
    return {
      data: null,
      isMobile: false,
      currCity: 'changsha',
      calForm: {
        base3j: 0,
        gjj: 0,
        isGjj: true,
        isExGjj: false,
        gjjCustomize: false,
        base3jCustomize: false,
        factorExgjj: '8%'
      },
      formRules: {
        originSalary: [
          { required: true, message: '税前工资不能为空' },
          { type: 'number', message: '工资必须为数字' },
          { type: 'number', min: 0, message: '工资必须为大于零' }
        ]
      }
    }
  },
  computed: {
    cardBodyStyle() {
      return {
        padding: this.isMobile ? '20px 0px' : '40px 0px'
      }
    },
    base3jDisable() {
      return !this.calForm.base3jCustomize
    },
    gjjDisable() {
      return !this.calForm.gjjCustomize
    },
    factorExgjjDisable() {
      return !this.calForm.isExGjj
    },
    labelPosition() {
      if (this.isMobile) {
        return 'top'
      } else {
        return 'right'
      }
    },
    originSalary() {
      return this.calForm.originSalary
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getCalculateResult({
            city: this.currCity,
            origin_salary: this.calForm.originSalary,
            base_3j: this.calForm.base3j,
            base_gjj: this.calForm.gjj,
            is_gjj: this.calForm.isGjj,
            is_exgjj: this.calForm.isExGjj,
            factor_exgjj: '0.0' + this.calForm.factorExgjj
          }).then(data => {
            if (data.code === 0) {
              this.data = data.data
              this.$emit('data', data.data)
            } else {
              alert(data.msg)
            }
          })
        } else {
          // 不符合规范
          this.$refs['salaryInput'].focus()
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    _getBasicInfo(cityName) {
      getBasicInfo(cityName).then(data => {
        if (data.code === 0) {
          this.data = data.data
          this.calForm.base3j = +this.data.base_3j
          this.calForm.gjj = +this.data.base_gjj
        } else {
          alert(data.msg)
        }
      })
    },
    _resize() {
      if (document.body.clientWidth < MOBILE_WIDTH) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  },
  watch: {
    originSalary(newValue) {
      // 控制社保缴纳基数，详情：https://baike.baidu.com/item/%E7%A4%BE%E4%BF%9D%E7%BC%B4%E7%BA%B3%E5%9F%BA%E6%95%B0/10910524?fr=aladdin
      if (!this.base3jDisable) {
      } else if (newValue > +this.data['3j'].min) {
        // 不低于 60%
        const upper = +this.data['3j'].max

        if (newValue > upper) {
          // 超过 300% 的话
          this.calForm.base3j = upper
        } else {
          // 夹在中间的话，基数就是工资
          this.calForm.base3j = newValue
        }
      } else {
        // 低于 60% 的话，社保缴纳基数不变，就是 60%
        this.calForm.base3j = +this.data['3j'].min
      }

      if (!this.gjjDisable) {
      } else if (newValue > +this.data['gjj'].min) {
        const upper = +this.data['gjj'].max

        if (newValue > upper) {
          this.calForm.gjj = upper
        } else {
          this.calForm.gjj = newValue
        }
      } else {
        this.calForm.gjj = +this.data['gjj'].min
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'

.calculator
  .cal-title
    font-size $font-size-large
    font-weight bold
    color $color-text-d

  .cal-form
    width 90%
    margin 0 auto

    .center
      text-align center

  .cal-submit-btn
    max-width 200px
    width 40%

  .item-align-left
    text-align left
</style>
