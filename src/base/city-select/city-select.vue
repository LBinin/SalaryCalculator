<template>
  <div class="city-select">
    <el-select v-model="selectedCity" placeholder="请选择" popper-class="city-select">
      <el-option-group v-for="group in cities" :key="group.label" :label="group.label">
        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        {
          label: '华北地区',
          options: [
            {
              value: 'beijing',
              label: '北京'
            },
            {
              value: 'tianjin',
              label: '天津'
            },
            {
              value: 'taiyuan',
              label: '太原'
            },
            {
              value: 'huhehaote',
              label: '呼和浩特'
            },
            {
              value: 'shijiazhuang',
              label: '石家庄'
            }
          ]
        },
        {
          label: '华东地区',
          options: [
            {
              value: 'shanghai',
              label: '上海'
            },
            {
              value: 'nanjing',
              label: '南京'
            },
            {
              value: 'hangzhou',
              label: '杭州'
            },
            {
              value: 'ningbo',
              label: '宁波'
            },
            {
              value: 'ji_nan',
              label: '济南'
            },
            {
              value: 'suzhou',
              label: '苏州'
            },
            {
              value: 'fuzhou',
              label: '福州'
            },
            {
              value: 'xiamen',
              label: '厦门'
            },
            {
              value: 'hefei',
              label: '合肥'
            },
            {
              value: 'qingdao',
              label: '青岛'
            }
          ]
        },
        {
          label: '华中地区',
          options: [
            {
              value: 'wuhan',
              label: '武汉'
            },
            {
              value: 'nanchang',
              label: '南昌'
            },
            {
              value: 'changsha',
              label: '长沙'
            },
            {
              value: 'zhengzhou',
              label: '郑州'
            }
          ]
        },
        {
          label: '华南地区',
          options: [
            {
              value: 'guangzhou',
              label: '广州'
            },
            {
              value: 'shenzhen',
              label: '深圳'
            },
            {
              value: 'nanning',
              label: '南宁'
            },
            {
              value: 'haikou',
              label: '海口'
            },
            {
              value: 'zhuhai',
              label: '珠海'
            },
            {
              value: 'foshan',
              label: '佛山'
            },
            {
              value: 'dongguan',
              label: '东莞'
            }
          ]
        },
        {
          label: '东北地区',
          options: [
            {
              value: 'shenyang',
              label: '沈阳'
            },
            {
              value: 'dalian',
              label: '大连'
            },
            {
              value: 'changchun',
              label: '长春'
            },
            {
              value: 'haerbin',
              label: '哈尔滨'
            }
          ]
        },
        {
          label: '西北地区',
          options: [
            {
              value: 'xi_an',
              label: '西安'
            },
            {
              value: 'yinchuan',
              label: '银川'
            },
            {
              value: 'lanzhou',
              label: '兰州'
            },
            {
              value: 'xi_ning',
              label: '西宁'
            },
            {
              value: 'wulumuqi',
              label: '乌鲁木齐'
            }
          ]
        },
        {
          label: '西南地区',
          options: [
            {
              value: 'chongqing',
              label: '重庆'
            },
            {
              value: 'chengdu',
              label: '成都'
            },
            {
              value: 'kunming',
              label: '昆明'
            },
            {
              value: 'guiyang',
              label: '贵阳'
            }
          ]
        }
      ],
      selectedCity: 'changsha'
    }
  },
  watch: {
    selectedCity(newValue) {
      this.$emit('changeCity', newValue)
    }
  }
}
</script>

<style lang="stylus">
.city-select
  padding-top 10px

  .el-input__inner
    border none
    text-align center
    width 120px
</style>
