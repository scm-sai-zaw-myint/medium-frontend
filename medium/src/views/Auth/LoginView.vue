<template>
    <MainLayout>
        <div class="w-100 d-flex justify-content-center align-items-center">
            <div class="container-wrapper">
                <div class="w-80 mx-auto d-flex align-items-center justify-content-center py-4">
                    <form @submit.prevent="login" class="d-flex col-md-8 flex-column border border-3 forms border-secondary">
                        <h3>Login</h3>
                        <div class="bg-danger text-light rounded p-2 d-flex justify-content-between" v-if="error">
                            <span>{{error}}</span>
                            <button @click.stop="error = null" class="border-0 rounded-circle bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div class="d-flex flex-column mb-3">
                            <label for="email" style="font-size: 1.2em;" class="mb-2">Email</label>
                            <input v-model="inputData.email" type="text" id="email" name="email" class="rounded form-control rounded-none px-3 py-2"
                                placeholder="Your emial (example@gmail.com)">
                            <span class="text-danger px-1 validator-msg" v-if="formError.email!= null">{{ formError.email }}</span>
                        </div>
                        <div class="d-flex flex-column mb-3">
                            <label for="password" style="font-size: 1.2em;" class="mb-2">Password</label>
                            <input v-model="inputData.password" type="password" id="password" name="password" class="rounded form-control rounded-none px-3 py-2"
                                placeholder="Password">
                            <span class="text-danger px-1 validator-msg" v-if="formError.password!= null">{{ formError.password }}</span>
                        </div>
                        <button type="submit" class="w-auto border-0 fit-content px-3 py-2 bg-secondary text-light form-control rounded">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
<script setup>
import { user } from '@/js/script';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '../Layouts/MainLayout.vue';

const router = useRouter()
const inputData = ref({
    email: '',
    password: ''
})
const error = ref(null)
const formError = ref({
    email: null,
    password: null
})
const login = ()=>{
    user().loginUser(inputData.value).then((res)=>{
        if(res.ok){
            formError.value = {
                email: null,
                password: null
            }
            router.push({name: 'home'})
        }
        else{
            error.value = res.data.error
            formError.value = Object.assign(formError.value, res.data)
        }
    })
}

</script>