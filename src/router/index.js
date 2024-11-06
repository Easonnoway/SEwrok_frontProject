import Vue from "vue";
import Router from "vue-router";
import Lgoin from "../views/login";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import Ticket from "../views/ticketList.vue";
import Order from "../views/order.vue"
import User from "../views/user.vue"

Vue.use(Router);

export default new Router({
  mode:'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Lgoin
    },
    {
      path: "/login",
      name: "login",
      component: Lgoin
    },
    {
      path: "/main",
      component: Main,
      name: "main",
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: Home,
        },
        {
          path:"/ticket",
          name:"ticket",
          component:Ticket,
        },
        {
          path:"/order",
          name:"order",
          component:Order,
        },
        {
          path:"/user",
          name:"user",
          component:User,
        }
      ]
    }
  ]
});
