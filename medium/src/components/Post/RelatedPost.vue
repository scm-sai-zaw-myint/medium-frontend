<template>
    <Posts :data="postData" :all-category="allCategory" :latest="latest" :placeholder="placeholder" url="?page=" :pagination="paginateData" />
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
const paginateData = ref({})
const route = useRoute()

posts().getRelatedPosts(route.params.category, route.query.page).then((res)=>{
    if(res.ok){
        postData.value = res.data
        paginateData.value = res.pagination
    }
})
posts().getLatestPost().then((res)=>{
    if(res.ok){
        latest.value = res.data
    }
})
category().getUsedCategories().then((res)=>{
    if(res.ok){
        allCategory.value = res.data
    }
})
const placeholder = computed(()=>{
    return `No post related with '${route.params.category}'`
})

watch(()=> [route.params.category, route.query.page], ()=>{
    if('category' in route.params){
        posts().getRelatedPosts(route.params.category, route.query.page).then((res) => {
            if (res.ok) {
                postData.value = res.data
                paginateData.value = res.pagination
            }
        })
    }
})

</script>