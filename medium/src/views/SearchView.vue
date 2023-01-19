<template>
    <Posts :data="postData" :latest="latest" :all-category="allCategory" url="?page=" :pagination="pagination" :placeholder="placeholder" />
</template>

<script setup>
import Posts from '@/components/Post/Posts.vue';
import { category, posts } from '@/js/script';
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const postData = ref([])
const latest = ref([])
const allCategory = ref([])
const route = useRoute()
const pagination = ref({})

const placeholder = computed(() => {
    return `No post match with '${route.params.search}'`
})

posts().searchPosts(route.params.search).then((res) => {
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
watch(() => [route.params.search, route.query.page], () => {
    posts().searchPosts(route.params.search,route.query.page).then((res) => {
        if (res.ok) {
            postData.value = res.data
            pagination.value = res.pagination
        }
    })
})
</script>