<template>
    <PageLayout>
        <Posts :data="postData" :latest="latest" :all-category="allCategory" :pagination="pagination" />
    </PageLayout>
</template>
<script setup>
import PageLayout from './Layouts/PageLayout.vue';
import Posts from '@/components/Post/Posts.vue'
import { ref, watch } from 'vue';
import { category, posts } from '@/js/script';
import { useRoute } from 'vue-router';
const postData = ref([])
const latest = ref([])
const allCategory = ref([])
const pagination = ref({})
const route = useRoute()
posts().getAllPost(route.query.page).then((res) => {
    if (res.ok) {
        postData.value = res.data
        pagination.value = res.pagination
    }
})
posts().getLatestPost().then((res) => {
    if (res.ok) {
        latest.value = res.data
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