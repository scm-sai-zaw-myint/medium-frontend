<template>
    <header class="sticky-top w-100 d-flex bg-light justify-content-center align-items-center border-bottom">
        <div class="container-wrapper">
            <div class="w-100 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center py-3">
                    <a href="#">
                        <svg viewBox="0 0 1043.63 592.71" height="25px">
                            <g data-name="Layer 2">
                                <g data-name="Layer 1">
                                    <path
                                        d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94">
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </a>
                    <div class="mx-4 bg-slate-opt rounded-pill overflow-hidden d-flex align-items-center pr-3">
                        <i class="fa-solid fa-magnifying-glass" style="padding-left: .8rem;"></i>
                        <input type="text" class="w-100 border-0 py-2 px-3 bg-transparent" placeholder="Search Medium">
                    </div>
                </div>
                <div class="d-flex align-items-center position-relative">
                    <RouterLink :to="{name: 'create-post'}" class="d-flex mx-2 align-items-center justify-content-center border-0 bg-transparent">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <span class="px-1">Write</span>
                    </RouterLink>

                    <router-link :to="{name:'sign-up'}" v-if="!isUserLogged" class="px-3 py-2 rounded-pill border-0 signup-white">Sign up</router-link>
                    <router-link :to="{name:'sign-in'}" v-if="!isUserLogged" class="px-3 py-2 rounded-pill border-0 bg-transparent">Sign in</router-link>


                    <button class="d-flex align-items-center justify-content-between border-0 bg-transparent"
                    @click="show = !show">
                        <div class="mx-2 overflow-hidden" style="width: 30px;height: 30px; border-radius: 50%;">
                            <img src="../../../assets/img/user-profile.webp" alt="Profile" style="height: 100%" class="block">
                        </div>
                        <i class="fa-solid fa-caret-down"></i>
                    </button>
                    <Transition name="drop-down">
                        <div class="position-absolute end-0 my-2 top-100 p-2 rounded bg-light shadow border d-flex flex-column" v-if="show">
                            <router-link :to="{name:'profile'}" class="d-flex align-items-center py-2 px-3 border-0 bg-transparent menu-btns" style="min-width: 230px">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Profile">
                                    <circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle>
                                    <path d="M3.5 21.5v-4.34C3.5 15.4 7.3 14 12 14s8.5 1.41 8.5 3.16v4.34" stroke="currentColor"
                                        stroke-linecap="round">
                                    </path>
                                </svg>
                                <span class="px-2">Profile</span>
                            </router-link>
                            <button class="d-flex align-items-center py-2 px-3 border-0 bg-transparent menu-btns" style="min-width: 230px">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Lists">
                                    <path
                                        d="M6.44 6.69h0a1.5 1.5 0 0 1 1.06-.44h9c.4 0 .78.16 1.06.44l.35-.35-.35.35c.28.28.44.66.44 1.06v14l-5.7-4.4-.3-.23-.3.23-5.7 4.4v-14c0-.4.16-.78.44-1.06z"
                                        stroke="currentColor"></path>
                                    <path d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5" stroke="currentColor" stroke-linecap="round"></path>
                                </svg>
                                <span class="px-2">Posts</span>
                            </button>

                           
                            <button class="d-flex align-items-center py-2 px-3 border-0 bg-transparent menu-btns border-top" style="min-width: 230px">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                                </svg>
                                <span class="px-2">Logout</span>
                            </button>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useStore } from 'vuex';
const show = ref(false)
const store = useStore()
const isUserLogged = computed(()=>{
    return store.state.user.TOKEN != null
})
</script>
<style scoped>
.drop-down-enter-active,
.drop-down-leave-active{
    transition: all .2s ease-in-out;
}
.drop-down-enter-from,
.drop-down-leave-to{
    top: 60% !important;
    opacity: 0;
}
</style>