<template>
    <div class="w-100 d-flex justify-content-center py-4">
        <div class="container-wrapper m-sm-2">
            <div class="w-100 d-flex flex-wrap">
                <div class="col-lg-8 order-lg-1 col-sm-12 order-2 d-flex flex-column">
                    <div class="row mt-4 mb-4 col-md-12 border-1 border-bottom pb-2"
                    v-for="post in postData">
                        <div class="col-md-8">
                            <RouterLink :to="{name: 'profile',params: {id:post.user.id}}" class="d-flex align-items-center">
                                <div class="post-profile border">
                                    <img :src="getProfile(post.user.profile)" alt="" style>
                                </div>
                                <b class="fs-5 font-weight-bold px-2 truncate">{{post.user.name}}</b>
                                <span>{{getDate(post.createdAt)}}</span>
                            </RouterLink>
                            <router-link :to="{name: 'post-index',params:{id: post.id}}" class="mt-2 text-gray" :class="`post-des`">
                                <h5 class="mt-2 post-title">{{post.title}}</h5>
                                <div class="text-truncate-container">
                                    <p class="post-description">
                                        {{post.description}}
                                    </p>
                                </div>
                            </router-link>
                            <div class="float-start align-items-center justify-content-between w-100" style="font-size: 1em">
                                <div class="float-start mt-1 align-items-center lf-post-footer">
                                    <router-link class="float-start rounded-pill bg-gray-opt px-2 py-1 mx-1 mb-1" v-for="category in post.categories"
                                    :to="{name: 'related-post',params:{category: category.name}}">
                                        {{category.name}}
                                    </router-link>
                                    
                                    <span class="float-start py-1 me-2 d-flex align-items-center"><span class="bg-secondary seperate mx-2"></span> {{ post.time }}</span>
                                    <!-- <span class="float-start sp py-1">Selected for you.</span> -->
                                </div>
                                <div class="float-end d-flex align-items-center rg-post-footer">
                                    <RouterLink v-if="isMyPost(post.user.id)" :to="{name: 'edit-post',params:{id: post.id}}">
                                        <span class="fa-solid fa-ellipsis"></span>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 d-flex my-4 align-items-center justify-content-center">
                            <RouterLink :to="{name: 'post-index',params:{id: post.id}}" class="d-flex align-items-center justify-content-center">
                                <img :src="getImage(post.image)" alt="" class="post-img">
                            </RouterLink>
                        </div>
                    </div>
                    <div class="p-4 text-center text-secodary" v-if="data.length == 0">{{ placeholder }}</div>
                    <Pagination :data="paginateData" :url="url" />
                </div>
                <div class="col-lg-4 order-lg-2 col-sm-12 order-1">
                    <div class="w-80 mx-auto">
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
                            <router-link class="border p-2 rounded-pill bg-light m-1 float-start" v-for="cate in allCategory"
                            :to="{name: 'related-post',params:{category: cate.name}}">
                                {{cate.name}}
                            </router-link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { getDate, getImage, getProfile, user } from '@/js/script';
import { toRef } from 'vue';
import { RouterLink } from 'vue-router';
import Pagination from '../UI/Pagination.vue';

const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    latest: {
        type: Array,
        default: []
    },
    allCategory:{
        type: Array,
        default: []
    },
    placeholder:{
        type:String,
        default: 'No posts.'
    },
    pagination:{
        type: Object,
        default: {}
    },
    url:{
        type: String,
        default: '/?page='
    }
})

const postData = toRef(props,'data')
const paginateData = toRef(props, 'pagination')
const isMyPost = (id)=>{
    return user().data() && user().data().id === id
}

</script>