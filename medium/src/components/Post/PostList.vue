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
                                {{post.description}}
                            </router-link>
                            <div class="d-flex align-items-center justify-content-between" style="font-size: .7em">
                                <div class="d-flex align-items-center">
                                    <span class="me-2">{{ getDate(post.createdAt) }}</span>
                                    <span>1 min read</span>
                                    <span class="rounded bg-gray-opt px-1 mx-1" v-for="category in post.category">
                                        {{category.name}}
                                    </span>
                                    <span>
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
                            <RouterLink :to="{name: 'post-index',params:{id: post.id}}" class="w-100">
                                <img :src="getImage(post.image)" alt="" style="display: block;width: 100%;">
                            </RouterLink>
                        </div>
                    </div>
                    
                </div>
                <div class="col-lg-4 order-lg-2 col-sm-12 order-1">
                    <div class="w-80 mx-auto">
                        <h6 class="mb-2">DISCOVER MORE OF WHAT MATTERS TO YOU</h6>
                        <div class="px-2 py-4 border-bottom border-secondary float-start" style="font-size: .8em;">
                            <span class="border p-2 rounded m-1 float-start">Programming</span>
                            <span class="border p-2 rounded m-1 float-start">Data Sience</span>
                            <span class="border p-2 rounded m-1 float-start">Technology</span>
                            <span class="border p-2 rounded m-1 float-start">Programming</span>
                            <span class="border p-2 rounded m-1 float-start">Programming</span>
                        </div>
                        <div class="py-4 float-start" style="font-size: .8em;">
                            <span class="m-1 float-start">help</span>
                            <span class="m-1 float-start">Contact us</span>
                            <span class="m-1 float-start">About us</span>
                            <span class="m-1 float-start">Developing</span>
                            <span class="m-1 float-start">test</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {getImage,getProfile,getDate} from '../../js/script'
const props = defineProps({
    data:{
        type: Array,
        default: [
            {
                id: null,
                title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio accusamus",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores obcaecati ipsam, recusandae",
                image: "http://localhost:8000/api/assets/image/aGVsbG8gd29ybGQgZQ==.webp",
                created: new Date(),
                category: [
                    {
                        id: 0,
                        name: "test category"
                    },
                    {
                        id: 1,
                        name: "test category"
                    }
                ],
                user: {
                    id: null,
                    name: "Test",
                    profile: "http://localhost:8000/api/assets/image/aGVsbG8gd29ybGQgZQ==.webp"
                }
            }
        ]
    }
})


</script>

<style lang="scss" scoped>

</style>