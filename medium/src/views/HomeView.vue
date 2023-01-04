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
    <PostList :data="postData" />
  </MainLayout>
</template>
<script setup>
import PostList from '@/components/Post/PostList.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import MainLayout from './Layouts/MainLayout.vue';

const store = useStore()
const postData = ref(store.state.posts.data)
console.log(store.state.posts.data)
</script>
