<template>
    <div class="py-2">
        <div class="mb-2 w-100 ps-4" v-for="child in comment_data">
            <div class="border p-2 rounded w-100">
                <div class="d-flex align-items-center justify-content-between">
                    <RouterLink :to="{name : 'profile',params:{id: child.user.id}}" class="d-flex align-items-center">
                        <div class="profile-img">
                            <img :src="getProfile(child.user.profile)" alt="">
                        </div>
                        <div class="mx-2">
                            <h5>{{child.user.name}}</h5>
                            <span class="text-sm">{{getDate(child.createdAt)}}</span>
                        </div>
                    </RouterLink>
                </div>
                <form @submit.prevent="updateComment(child)" class="">
                    <textarea @change="updateComment(child)" @focusout="updateComment(child)" :id="getCommentId(child)" class="px-3 w-100 comment-div" readonly
                         style="height: fit-content;font-size: 1.3em;box-sizing: border-box;display: inline-table;">{{ child.body }}</textarea>
                </form>
                <div class="p-2 d-flex align-items-center">
                    <button @click="deleteComment(child)" v-if="isUserComment(child.user.id)" class="btn text-light bg-danger me-2"
                        style="font-size: 1em;">Delete</button>
                    <button v-if="isUserComment(child.user.id)" class="btn text-light bg-secondary me-2" @click="editComment(child)"
                        style="font-size: 1em;">Edit</button>
                    <button class="btn text-light bg-info me-2" @click="replyComment(child.id)"
                        style="font-size: 1em;" v-if="user().isUserLogged()">Reply</button>
                </div>
                <form @submit.prevent="postReply(child)" :id="`reply-${child.id}`"
                    class="p-2 d-flex align-items-center justify-content-center comment-reply-box">
                    <input :id="`reply-body-${child.id}`" type="text" class="w-100 form-control rounded px-3 py-2 me-3"
                        placeholder="Enter reply here">
                    <button class="btn btn-primary " style="font-size: .9em;" type="submit">Reply</button>
                    <button class="btn btn-secondary ms-2" style="font-size: .9em;" type="button" @click="closeReply(child)">close</button>
                </form>
            </div>
            <Comments v-if="child.childComments.length > 0" :data="child.childComments" />
        </div>
    </div>
</template>
<script setup>
import { getDate, getProfile, posts, user } from '@/js/script';
import { toRef } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const props = defineProps({
    data:{
        type: Array,
        default:[]
    }
})

const comment_data = toRef(props, 'data')
console.log(comment_data.value)
const isUserComment = (id)=>{
    return user().data() && id === user().data().id
}

const getCommentId = (comment)=>{
    return comment.parentCommentId !=null ? `com-${comment.parentCommentId}-${comment.id}` : `com-${comment.id}`
}

const editComment = (comment)=>{
    let id = getCommentId(comment)
    let com = document.getElementById(id)   
    com.removeAttribute('readonly')
    com.parentElement.classList.add('editing')
    com.classList.remove('cm-foc')
    com.focus()
    com.scrollTop = com.scrollHeight
    com.selectionEnd = com.value.length 
}
const updateComment = (comment)=>{
    let id = comment.parentCommentId !=null ? `com-${comment.parentCommentId}-${comment.id}` : `com-${comment.id}`
    let com = document.getElementById(id)
    let payload = {
        id: comment.id,
        body: com.value,
        parentCommentId: comment.parentCommentId
    }
    com.parentElement.classList.remove('editing')
    com.classList.add('cm-foc')
    com.setAttribute("readonly",true)
    posts().updateComment({pid: route.params.id, data: payload})
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
    
    posts().postComment(route.params.id,payload).then((res)=>{
        console.log(res,comment_data.value)
        if(res.ok){
            reply.value = null
            replyBox.classList.add('comment-reply-box')
            let index = comment_data.value.findIndex((c)=>c.id === res.data.parentCommentId)
            if(index > -1){
                comment_data.value[index].childComments.push(res.data)
            }
        }
    })
}
const deleteComment = (comment)=>{
    posts().deleteComment(route.params.id,comment).then((res)=>{
        let index = comment_data.value.findIndex((c) => c.id === comment.id)
        if (index > -1) {
            comment_data.value.splice(index, 1)
        }
    })
}

const closeReply = (comment)=>{
    let replyBox = document.getElementById(`reply-${comment.id}`)
    replyBox.classList.add('comment-reply-box')
}
</script>