import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/chat/Chat.vue'
import AddressBook from '../views/addressBook/AddressBook.vue'
import Find from '../views/find/Find.vue'
import AboutMe from '../views/aboutMe/AboutMe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/address-book',
    name: 'AddressBook',
    component: AddressBook
  },
  {
    path: '/find',
    name: 'Find',
    component: Find
  },
  {
    path: '/about-me',
    name: 'AboutMe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/aboutMe/AboutMe.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
