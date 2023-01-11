<template>
    <Posts :data="postData" :latest="latest" :all-category="allCategory" />
</template>

<script setup>
import Posts from '@/components/Post/Posts.vue';
import { ref, toRef } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const postData = toRef(store.state.posts,'search')
console.log(postData.value)
const latest = ref(store.state.posts.latest)
const allCategory = ref(store.state.category.data)

</script>