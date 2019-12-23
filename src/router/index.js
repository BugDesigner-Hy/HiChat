import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/chat/Chat.vue'
import AddressBook from '../views/addressBook/AddressBook.vue'
import Find from '../views/find/Find.vue'
import AboutMe from '../views/aboutMe/AboutMe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/chat',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: 'chat',
        name: 'Chat',
        component: Chat
      }, {
        path: 'address-book',
        name: 'AddressBook',
        component: AddressBook
      }, {
        path: '/find',
        name: 'Find',
        component: Find
      }, {
        path: '/about-me',
        name: 'AboutMe',
        component: () => import(/* webpackChunkName: "views" */ '../views/aboutMe/AboutMe.vue')
      }
    ]
  },
  {
    path: '/single-chat/:roomId',
    name: 'SingleChat',
    component: () => import(/* webpackChunkName: "views" */ '../views/chat/SingleChat.vue')
  },
  {
    path: '/single-chat-detail/:userId',
    name: 'SingleChatDetail',
    component: () => import(/* webpackChunkName: "views" */ '../views/chat/SingleChatDetail.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "views" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
