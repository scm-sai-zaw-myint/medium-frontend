<template>
    <PageLayout>
        <Posts :data="postData" :latest="latest" :all-category="allCategory" />
    </PageLayout>
</template>
<script setup>
import PageLayout from './Layouts/PageLayout.vue';
import Posts from '@/components/Post/Posts.vue'
import { onMounted, ref } from 'vue';
import { category, posts } from '@/js/script';
const postData = ref([])
const latest = ref([])
const allCategory = ref([])
onMounted(()=>{
    posts().getAllPost().then((res) => {
        if (res.ok) { postData.value = res.data }
    })
    posts().getLatestPost().then((res) => {
        if (res.ok) {
            latest.value = res.data
        }
    })
    category().getAllCategories().then((res)=>{
        if(res.ok){
            allCategory.value = res.data
        }
    })
})
</script>