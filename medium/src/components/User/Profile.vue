<template>
    <div class="w-100 d-flex justify-content-center py-4">
        <div class="container-wrapper m-sm-2">
            <div class="w-80 w-sm-100 mx-auto d-flex flex-wrap col-12">
                <div class="col-lg-8 order-lg-1 col-sm-12 order-2 d-flex flex-column border-md-1 border-end border-0 pe-4">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="profile-img border">
                                <img :src="getProfile(profileData.profile)" alt="">
                            </div>
                            <h4 class="mx-2">{{profileData.name}}</h4>
                        </div>
                        <div class="d-flex align-items-center" v-if="isMe()">
                            <button type="button" @click.stop="edit = true" 
                                class="px-2 py-1 rounded-pill bg-secondary mx-3 text-light border-0 text-sm">
                                Edit Profile
                            </button>
                            <button @click="changepw = true" 
                                class="px-2 py-1 rounded-pill bg-secondary text-light border-0 text-sm">
                                Change password
                            </button>
                        </div>
                        
                    </div>
                    <div class="w-100 my-4 ">
                        <h3 class="border-bottom border-1 py-2">Information</h3>
                        <div class="my-4">
                            <h4>Post Count</h4>
                            <span class="text-secondary rounded-circle bg-secondary px-2 text-light">{{getPostCount}}</span>
                        </div>
                        <div class="my-4">
                            <h4>Bio</h4>
                            <span class="text-secondary">
                                {{profileData.bio}}
                            </span>
                        </div>
                        <h3 class="border-bottom border-1 py-2">My Posts</h3>
                        <div class="row mt-4 mb-4 col-md-12 border-1 border-bottom pb-4" v-for="post in profileData.posts">
                            <div class="col-md-8">
                                <div class="d-flex align-items-center">
                                    <div class="post-profile border">
                                        <img :src="getProfile(post.user.profile)" alt="" style>
                                    </div>
                                    <b class="fs-5 font-weight-bold px-2 truncate">{{post.user.name}}</b>
                                    <span>{{getDate(post.createdAt)}}</span>
                                </div>
                                <router-link :to="{name: 'post-index',params:{id: post.id}}" class="mt-2 text-gray" :class="`post-des`">
                                    <h5 class="mt-2 post-title">{{post.title}}</h5>
                                    <div class="text-truncate-container">
                                    <p class="post-description">
                                        {{post.description}}
                                    </p>
                                </div>
                                </router-link>
                                <div class="d-flex align-items-center justify-content-between" style="font-size: 1em">
                                    <div class="d-flex align-items-center">
                                        <router-link class="float-start rounded-pill bg-gray-opt px-2 py-1 mx-1" v-for="category in post.categories"
                                            :to="{name: 'related-post',params:{category: category.name}}">
                                            {{category.name}}
                                        </router-link>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <RouterLink  :to="{name: 'edit-post',params:{id: post.id}}" v-if="isMe()">
                                        <span class="fa-solid fa-ellipsis"></span>
                                    </RouterLink>
                                    </div>
                        
                                </div>
                            </div>
                            <div class="col-md-4 d-flex my-4 align-items-center justify-content-center">
                                <RouterLink :to="{name: 'post-index',params:{id: post.id}}"
                                    class="d-flex align-items-center justify-content-center">
                                    <img :src="getImage(post.image)" alt="" class="post-img">
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 order-lg-2 col-sm-12 order-1 border-left border-1 ps-3">
                    <div class="w-100 mx-auto">
                        <h3 class="mb-2">latest Posts</h3>
                        <div class="d-flex flex-column">
                            <router-link :to="{name: 'post-index',params:{id: lpost.id}}" class="row my-3" v-for="lpost in latest">
                                <div class="col-md-12 d-flex">
                                    <div class="overflow-hidden rounded-circle d-flex align-items-center justify-content-center"
                                        style="height: 30px;width: 30px;">
                                        <img :src="getProfile(lpost.user.profile)" alt="Profile" style="height: 100%">
                                    </div>
                                    <span class="px-2">{{lpost.user.name}}</span>
                                </div>
                                <div class="col-md-12">
                                    <span class="fw-bold">{{lpost.title}}</span>
                                </div>
                            </router-link>
                        </div>
                        <div class="px-2 py-4 border-top border-secondary float-start" style="font-size: .8em;">
                            <router-link class="border p-2 rounded-pill bg-light m-1 float-start" v-for="cate in allCategory"
                            :to="{name: 'related-post',params:{category: cate.name}}">
                                {{cate.name}}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Transition name="modal-slide-down">
        <ModalBox title="Edit Profile" v-if="edit" @close="edit = false">
            <form @submit.prevent="updateUser" id="user-form">
                <div class="p-3 d-flex">
                    <button type="button" @click.stop="chooseProfile" class="border-dashed bg-transparent rounded-circle overflow-hidden" style="width: 60px; height: 60px;">
                        <img :src="getProfile(userData.profile)" style="height: 100%;width: auto;">
                        <input id="profile" type="file" hidden name="profile" @change="changeProfile" accept="image/jpeg, image/png, image/jpg, image/jfif">
                    </button>
                    <div class="px-2">
                        <input name="name" type="text" class="form-control" :class="updateFormError.name !=null ? `border-danger`:``" v-model="userData.name">
                        <span class="text-danger px-1 validator-msg" v-if="updateFormError.name != null">{{ updateFormError.name }}</span>
                        <button @click="chooseProfile" type="button" class="edit-btn mt-1 d-flex align-items-center justify-center rounded px-2">
                            <i class="fa-regular fa-pen-to-square me-2"></i>
                            Edit
                        </button>
                    </div>
                </div>
                <div class="px-4 d-flex flex-column mpb-2">
                    <label for="bio">Bio</label>
                    <textarea v-model="userData.bio" name="bio" id="bio" class="bio-te p-2 rounded"
                        placeholder="Enter Bio here..."></textarea>
                </div>
                <div class="d-flex align-items-center justify-content-end p-3">
                    <button @click="edit = false" class="btn btn-secondary">Cancle</button>
                    <button class="btn btn-primary ms-2">Update</button>
                </div>
        </form>
        </ModalBox>
    </Transition>
    <Transition name="modal-slide-down">
        <ModalBox title="Change password" v-if="changepw" @close="changepw = false">
            <form @submit.prevent="changePassword">
                <div class="d-flex flex-column px-4 py-2" v-if="passwordError != null">
                    <span class="px-2 text-danger">
                        {{ passwordError }}
                    </span>
                </div>
                <div class="d-flex flex-column px-4 py-2">
                    <input v-model="passwordForm.currentPassword" type="password" class="form-control"
                        :class="updatePasswordFormError.currentPassword !=null ? `border-danger`:``" placeholder="Current password">
                    <span class="text-danger px-1 validator-msg" v-if="updatePasswordFormError.currentPassword != null">{{
                        updatePasswordFormError.currentPassword }}</span>
                </div>
                <div class="d-flex flex-column px-4 py-2">
                    <input v-model="passwordForm.newPassword" type="password" class="form-control"
                        :class="updatePasswordFormError.newPassword !=null ? `border-danger`:``" placeholder="New password">
                    <span class="text-danger px-1 validator-msg" v-if="updatePasswordFormError.newPassword != null">{{
                        updatePasswordFormError.newPassword }}</span>
                </div>
                <div class="d-flex flex-column px-4 py-2">
                    <input v-model="passwordForm.confirmPassword" type="password" class="form-control"
                        :class="updatePasswordFormError.confirmPassword !=null ? `border-danger`:``" placeholder="Confirm password">
                    <span class="text-danger px-1 validator-msg" v-if="updatePasswordFormError.confirmPassword != null">{{
                        updatePasswordFormError.confirmPassword }}</span>
                </div>
                <div class="d-flex align-items-center justify-content-end p-3">
                    <button type="button" @click="changepw = false" class="btn btn-secondary">Cancle</button>
                    <button type="submit" class="btn btn-primary ms-2">change</button>
                </div>
            </form>
        </ModalBox>
    </Transition>
</template>

<script setup>
import { getDate, getImage, getProfile, user } from '@/js/script';
import router from '@/router';
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';
import ModalBox from '../ModalBox.vue';
const props = defineProps({
    latest: {
        type: Array,
        default: []
    },
    allCategory:{
        type: Array,
        default: []
    },
    id:{
        type: String,
        default: null
    }
})
watch(()=> props.id,()=>{
    user().getProfileData(props.id).then((res) => {
        if (res.ok) {
            profileData.value = res.data
            userData.value = Object.assign({}, res.data)
        } else {
            router.back()
        }
    })
})
const profileData = ref({})
const userData = ref({})
const edit = ref(false)
const changepw = ref(false)
const passwordError = ref(null)
user().getProfileData(props.id).then((res) => {
    if (res.ok){
        profileData.value = res.data
        userData.value = Object.assign({},res.data)
    }else{
        router.back()
    }
})
const isMe = ()=>{
    return userData.value.id === user().data().id
}
const getPostCount = computed(()=>{
    if(profileData.value.posts == null) return 0
    return profileData.value.posts.length 
})
const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})
const chooseProfile = ()=>{
    if(!isMe().value) return false
    let file = document.getElementById('profile')
    file.click()
}
const changeProfile = (e)=>{
    if(!isMe()) return false
    const [file] = e.target.files
    if (file) {
        var reader = new FileReader();
        reader.onload = function () {
            userData.value.profile = reader.result
        };
        reader.readAsDataURL(file);
    }
}
const updateFormError = ref({
    name: null
})
const updateUser = ()=>{
    if(!isMe()) return false
    let form = document.getElementById('user-form')
    let data = new FormData(form)
    user().updateUser(userData.value.id,data).then((res)=>{
        if(res.ok){
            updateFormError.value.name = null
            edit.value = false
            profileData.value = res.data
        }else{
            updateFormError.value = Object.assign(updateFormError.value, res.data)
        }
    })
}

const updatePasswordFormError = ref({
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
})
const changePassword = ()=>{
    if(!isMe()) return false
    user().changePassword(passwordForm.value).then((res)=>{
        updateFormError.value = {
                currentPassword: null,
                newPassword: null,
                confirmPassword: null
            }
        if(res.ok){
            passwordError.value = null
            changepw.value = false
            passwordForm.value = {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        }else{
            passwordError.value = res.message
            updatePasswordFormError.value = res.data
        }
    })
}
</script>
<style>
.modal-slide-down-enter-active,
.modal-slide-down-leave-active {
    transition: all .4s cubic-bezier(1, 0.82, 0.165, 1);
}
.modal-slide-down-enter-from,
.modal-slide-down-leave-to{
    opacity: 0;
}
.modal-slide-down-enter-active .modal-box,
.modal-slide-down-leave-active .modal-box{
    transition: all .4s cubic-bezier(1, 0.82, 0.165, 1);
}
.modal-slide-down-enter-from .modal-box,
.modal-slide-down-leave-to .modal-box{
    opacity: 0;
    top: 30%;
}
</style>