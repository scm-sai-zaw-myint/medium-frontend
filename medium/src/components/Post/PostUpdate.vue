<template>
    <PostForm :categories="categories" options="Update" :validation="formError" :data="getPostData" @form-submit="updatePost"/>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PostForm from './PostForm.vue';

const store =useStore()
const route = useRoute()
const router = useRouter()

const data = ref(store.state.postdetail.data)
const categories = ref(store.state.category.data)

const formError = ref({
    title: null,
    description: null,
    categories: null,
    image: null
})

const getPostData = computed(()=>{
    console.log(data.value.categories)
    if(data.value.categories && data.value.categories.length > 0){
        let x =[]
        data.value.categories.forEach((e)=>{
            x.push(e.id)
        })
        data.value.category = x
    }
    return data.value
})

const updatePost = (form)=>{
    store.dispatch(`updatePost`,{id: route.params.id, payload: form}).then((res)=>{
        if(res.ok){
            router.push({name: 'home'})
            formError.value = {
                title: null,
                description: null,
                categories: null,
                image: null
            }
        }else{
            formError.value = Object.assign(formError.value, res.data)
        }
    })
}
</script>