<template>
    <div class="py-2">
        <div class="mb-2 w-100 ps-4" v-for="child in data">
            <div class="border p-2 rounded w-100">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <div class="profile-img">
                            <img :src="getProfile(child.user.profile)" alt="">
                        </div>
                        <div class="mx-2">
                            <h5>{{child.user.name}}</h5>
                            <span class="text-sm">{{getDate(child.createdAt)}}</span>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="updateComment(child)">
                    <input @change="updateComment(child)" :id="getCommentId(child)" class="px-3 py-2 w-100 comment-div" readonly
                        :value="child.body">
                </form>
                <div class="p-2 d-flex align-items-center">
                    <button @click="deleteComment(child)" v-if="isUserComment(child.user.id)" class="btn text-light bg-danger me-2"
                        style="font-size: .8em;">Delete</button>
                    <button v-if="isUserComment(child.user.id)" class="btn text-light bg-secondary me-2" @click="editComment(child)"
                        style="font-size: .8em;">Edit</button>
                    <button class="btn text-light bg-info me-2" @click="replyComment(child.id)"
                        style="font-size: .8em;">Reply</button>
                </div>
                <form @submit.prevent="postReply(child)" :id="`reply-${child.id}`"
                    class="p-2 d-flex align-items-center justify-content-center comment-reply-box">
                    <input :id="`reply-body-${child.id}`" type="text" class="w-100 form-control rounded px-3 py-2 me-3"
                        placeholder="Enter reply here">
                    <button class="btn btn-primary " style="font-size: .9em;">Reply</button>
                </form>
            </div>
            <Comments v-if="child.childComments.length > 0" :data="child.childComments" />
        </div>
    </div>
</template>
<script setup>
import { getDate, getProfile } from '@/js/script';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const route = useRoute()

const props = defineProps({
    data:{
        type: Array,
        default:[]
    }
})
const isUserComment = (id)=>{
    return id === store.state.user.profileData.id
}

const getCommentId = (comment)=>{
    return comment.parentCommentId !=null ? `com-${comment.parentCommentId}-${comment.id}` : `com-${comment.id}`
}

const editComment = (comment)=>{
    let id = getCommentId(comment)
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