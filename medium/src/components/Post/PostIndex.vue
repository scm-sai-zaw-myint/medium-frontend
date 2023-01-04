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
                        <button class="px-2 py-1 rounded-pill bg-danger mx-3 text-light border-0 text-sm">
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
                        <h3 class="mb-2">2022 latest Posts</h3>
                        <div class="d-flex flex-column">
                            <div class="row my-3">
                                <div class="col-md-12 d-flex">
                                    <div class="overflow-hidden rounded-circle d-flex align-items-center justify-content-center"
                                        style="height: 30px;width: 30px;">
                                        <img src="../../assets/img/user-profile.webp" alt="Profile" height="100%">
                                    </div>
                                    <span class="px-2">Zulie Rane</span>
                                </div>
                                <div class="col-md-12">
                                    <span class="fw-bold">2022 in a world : Permastressed</span>
                                </div>
                            </div>
                            <div class="row my-3">
                                <div class="col-md-12 d-flex">
                                    <div class="overflow-hidden rounded-circle d-flex align-items-center justify-content-center"
                                        style="height: 30px;width: 30px;">
                                        <img src="../../assets/img/user-profile.webp" alt="Profile" height="100%">
                                    </div>
                                    <span class="px-2">Zulie Rane</span>
                                </div>
                                <div class="col-md-12">
                                    <span class="fw-bold">2022 in a world : Permastressed</span>
                                </div>
                            </div>
                            <div class="row my-3">
                                <div class="col-md-12 d-flex">
                                    <div class="overflow-hidden rounded-circle d-flex align-items-center justify-content-center"
                                        style="height: 30px;width: 30px;">
                                        <img src="../../assets/img/user-profile.webp" alt="Profile" height="100%">
                                    </div>
                                    <span class="px-2">Zulie Rane</span>
                                </div>
                                <div class="col-md-12">
                                    <span class="fw-bold">2022 in a world : Permastressed</span>
                                </div>
                            </div>
                        </div>
                        <div class="px-2 py-4 border-top border-secondary float-start" style="font-size: .8em;">
                            <span class="border p-2 rounded-pill bg-light m-1 float-start" v-for="category in data.categories">{{category.name}}</span>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-80 mx-auto py-3">
                <h4>Comments</h4>
                <div class="w-90 mx-auto p-4 text-sm ">
                    <div class="w-100 d-flex flex-column">
                        <label for="comment">Here you can left message ! </label>
                        <textarea name="" id="comment" cols="30" rows="10" class="border-1 p-2 rounded"
                            placeholder="What're you thoughts?"></textarea>
                        <div class="d-flex align-items-center justify-content-end my-2">
                            <button class="p-1 bg-secondary text-light border-0 rounded">
                                Comment
                            </button>
                        </div>
                    </div>
                    <div class="my-2">
                        <div class="w-100 my-4 border-bottom" v-for="comment in data.comments">
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
                            <p class="px-4">
                                {{comment.body}}
                            </p>
                            <div class="p-2" v-if="comment.childComments && comment.childComments.length > 0">
                                <span class="p-2">
                                    {{comment.childComments.length}} . reply
                                </span>
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
const store = useStore()

const data = toRef(store.state.postdetail,'data')
console.log(data.value)

</script>