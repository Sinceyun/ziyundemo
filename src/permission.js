import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, ROLE_ID } from '@/store/mutation-types'
import { adminRouterMap, studentRouterMap } from './config/router.config'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
// const defaultRoutePath = '/dashboard/workplace'
const defaultRoutePath = '/lost//form-lost'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(ACCESS_TOKEN) && Vue.ls.get(ROLE_ID)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.commit('SET_ROLES', { length: 10 })
        if (Vue.ls.get(ROLE_ID) === 'admin') {
          router.addRoutes(adminRouterMap)
          store.commit('SET_ROUTERS', adminRouterMap)
          console.log('permission管理员上线')
        } else if (Vue.ls.get(ROLE_ID) === 'student') {
          router.addRoutes(studentRouterMap)
          store.commit('SET_ROUTERS', studentRouterMap)
          console.log('permission学生上线')
        }
        // store
        //   .dispatch('GetInfo')
        //   .then(() => { })
        //   .catch(() => {
        //     notification.error({
        //       message: '错误',
        //       description: '请求用户信息失败，请重试'
        //     })
        //     store.dispatch('Logout').then(() => {
        //       next({ path: '/user/login', query: { redirect: to.fullPath } })
        //     })
        //   })
        const redirect = decodeURIComponent(to.path)
        console.log('redirect重定向')
        console.log(redirect)
        if (to.path === redirect) {
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          console.log('to.path === redirect', redirect)
          next({ ...to, replace: true })
        } else {
          // 跳转到目的路由
          next({ path: redirect })
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})
/*
          .dispatch('GetInfo')
          .then(res => {
            const roles = res.result && res.result.role
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  }
  */
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
