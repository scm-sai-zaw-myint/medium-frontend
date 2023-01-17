import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/Auth/LoginView.vue'
import SignupView from '@/views/Auth/SignupView.vue'
import Post from '@/views/Post.vue'
import PostIndex from '../components/Post/PostIndex.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreatePost from '@/components/Post/PostCreate.vue'
import PostUpdate from '@/components/Post/PostUpdate.vue'
import SearchView from '@/views/SearchView.vue'
import Page from '@/views/Page.vue'
import RelatedPost from '@/components/Post/RelatedPost.vue'
import { posts, user } from '@/js/script'

let postUpdateDataProps = {data:{}}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Page
  },
  {
    path: '/profile/:id?',
    name: 'profile',
    meta: {requireAuth: true},
    component: ProfileView,
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
        meta: {requireAuth: true},
        props: postUpdateDataProps
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
  if((to.meta.requireAuth || from.meta.requireAuth) && !user().isUserLogged()){
    next({name: 'sign-in'})
    return;
  }
  if(to.name === 'edit-post'){
    callData.push(posts().getPost(to.params.id).then((res) => {
      if (res.ok) {
        postUpdateDataProps.data = res.data
      }
      return res
    }))
  }
  
  Promise.all(callData).then(()=>{
    next()
  })
})

export default router
