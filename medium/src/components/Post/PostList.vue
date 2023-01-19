<template>
    <div class="w-100 d-flex justify-content-center py-4">
        <div class="container-wrapper">
            <div class="w-100 d-flex flex-wrap">
                <div class="col-lg-8 order-lg-1 col-sm-12 order-2 d-flex flex-column"
                >
                    <div class="row mt-4 mb-4" v-for="post in data">
                        <div class="col-md-6">
                            <div class="d-flex align-items-center">
                                <div class="overflow-hidden rounded" style="width: 35px;">
                                    <img :src="getProfile(post.user.profile)" alt="" style="width: 100%" class="block rounded">
                                </div>
                                <span class="fs-6 px-2 truncate">{{post.user.name}}</span>
                            </div>
                            <router-link :to="{name: 'post-index',params:{id: post.id}}" class="mt-2 text-gray" :class="`post-des`">
                                <h5 class="mt-2 post-title">{{post.title}}</h5>
                                <div class="text-truncate-container">
                                    <p class="post-description">
                                        {{post.description}}
                                    </p>
                                </div>
                            </router-link>
                            <div class="d-flex align-items-center justify-content-between" style="font-size: .7em">
                                <div class="float-start">
                                    <span class="float-start me-2">{{ getDate(post.createdAt) }}</span>
                                    <router-link class="float-start rounded bg-gray-opt px-1 mx-1 mb-1" v-for="category in post.categories"
                                     :to="{name: 'related-post',params:{category:category.name}}">
                                        {{category.name}}
                                    </router-link>
                                    <span class="float-start ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFC017" stroke="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            style="width: 15px">
                                            <path stroke-linecap="round" stroke-linejoin="round"  stroke="currentColor"
                                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                    </span>
                                </div>
                                <a href="#" class="fa-regular fa-bookmark"></a>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12 home-post d-flex justify-content-center align-items-center">
                            <RouterLink :to="{name: 'post-index',params:{id: post.id}}" class="w-100 d-flex align-items-center justify-content-center">
                                <img :src="getImage(post.image)" alt="" style="display: block;width: 80%;">
                            </RouterLink>
                        </div>
                    </div>
                    <div class="p-4 text-center text-secodary" v-if="data.length == 0">{{ placeholder }}</div>
                    <Pagination :data="paginateData" url="/?page=" />
                </div>
                <div class="col-lg-4 order-lg-2 col-sm-12 order-1">
                    <div class="w-80 mx-auto">
                        <h6 class="mb-4">DISCOVER MORE OF WHAT MATTERS TO YOU</h6>
                        <div class="px-2 pb-3  border-secondary float-start" style="font-size: .8em;" v-for="cate in allCategory">
                            <router-link :to="{name: 'related-post',params:{category: cate.name}}" class="border p-2 rounded m-1 float-start">{{cate.name}}</router-link>
                        </div>
                        <div class="py-4 float-start border-top border-secondary w-100" style="font-size: .8em;">
                            <span class="m-1 float-start">help</span>
                            <span class="m-1 float-start">Contact us</span>
                            <span class="m-1 float-start">About us</span>
                            <span class="m-1 float-start">Developing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRef } from 'vue';
import {getImage,getProfile,getDate} from '../../js/script'
import Pagination from '../UI/Pagination.vue';
const props = defineProps({
    data:{
        type: Array,
        default: []
    },
    allCategory: {
        type: Array,
        default: []
    },
    placeholder:{
        type:String,
        default: 'No posts.'
    },
    pagination:{
        type: Object,
        default:{}
    }
})
const paginateData = toRef(props, 'pagination')

</script>

<style lang="scss" scoped>

</style>