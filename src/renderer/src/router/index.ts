import { createWebHashHistory, createRouter } from 'vue-router'

const exampleRoutes = [
  {
    path: '/darkMode',
    name: 'DarkMode',
    component: () => import('@renderer/views/example/DarkMode.vue'),
    meta: {
      title: '暗黑模式'
    }
  },
  {
    path: '/progressBar',
    name: 'ProgressBar',
    component: () => import('@renderer/views/example/ProgressBar.vue'),
    meta: {
      title: '进度条'
    }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@renderer/views/example/Notifications.vue'),
    meta: {
      title: '通知'
    }
  },
  {
    path: '/flashFrame',
    name: 'FlashFrame',
    component: () => import('@renderer/views/example/FlashFrame.vue'),
    meta: {
      title: '任务栏图标闪烁'
    }
  },
  {
    path: '/flashTray',
    name: 'FlashTray',
    component: () => import('@renderer/views/example/FlashTray.vue'),
    meta: {
      title: 'Tray图标闪烁'
    }
  },
  {
    path: '/sqlite/userList',
    name: 'UserList',
    component: () => import('@renderer/views/example/sqlite/users/UserList.vue'),
    meta: {
      title: '用户列表'
    }
  }
]

export const routes = [
  {
    path: '/',
    name: 'Empty',
    component: () => import('@renderer/views/Empty.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@renderer/views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@renderer/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  ...exampleRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@renderer/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
