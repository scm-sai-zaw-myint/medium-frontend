import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/Auth/LoginView.vue'
import SignupView from '@/views/Auth/SignupView.vue'
import Post from '@/views/Post.vue'
import store from '../store/index'
import PostIndex from '../components/Post/PostIndex.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreatePost from '@/components/Post/PostCreate.vue'
import PostUpdate from '@/components/Post/PostUpdate.vue'
import HomeViewVue from '@/views/HomeView.vue'
import Page from '@/views/Page.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Page
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: LoginView
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignupView
  },
  {
    path: '/post',
    name: 'post',
    component: Post,
    children:[
      {
        path: '/:id',name: 'post-index', component: PostIndex
      },
      {
        path: '/create',name: 'create-post', component: CreatePost
      },
      {
        path: '/:id/edit', name: 'edit-post', component: PostUpdate
      }
    ]
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  const callData =[]
  callData.push(store.dispatch('getProfileData'))
  callData.push(store.dispatch('getAllCategories'))
  //get all post in home page
  if(to.name === 'home'){
    callData.push(store.dispatch('getAllPost'))
    callData.push(store.dispatch('getLatestPost'))
  }
  //get post data
  if(to.name === 'post-index' || to.name === 'edit-post'){
    callData.push(store.dispatch('getPost',to.params.id))
  }
  if(to.name === 'profile'){
    callData.push(store.dispatch('getLatestPost'))
    callData.push(store.dispatch('getAllCategories'))
  }
  Promise.all(callData).then(()=>{
    next()
  })
})

export default router
