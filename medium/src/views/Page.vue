<template>
    <HomeView v-if="!isLogged"></HomeView>
    <PageView v-else></PageView>
</template>

<script setup>
import { user } from '@/js/script';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import HomeView from './HomeView.vue';
import PageView from './PageView.vue';
const route = useRoute()
const isLogged = computed(()=>{
    return user().isUserLogged()
})

</script>

