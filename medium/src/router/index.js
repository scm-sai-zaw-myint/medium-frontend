import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/Auth/LoginView.vue'
import SignupView from '@/views/Auth/SignupView.vue'
import Post from '@/views/Post.vue'
import store from '../store/index'
import PostIndex from '../components/Post/PostIndex.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreatePost from '@/components/Post/PostCreate.vue'
import PostUpdate from '@/components/Post/PostUpdate.vue'
import SearchView from '@/views/SearchView.vue'
import Page from '@/views/Page.vue'
import RelatedPost from '@/components/Post/RelatedPost.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Page
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {requireAuth: true},
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
        path: ':id',name: 'post-index', component: PostIndex
      },
      {
        path: '/create',name: 'create-post', component: CreatePost,
        meta: {requireAuth: true}
      },
      {
        path: '/:id/edit', name: 'edit-post', component: PostUpdate,
        meta: {requireAuth: true}
      },
      {
        path: 'search/:search',name: 'post-search', component: SearchView
      },
      {
        path: 'category/:category', name: 'related-post', component: RelatedPost
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
  if((to.meta.requireAuth || from.meta.requireAuth) && !store.state.user.TOKEN){
    next({name: 'sign-in'})
  }
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
  if(to.name === 'post-search' || (from.name == undefined && to.name === 'post-search')){
    console.log(to.name,to.params)
    callData.push(store.dispatch(`searchPosts`, to.params.search))
    callData.push(store.dispatch('getLatestPost'))
    callData.push(store.dispatch('getAllCategories'))
  }
  Promise.all(callData).then(()=>{
    next()
  })
})

export default router
