import { createRouter, createWebHistory } from 'vue-router'
import checkAuth from '@/api/checkAuth'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomePage.vue"),
      meta: { requiresAuth: true } 
      
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LogInPage.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUpPage.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfilePage.vue"),
      meta: { requiresAuth: true } 
    },
    {
      path: "/driver",
      name: "driver",
      component: () => import("../views/DriverPage.vue"),
      meta: { requiresAuth: true } 
    },
    {
      path: "/bus",
      name: "bus",
      component: () => import("../views/BusPage.vue"),
      meta: { requiresAuth: true } 
    },
    {
      path: "/schedule",
      name: "schedule",
      component: () => import("../views/SchedulePage.vue"),
      meta: { requiresAuth: true } 
    },
    {
      path: "/bus",
      name: "bus",
      component: () => import("../views/BusPage.vue"),
      meta: { requiresAuth: true } 
    },
    {
      path: "/result",
      name: "result",
      component: () => import("../views/ResultPage.vue"),
      meta: { requiresAuth: true } ,
      props: (route) => ({ apiResults: route.params.apiResults || [] }),
    },
  
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !checkAuth()) {
    alert('Please log in first.');
    next('/login');
  } else {
    next();
  }
});


export default router;