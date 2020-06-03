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
    hidden: true,
    redirect: '/checkout/checkout'
  },

  {
    path: '/checkout',
    component: Layout,
    children: [{
      path: 'checkout',
      name: 'checkout',
      component: () => import('@/views/checkout/index'),
      meta: { title: '收银台', icon: 'sale' }
    }]
  },

  {
    path: '/goodsmanage',
    component: Layout,
    name: '商品管理',
    redirect: '/goodsmanage/addGoods',
    meta: { title: '商品管理', icon: 'goods' },
    children: [
      {
        path: 'addGoods',
        name: 'addGoods',
        component: () => import('@/views/goodsManage/addGoods'),
        meta: { title: '商品管理', icon: 'goods' }
      }
    ]
  },
  {
    path: '/entry',
    component: Layout,
    name: '库存管理',
    redirect: '/entry/enterGoods',
    meta: { title: '库存管理', icon: 'goods' },
    children: [
      {
        path: 'enterGoods',
        name: 'enterGoods',
        component: () => import('@/views/entry/enterGoods'),
        meta: { title: '入库', icon: 'goods' }
      },
      {
        path: 'entryGoodsChart',
        name: 'entryGoodsChart',
        component: () => import('@/views/entry/entryGoodsChart'),
        meta: { title: '库存明细', icon: 'charts' }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    name: '统计分析',
    redirect: '@/views/charts/goodsChart',
    meta: { title: '统计分析', icon: 'charts' },
    children: [
      {
        path: 'goodsChart',
        name: 'goodsChart',
        component: () => import('@/views/charts/goodsChart'),
        meta: { title: '商品统计', icon: 'charts' }
      },
      {
        path: 'sellGoodsChart',
        name: 'sellGoodsChart',
        component: () => import('@/views/charts/sellGoodsChart'),
        meta: { title: '销售明细', icon: 'charts' }
      },
      {
        path: 'sellGoodsReport',
        name: 'sellGoodsReport',
        component: () => import('@/views/charts/sellReport'),
        meta: { title: '销售统计', icon: 'charts' }
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
  {
    path: '/test',
    component: Layout,
    name: '测试'
    // children: [
    //   {
    //     path: 'test',
    //     name: 'test-of-goods',
    //     component: () => import('@/views/charts/sellReport'),
    //     meta: { title: '测试', icon: 'form' }
    //   }
    // ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { role: ['admin'], title: '分类管理', icon: 'form' }, // 页面需要的权限
    children: [
      {
        path: 'userManage',
        name: 'userManage',
        component: () => import('@/views/register/index'),
        meta: { title: '用户管理', icon: 'charts' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
