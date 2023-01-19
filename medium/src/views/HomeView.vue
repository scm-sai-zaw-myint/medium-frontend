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
    <PostList :data="postData" :all-category="allCategory" :pagination="pagination" />
  </MainLayout>
</template>
<script setup>
import PostList from '@/components/Post/PostList.vue';
import { posts,category } from '@/js/script';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './Layouts/MainLayout.vue';

const postData = ref([])
const allCategory = ref([])
const pagination = ref({})
const route = useRoute()
posts().getAllPost(route.query.page).then((res) => {
    if (res.ok) {
        postData.value = res.data
        pagination.value = res.pagination
    }
})
category().getUsedCategories().then((res) => {
    if (res.ok) {
        allCategory.value = res.data
    }
})
watch(()=>route.query.page , ()=>{
    posts().getAllPost(route.query.page).then((res) => {
        if (res.ok) {
            postData.value = res.data
            pagination.value = res.pagination
        }
    })
})
</script>
