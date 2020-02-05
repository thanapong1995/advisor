import Vue from "vue"
import Router from "vue-router"
import homeRouter from "./SubRouterFIle/mainRouter"
import mangeDeputyRoute from './SubRouterFIle/MangeDeputyRoute'
Vue.use(Router)

export default new Router({
  routes: [
    ...homeRouter,
    ...mangeDeputyRoute,
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/menu",
      name: "menu",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/Menu.vue")
    },
    {
      path: "/user",
      name: "user",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/AboutUser/User.vue")
    },
    {
      path: "/advisor",
      name: "advisor",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/AboutAdvisor/Advisor.vue")
    },
    {
      path: "/main",
      name: "main",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/AboutAdvisor/MainAdvisor.vue")
    }

  ]
})
