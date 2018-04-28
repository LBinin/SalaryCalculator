import Vue from 'vue'
import App from './App'
import router from './router'
import VePie from 'v-charts/lib/pie'
import 'babel-polyfill'

import {
  Button,
  Card,
  Table,
  TableColumn,
  Form,
  FormItem,
  Input,
  Col,
  Checkbox,
  Select,
  OptionGroup,
  Option,
  Tooltip,
  Loading
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(OptionGroup)
Vue.use(Option)
Vue.use(Tooltip)
Vue.use(Loading)

Vue.component(VePie.name, VePie)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
