<template>
    <Posts :data="postData" :all-category="allCategory" :latest="latest" :placeholder="placeholder" />
</template>
<script setup>
import { category, posts } from '@/js/script';
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Posts from './Posts.vue';
const postData = ref([])
const latest = ref([])
const allCategory = ref([])
const route = useRoute()

posts().getRelatedPosts(route.params.category).then((res)=>{
    if(res.ok){
        postData.value = res.data
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
const placeholder = computed(()=>{
    return `No post related with '${route.params.category}'`
})

watch(()=> route.params.category, ()=>{
    if('category' in route.params){
        posts().getRelatedPosts(route.params.category).then((res) => {
            if (res.ok) {
                postData.value = res.data
            }
        })
    }
})

</script>