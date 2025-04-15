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
      title: 'Tray图标闪烁',
      keepAlive: true
    }
  },
  {
    path: '/sqlite/userList',
    name: 'UserList',
    component: () => import('@renderer/views/example/sqlite/users/UserList.vue'),
    meta: {
      title: '用户列表'
    }
  },
  {
    path: '/sqlite/userWindow',
    name: 'UserWindow',
    component: () => import('@renderer/views/example/sqlite/usersWindow/UserWindow.vue'),
    meta: {
      title: '用户弹窗'
    }
  },
  {
    path: '/sqlite/userDialogPage',
    name: 'UserDialogPage',
    component: () => import('@renderer/views/example/sqlite/usersWindow/UserDialogPage.vue'),
    meta: {
      title: '用户信息'
    }
  },
  {
    path: '/indexedDB/dexie/userList',
    name: 'UserListDexie',
    component: () => import('@renderer/views/example/indexedDB/dexie/users/UserListDexie.vue'),
    meta: {
      title: '用户列表'
    }
  },
  {
    path: '/directoryView',
    name: 'DirectoryView',
    component: () => import('@renderer/views/example/DirectoryView.vue'),
    meta: {
      title: '文档目录'
    }
  }
]

export const mainRoutes = [
  {
    path: '/home/homeView',
    name: 'HomeView',
    component: () => import('@renderer/views/main/HomeView.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/home/settingView',
    name: 'SettingView',
    component: () => import('@renderer/views/main/SettingView.vue'),
    meta: {
      title: '设置'
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
    path: '/downloadView',
    name: 'DownloadView',
    component: () => import('@renderer/views/DownloadView.vue'),
    meta: {
      title: '下载'
    }
  },
  {
    path: '/home',
    name: 'MainLayout',
    redirect: '/home/homeView',
    component: () => import('@renderer/views/main/MainLayout.vue'),
    meta: {
      title: '首页'
    },
    children: mainRoutes
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
