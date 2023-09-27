import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import { Container, Header, PageHeader, Dropdown, DropdownMenu, DropdownItem, Main, Button, Select, Option, Form, FormItem, Input, InputNumber, Table, TableColumn, Switch, Popconfirm, Pagination, Dialog, DatePicker, Row, Col, Tabs, TabPane } from 'element-ui'

Vue.config.productionTip = false

// Vue.use(ElementUI)
Vue.use(Container)
Vue.use(Header)
Vue.use(PageHeader)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Main)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Popconfirm)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
