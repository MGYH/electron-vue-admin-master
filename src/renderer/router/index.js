import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/checkout',
    name: '主页',
    hidden: false,
    children: [{
      path: 'checkout',
      component: () => import('@/views/checkout/index')
    }]
  },

  {
    path: '/goodsmanage',
    component: Layout,
    redirect: '/goodsmanage',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'addGoods',
        name: 'addGoods',
        component: () => import('@/views/goodsManage/addGoods'),
        meta: { title: '新增商品', icon: 'table' }
      },
      {
        path: 'enterGoods',
        name: 'enterGoods',
        component: () => import('@/views/goodsManage/enterGoods'),
        meta: { title: '商品录入', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/classification-of-goods',
    component: Layout,
    name: '商品分类',
    children: [
      {
        path: 'classification-of-goods',
        name: 'classification-of-goods',
        component: () => import('@/views/classificationOfGoods/index'),
        meta: { title: '分类管理', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

