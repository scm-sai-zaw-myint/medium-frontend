<template>
  <MainLayout>
    <div id="top-banner" class="w-100 primary-bg d-flex justify-content-center align-items-center border-bottom border-dark">
        <div class="container-wrapper">
            <div class="w-100 d-flex">
                <div class="top-banner d-flex flex-column">
                    <h2>Stay curious.</h2>
                    <h3>
                        Discover stories, thinking, and expertise from writers on any topic.
                    </h3>
                    <button class="btn rounded-pill">Start reading</button>
                </div>
            </div>
        </div>
    </div> 
    <PostList :data="postData" :all-category="allCategory"  />
  </MainLayout>
</template>
<script setup>
import axiosClient from '@/axios/axios';
import PostList from '@/components/Post/PostList.vue';
import { posts,category } from '@/js/script';
import { onMounted, ref } from 'vue';
import MainLayout from './Layouts/MainLayout.vue';

const postData = ref([])
const allCategory = ref([])
onMounted(()=>{
    posts().getAllPost().then((res)=>{
        if(res.ok){
            postData.value = res.data
        }
    })
    category().getAllCategories().then((res)=>{
        if(res.ok){
            allCategory.value = res.data
        }
    })
})
</script>
