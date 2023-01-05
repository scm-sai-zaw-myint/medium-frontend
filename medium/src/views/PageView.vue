<template>
    <PageLayout>
        <Posts :data="postData" :latest="latest" :all-category="allCategory" />
    </PageLayout>
</template>
<script setup>
import PageLayout from './Layouts/PageLayout.vue';
import Posts from '@/components/Post/Posts.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
const store = useStore()
const postData = ref(store.state.posts.data)
const latest = ref(store.state.posts.latest)
const allCategory = ref(store.state.category.data)
</script>