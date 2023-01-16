<template>
    <Posts :data="postData" :all-category="allCategory" :latest="latest" :placeholder="placeholder" />
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { ref, toRef } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Posts from './Posts.vue';
const store = useStore()
const postData = toRef(store.state.posts,'related')
const latest = ref(store.state.posts.latest)
const allCategory = ref(store.state.category.data)
const route = useRoute()

const placeholder = computed(()=>{
    return `No post related with '${route.params.category}'`
})
</script>