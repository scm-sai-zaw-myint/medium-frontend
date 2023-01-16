<template>
    <Posts :data="postData" :latest="latest" :all-category="allCategory" :placeholder="placeholder" />
</template>

<script setup>
import Posts from '@/components/Post/Posts.vue';
import { computed } from '@vue/reactivity';
import { ref, toRef } from 'vue';
import { routeLocationKey, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const postData = toRef(store.state.posts,'search')
const latest = ref(store.state.posts.latest)
const allCategory = ref(store.state.category.data)
const route = useRoute()
const placeholder = computed(()=>{
    return `No post match with '${route.params.search}'`
})
</script>