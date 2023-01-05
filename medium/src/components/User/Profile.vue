<template>
    <div class="w-100 d-flex justify-content-center py-4">
        <div class="container-wrapper m-sm-2">
            <div class="w-80 w-sm-100 mx-auto d-flex flex-wrap col-12">
                <div class="col-lg-8 order-lg-1 col-sm-12 order-2 d-flex flex-column border-md-1 border-end border-0 pe-4">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="profile-img">
                                <img :src="getProfile(data.profile)" alt="">
                            </div>
                            <h4 class="mx-2">{{data.name}}</h4>
                        </div>
                        <button class="px-2 py-1 rounded-pill bg-secondary mx-3 text-light border-0 text-sm">
                            Edit Profile
                        </button>
                    </div>
                    <div class="w-100 my-4 ">
                        <h3 class="border-bottom border-1 py-2">Information</h3>
                        <div class="my-4">
                            <h4>Post Count</h4>
                            <span class="text-secondary rounded-circle bg-secondary px-2 text-light">{{data.posts.length}}</span>
                        </div>
                        <div class="my-4">
                            <h4>Bio</h4>
                            <span class="text-secondary">
                                {{data.bio}}
                            </span>
                        </div>
                        <h3 class="border-bottom border-1 py-2">My Posts</h3>
                        <div class="row mt-4 mb-4 col-md-12 border-1 border-bottom pb-4" v-for="post in data.posts">
                            <div class="col-md-8">
                                <div class="d-flex align-items-center">
                                    <div class="post-profile border">
                                        <img :src="getProfile(post.user.profile)" alt="" style>
                                    </div>
                                    <b class="fs-5 font-weight-bold px-2 truncate">{{post.user.name}}</b>
                                    <span>{{getDate(post.createdAt)}}</span>
                                </div>
                                <router-link :to="{name: 'post-index',params:{id: post.id}}" class="mt-2 text-gray" :class="`post-des`">
                                    <h5 class="mt-2 post-title">{{post.title}}</h5>
                                    {{post.description}}
                                </router-link>
                                <div class="d-flex align-items-center justify-content-between" style="font-size: 1em">
                                    <div class="d-flex align-items-center">
                                        <span class="rounded-pill bg-gray-opt px-2 py-1 mx-1"
                                            v-for="category in post.category">{{category.name}}</span>
                                        <span>. 6 min read .</span>
                                        <span class="sp">Selected for you.</span>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <button class="mx-2 bg-transparent px-0 py-0 border-0 d-flex align-items-center justify-content-center"
                                            style="width: 20px;">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" style="width: 20px;">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                        <a href="#" class="fa-solid fa-ellipsis"></a>
                                    </div>
                        
                                </div>
                            </div>
                            <div class="col-md-4 d-flex my-4 align-items-center justify-content-center">
                                <RouterLink :to="{name: 'post-index',params:{id: post.id}}"
                                    class="d-flex align-items-center justify-content-center">
                                    <img :src="getImage(post.image)" alt="" class="post-img">
                                </RouterLink>
                            </div>
                        </div>
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
                            <span class="border p-2 rounded-pill bg-light m-1 float-start" v-for="category in allCategory">{{category.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getDate, getImage, getProfile } from '@/js/script';

const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    latest: {
        type: Array,
        default: []
    },
    allCategory:{
        type: Array,
        default: []
    }
})

</script>