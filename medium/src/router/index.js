import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Post from '../views/Post.vue'
import store from '../store'
import PostIndex from '../components/Post/PostIndex.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post',
    name: 'post',
    component: Post,
    children:[
      {
        path: '/:id',name: 'post-index', component: PostIndex
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  const callData =[]
  //get all post in home page
  if(to.name === 'home'){
    callData.push(store.dispatch('getAllPost'))
  }
  //get post data
  if(to.name === 'post-index'){
    callData.push(store.dispatch('getPost',to.params.id))
  }
  Promise.all(callData).then(()=>{
    next()
  })
})

export default router
