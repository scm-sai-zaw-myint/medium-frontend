<template>
    <PostForm :data="data" :categories="categories" @form-submit="createPost"/>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PostForm from './PostForm.vue';

const store = useStore()
const categories = ref(store.state.category.data)
const router = useRouter()
const createPost = (form)=>{
    store.dispatch(`createPost`,form).then((res)=>{
        if(res.ok){
            router.push({name: 'home'})
        }
    })
}
const data = {
    id: null,
    title: '',
    description: '',
    category: [],
    image: null
}
</script>