import Vue from 'vue'
import VueRouter from 'vue-router'
import Config from '@/settings'
import { getToken } from '@/utils/auth' // getToken from cookie
import Layout from '@/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    component: () => import('@/views/register/Register.vue'),
    meta: {
      title: '注册',
      permission: []
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录',
      permission: []
    }
  },
  {
    path: '/reset',
    component: () => import('@/views/reset/Reset.vue'),
    meta: {
      title: '修改密码',
      permission: []
    }
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '首页',
          permission: ['normal', 'admin']
        }
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: {
      title: '数据看板',
      permission: ['admin']
    }
  },
  {
    path: '/flower',
    component: Layout,
    children: [
      {
        path: '',
        name: 'flower',
        component: () => import('@/views/flower/Flower.vue'),
        meta: {
          title: '包花管理',
          permission: ['normal', 'admin']
        }
      },
      {
        path: 'flowerAdd',
        name: 'flowerAdd',
        component: () => import('@/views/flower/FlowerAdd.vue'),
        meta: {
          title: '新增包花记录',
          permission: ['normal', 'admin']
        }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    children: [
      {
        path: '',
        name: 'account',
        component: () => import('@/views/account/Account.vue'),
        meta: {
          title: '账号管理',
          permission: ['admin']
        }
      }
    ]
  },
  {
    path: '/options',
    component: Layout,
    children: [
      {
        path: '',
        name: 'options',
        component: () => import('@/views/options/Options.vue'),
        meta: {
          title: '配置项管理',
          permission: ['admin']
        }
      },
      {
        path: 'optionsAdd',
        name: 'optionsAdd',
        component: () => import('@/views/options/OptionAdd.vue'),
        meta: {
          title: '新增配置',
          permission: ['admin']
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
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
    if (to.meta.permission && to.meta.permission.length > 0) {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
