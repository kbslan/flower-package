import Vue from 'vue'
import VueRouter from 'vue-router'
import Config from '@/settings'
import { getToken } from '@/utils/auth' // getToken from cookie
import Layout from '@/layout/Layout.vue'

Vue.use(VueRouter)

const whiteList = ['/login', '/register', '/reset']// no redirect whitelist

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('@/views/reset/Reset.vue'),
    meta: {
      title: '重置密码'
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/flower',
    name: 'flower',
    component: Layout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/flower/Flower.vue'),
        meta: {
          title: '包花管理'
        }
      }
    ]
  },
  {
    path: '/flowerAdd',
    name: 'flowerAdd',
    component: Layout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/flowerAdd/FlowerAdd.vue'),
        meta: {
          title: '新增包花记录'
        }
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: Layout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/account/Account.vue'),
        meta: {
          title: '账号管理'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // set page title
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})
export default router
