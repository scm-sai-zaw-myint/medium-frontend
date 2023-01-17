<template>
    <PostForm :data="data" :categories="categories" @form-submit="createPost" :validation="formError" />
</template>

<script setup>
import { category, posts } from '@/js/script';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostForm from './PostForm.vue';

const categories = ref([])
category().getAllCategories().then((res)=>{
    categories.value = res.data
})
const router = useRouter()
const formError = ref({
    title: null,
    description: null,
    categories: null,
    image: null
})
const data = {
    id: null,
    title: '',
    description: '',
    category: [],
    image: null
}
const createPost = (form)=>{
    posts().createPost(form).then((res)=>{
        if(res.ok){
            formError.value = {
                title: null,
                description: null,
                categories: null,
                image: null
            }
            router.push({name: 'home'})
        }else{
            formError.value = res.data
        }
    })
}
</script>