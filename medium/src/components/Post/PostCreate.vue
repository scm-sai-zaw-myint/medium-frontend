<template>
    <PostForm :data="data" :categories="categories" @form-submit="createPost" :validation="formError" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PostForm from './PostForm.vue';

const store = useStore()
const categories = ref(store.state.category.data)
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
    store.dispatch(`createPost`,form).then((res)=>{
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