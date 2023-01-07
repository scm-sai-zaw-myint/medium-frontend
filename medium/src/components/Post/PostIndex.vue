<template>
    <div class="w-100 d-flex justify-content-center py-4">
        <div class="container-wrapper m-sm-2">
            <div class="w-80 w-sm-100 mx-auto d-flex flex-wrap col-12 border-1 border-bottom">
                <div class="col-lg-8 order-lg-1 col-sm-12 order-2 d-flex flex-column border-1 border-end pe-4">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="profile-img">
                                <img :src="getProfile(data.user.profile)" alt="">
                            </div>
                            <div class="mx-2">
                                <h5>{{data.user.name}}</h5>
                                <span class="text-sm">{{getDate(data.createdAt)}}</span>
                            </div>
                            
                        </div>
                        <button v-if="isUserPost"
                        @click="deletePost(data.id)"
                         class="px-2 py-1 rounded-pill bg-danger mx-3 text-light border-0 text-sm">
                            Delete
                        </button>
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
                            <span class="border p-2 rounded-pill bg-light m-1 float-start" v-for="category in data.categories">{{category.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-80 mx-auto py-3">
                <h4>Comments</h4>
                <div class="w-100 mx-auto p-4 text-sm ">
                    <form @submit.prevent="postComment" class="w-100 d-flex flex-column">
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
                        <div class="w-100 my-4  rounded" v-for="comment in data.comments">
                            <div class="w-100 border p-2 rounded">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <div class="profile-img">
                                            <img :src="getProfile(comment.user.profile)" alt="">
                                        </div>
                                        <div class="mx-2">
                                            <h5>{{comment.user.name}}</h5>
                                            <span class="text-sm">{{getDate(comment.createdAt)}}</span>
                                        </div>
                                    </div>
                                </div>
                                <form @submit.prevent="updateComment(comment)">
                                    <input @change="updateComment(comment)" :id="`com-${comment.id}`" class="px-3 py-2 w-100 comment-div" readonly
                                        :value="comment.body">
                                </form>
                                <div class="p-2 d-flex align-items-center">
                                    <button @click="deleteComment(comment)" v-if="isUserComment(comment.user.id)" class="btn text-light bg-danger me-2"
                                        style="font-size: .8em;">Delete</button>
                                    <button v-if="isUserComment(comment.user.id)" class="btn text-light bg-secondary me-2"
                                        @click="editComment(comment)" style="font-size: .8em;">Edit</button>
                                    <button class="btn text-light bg-info me-2" @click="replyComment(comment.id)"
                                        style="font-size: .8em;">Reply</button>
                                </div>
                                <form @submit.prevent="postReply(comment)" :id="`reply-${comment.id}`"
                                    class="p-2 d-flex align-items-center justify-content-center comment-reply-box">
                                    <input :id="`reply-body-${comment.id}`" type="text" class="w-100 form-control rounded px-3 py-2 me-3"
                                        placeholder="Enter reply here">
                                    <button class="btn btn-primary " style="font-size: .9em;">Reply</button>
                                </form>
                            </div>
                            <div class="py-2 child-com-box" v-if="comment.childComments && comment.childComments.length > 0"
                                >
                                <div class="mb-2 border p-2 rounded w-100" v-for="childcom in comment.childComments">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <div class="profile-img">
                                                <img :src="getProfile(childcom.user.profile)" alt="">
                                            </div>
                                            <div class="mx-2">
                                                <h5>{{childcom.user.name}}</h5>
                                                <span class="text-sm">{{getDate(childcom.createdAt)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <form @submit.prevent="updateComment(childcom)">
                                        <input @change="" :id="`com-${childcom.parentCommentId}-${childcom.id}`" class="px-3 py-2 w-100 comment-div" readonly :value="childcom.body">
                                    </form>
                                    <div class="p-2 d-flex align-items-center">
                                        <button @click="deleteComment(childcom)" v-if="isUserComment(childcom.user.id)" class="btn text-light bg-danger me-2"
                                            style="font-size: .8em;">Delete</button>
                                        <button v-if="isUserComment(childcom.user.id)" class="btn text-light bg-secondary me-2"
                                            @click="editComment(childcom)" style="font-size: .8em;">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { toRef } from 'vue';
import { useStore } from 'vuex';
import { getImage,getProfile,getDate } from '@/js/script';
import { computed, ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
const store = useStore()

const data = toRef(store.state.postdetail,'data')
const latest= toRef(store.state.posts,'latest')
const router = useRouter()
const route = useRoute()

const commentData = ref({
    body: '',
    parentCommentId: null
})

const isUserPost = computed(()=>{
    return data.value.user.id === store.state.user.profileData.id
})
const isUserComment = (id)=>{
    return id === store.state.user.profileData.id
}
const deletePost= (id)=>{
    store.dispatch(`deletePost`, id).then((res)=>{
        if(res.ok){
            router.push({name: 'home'})
        }
    })
}
const postComment = ()=>{
    if(commentData.value.body.trim().length < 1) return false
    store.dispatch('postComment',commentData.value).then((res)=>{
        if(res.ok){
            commentData.value = {
                body: '',
                parentCommentId: null
            }
        }
    })
}
const editComment = (comment)=>{
    let id = comment.parentCommentId !=null ? `com-${comment.parentCommentId}-${comment.id}` : `com-${comment.id}`
    let com = document.getElementById(id)   
    com.removeAttribute('readonly')
    com.classList.add('editing')
    com.focus()
}
const updateComment = (comment)=>{
    let id = comment.parentCommentId !=null ? `com-${comment.parentCommentId}-${comment.id}` : `com-${comment.id}`
    let com = document.getElementById(id)
    let payload = {
        id: comment.id,
        body: com.value,
        parentCommentId: comment.parentCommentId
    }
    com.classList.remove('editing')
    com.setAttribute("readonly",true)
    store.dispatch(`updateComment`,{pid: route.params.id, data: payload})
}
const replyComment = (id)=>{
    let replyBox = document.getElementById(`reply-${id}`)
    replyBox.classList.remove('comment-reply-box')
}
const postReply = (comment)=>{
    let reply = document.getElementById(`reply-body-${comment.id}`)
    let replyBox = document.getElementById(`reply-${comment.id}`)
    
    if(!reply.value || reply.value.trim().length < 1) return false
    let payload = {
        body: reply.value,
        parentCommentId: comment.id
    }
    store.dispatch('postComment',payload).then((res)=>{
        if(res.ok){
            reply.value = null
            replyBox.classList.add('comment-reply-box')
        }
    })
}
const deleteComment = (comment)=>{
    store.dispatch('deleteComment',comment).then((res)=>{
        console.log(res)
    })
}
const closeReply = (comment)=>{
    let replyBox = document.getElementById(`reply-${comment.id}`)
    replyBox.classList.add('comment-reply-box')
}
</script>