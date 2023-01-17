<template>
    <Posts :data="postData" :latest="latest" :all-category="allCategory" :placeholder="placeholder" />
</template>

<script setup>
import Posts from '@/components/Post/Posts.vue';
import { category, posts } from '@/js/script';
import { computed } from '@vue/reactivity';
import { onMounted, ref, toRef, watch } from 'vue';
import { useRoute } from 'vue-router';

const postData = ref([])
const latest = ref([])
const allCategory = ref([])
const route = useRoute()
const placeholder = computed(()=>{
    return `No post match with '${route.params.search}'`
})
watch(()=> route.params.search, ()=>{
    posts().searchPosts(route.params.search).then((res)=>{
        if(res.ok){
            postData.value =res.data
        }
    })
})
onMounted(()=>{
    posts().searchPosts(route.params.search).then((res)=>{
        if(res.ok){
            postData.value =res.data
        }
    })
    posts().getLatestPost().then((res)=>{
        if(res.ok){
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