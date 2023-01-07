<template>
    <HomeView v-if="!isLogged"></HomeView>
    <PageView v-else></PageView>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import HomeView from './HomeView.vue';
import PageView from './PageView.vue';

const store = useStore()
const isLogged = computed(()=>{
    return store.state.user.TOKEN != null
})
</script>