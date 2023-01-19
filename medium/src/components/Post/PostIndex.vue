<template>
    <div class="w-100 d-flex justify-content-center py-4">
        <div class="container-wrapper m-sm-2" v-if="data!=null">
            <div class="w-80 w-sm-100 mx-auto d-flex flex-wrap col-12 border-1 border-bottom">
                <div class="col-lg-8 order-lg-1 col-sm-12 order-2 d-flex flex-column border-1 border-end pe-4">
                    <div class="d-flex align-items-center justify-content-between">
                        <RouterLink :to="{name: 'profile',params:{id: data.user.id}}" class="d-flex align-items-center">
                            <div class="profile-img rounded-circle border-1 border-secondary">
                                <img :src="getProfile(data.user.profile)" alt="">
                            </div>
                            <div class="mx-2">
                                <h5>{{data.user.name}}</h5>
                                <span class="text-sm">{{getDate(data.updatedAt)}}</span>
                            </div>
                        </RouterLink>
                        <div class="d-flex align-items-center">
                            <RouterLink v-if="isUserPost" :to="{name: 'edit-post',params:{id: data.id}}" class="px-2 py-1 rounded-pill bg-secondary text-light border-0 text-sm">Edit</RouterLink>
                            <button v-if="isUserPost" @click="deleteOption = true"
                                class="px-2 py-1 rounded-pill bg-danger mx-2 text-light border-0 text-sm">
                                Delete
                            </button>
                        </div>
                        
                    </div>
                    <div class="w-100">
                        <div class="w-100 overflow-hidden my-3">
                            <img :src="getImage(data.image)" alt="" style="width:100%">
                        </div>
                        <h4 class="my-3">{{data.title}}</h4>
                        <p class="my-3 text-justify">
                            {{data.description}}    
                        </p>
                    </div>
                </div>
                <div class="col-lg-4 order-lg-2 col-sm-12 order-1 border-left border-1 ps-3">
                    <div class="w-100 mx-auto">
                        <h3 class="mb-2">latest Posts</h3>
                        <div class="d-flex flex-column">
                            <router-link :to="{name: 'post-index',params:{id: lpost.id}}" class="row my-3" v-for="lpost in latest">
                                <div class="col-md-12 d-flex">
                                    <div class="overflow-hidden rounded-circle d-flex align-items-center justify-content-center"
                                        style="height: 30px;width: 30px;">
                                        <img :src="getProfile(lpost.user.profile)" alt="Profile" style="height: 100%">
                                    </div>
                                    <span class="px-2">{{lpost.user.name}}</span>
                                </div>
                                <div class="col-md-12">
                                    <span class="fw-bold">{{lpost.title}}</span>
                                </div>
                            </router-link>
                        </div>
                        <div class="px-2 py-4 border-top border-secondary float-start" style="font-size: .8em;">
                            <router-link class="border p-2 rounded-pill bg-light m-1 float-start" v-for="category in data.categories"
                            :to="{name: 'related-post',params:{category: category.name}}">{{category.name}}</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-80 mx-auto py-3">
                <h4>Comments</h4>
                <div class="w-100 mx-auto p-4 text-sm ">
                    <form @submit.prevent="postComment" class="w-100 d-flex flex-column" v-if="user().isUserLogged()">
                        <label for="comment">Here you can left message ! </label>
                        <textarea v-model="commentData.body" name="" id="comment" cols="30" rows="10" class="border-1 p-2 rounded"
                            placeholder="What're you thoughts?"></textarea>
                        <div class="d-flex align-items-center justify-content-end my-2">
                            <button type="submit" class="p-1 bg-secondary text-light border-0 rounded">
                                Comment
                            </button>
                        </div>
                    </form>
                    <div class="my-2">
                        <Comments :data="data.comments" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Transition name="modal-slide-down">
        <ModalBox title="Delete post" v-if="deleteOption" @close="deleteOption = false">
            <div class="d-flex flex-column align-items-center px-4 py-4">
                <div class="text-danger modal-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
                <span class="text-danger">Are you sure?</span>
            </div>
            <div class="d-flex align-items-center justify-content-center p-3">
                <button type="button" @click="deleteOption = false" class="btn btn-secondary">Cancle</button>
                <button @click="deletePost(data.id)" class="btn btn-danger ms-2">Delete</button>
            </div>
        </ModalBox>
    </Transition>
</template>
<script setup>
import { getImage,getProfile,getDate, posts, user } from '@/js/script';
import { computed, ref } from '@vue/reactivity';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ModalBox from '../ModalBox.vue';
import Comments from '../Tree/Comments.vue';

const data = ref(null)
const latest= ref([])
const router = useRouter()
const route = useRoute()

const deleteOption = ref(false)

posts().getPost(route.params.id).then((res)=>{
    if(res.ok){
        data.value = res.data
    }
})
posts().getLatestPost().then((res)=>{
    if(res.ok){
        latest.value = res.data
    }
})

const commentData = ref({
    body: '',
    parentCommentId: null
})

const isUserPost = computed(()=>{
    return user().data() && data.value.user.id === user().data().id
})
const deletePost= (id)=>{
    posts().deletePost(id).then((res)=>{
        if(res.ok){
            router.push({name: 'home'})
        }
    })
}
const postComment = ()=>{
    if(commentData.value.body.trim().length < 1) return false
    posts().postComment(route.params.id, commentData.value).then((res)=>{
        if(res.ok){
            commentData.value = {
                body: '',
                parentCommentId: null
            }
            data.value.comments.push(res.data)
        }
    })
}
watch(()=>route.params.id,()=>{
    posts().getPost(route.params.id).then((res) => {
        if (res.ok) {
            data.value = res.data
        }
    })
    posts().getLatestPost().then((res) => {
        if (res.ok) {
            latest.value = res.data
        }
    })
})
</script>