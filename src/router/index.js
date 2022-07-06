import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('@/views/Home/Home')
const Login = () => import('@/views/Login/Login')
const Main = () => import('@/views/Main/Main')
const Register = () => import('@/views/Register/Register')
const Item = () => import('@/views/Item/Item')
const Cart = () => import('@/views/Cart/Cart')
const Profile = () => import('@/views/Profile/Profile')
const Category = () => import('@/views/Category/Category')
const Index = () => import('@/views/Index/Index')

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/home', component: Main },
      { path: '/home/item/:itemId', component: Item},
      { path: '/home/category/:categoryId', component: Category},
      { path: '/profile', component: Profile},
      { path: '/cart', component: Cart},
      
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  
  {
    path: '/register',
    component: Register
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 当路由跳转时页面滚动到什么地方
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
