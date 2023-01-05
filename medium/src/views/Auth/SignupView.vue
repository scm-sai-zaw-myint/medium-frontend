<template>
    <MainLayout>
        <div class="w-100 d-flex justify-content-center align-items-center">
        <div class="container-wrapper">
            <div class="w-80 mx-auto d-flex align-items-center justify-content-center py-4">
                <form @submit.prevent="submit(e)" class="d-flex col-md-12 flex-column border border-3 forms border-secondary">
                    <h3>SignUp</h3>
                    <div class="bg-danger text-light rounded p-2 d-flex justify-content-between" v-if="error">
                            <span>{{error}}</span>
                            <button @click.stop="error = null" class="border-0 rounded-circle bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    <div class="row">
                        <div class="d-flex flex-column mb-3 col-md-6">
                            <label for="name" style="font-size: 1.2em;" class="mb-2">Name</label>
                            <input v-model="inputData.name" type="text" id="name" name="name" class="rounded border border-1 px-3 py-2"
                            placeholder="Your name">
                        </div>
                        <div class="d-flex flex-column mb-3 col-md-6">
                            <label for="email" style="font-size: 1.2em;" class="mb-2">Email</label>
                            <input v-model="inputData.email" type="email" id="email" name="email" class="rounded border border-1 px-3 py-2"
                            placeholder="Your emial (example@gmail.com)">
                        </div>
                    </div>
                    <div class="row">
                        <div class="d-flex flex-column mb-3 col-md-6">
                            <label for="password" style="font-size: 1.2em;" class="mb-2">Password</label>
                            <input v-model="inputData.password" type="password" id="password" name="password" class="rounded border border-1 px-3 py-2"
                            placeholder="Password">
                        </div>
                        <div class="d-flex flex-column mb-3 col-md-6">
                            <label for="comfirm-password" style="font-size: 1.2em;" class="mb-2">Confirm password</label>
                            <input v-model="inputData.confirm" type="password" id="comfirm-password" name="comfirm-password" class="rounded border border-1 px-3 py-2"
                            placeholder="Confirm password">
                        </div>
                    </div>
                    <div class="d-flex flex-column mb-3">
                        <label for="bio" style="font-size: 1.2em;" class="mb-2">Bio</label>
                        <input v-model="inputData.bio" type="text" id="bio" name="password" class="rounded border border-1 px-3 py-2"
                        placeholder="Your Bio">
                    </div>
                    <button type="submit" class="w-auto border-0 fit-content px-3 py-2 bg-secondary text-light rounded">SignUp</button>
                </form>
            </div>
        </div>
    </div>
    </MainLayout>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MainLayout from '../Layouts/MainLayout.vue';

const error = ref(null)
const store = useStore()
const router = useRouter()

const inputData = ref({
    name: '',
    email: '',
    password: '',
    confirm: '',
    bio: ''
})
const submit = ()=>{
    let form = new FormData()
    form.append('name',inputData.value.name)
    form.append('email',inputData.value.email)
    form.append('bio',inputData.value.bio)
    form.append('password',inputData.value.password)
    
    if(inputData.value.password != inputData.value.confirm){
        error.value = "Password doesn't match"
        return false;
    }
    
    store.dispatch(`registration`,form).then((res)=>{
        if(res.ok){
            router.push({name: 'home'})
        }
        else{
            console.log(res)
            error.value = res.message
        }
    })
}
</script>