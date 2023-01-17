<template>
    <HomeView v-if="!isLogged"></HomeView>
    <PageView v-else></PageView>
</template>

<script setup>
import axiosClient from '@/axios/axios';
import { user } from '@/js/script';
import { computed } from '@vue/reactivity';
import HomeView from './HomeView.vue';
import PageView from './PageView.vue';

const isLogged = computed(()=>{
    return user().isUserLogged()
})

</script>