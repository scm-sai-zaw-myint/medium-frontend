<template>
    <PageLayout>
        <Profile :data="userdata" :all-category="allCategory" :latest="latest"  />
    </PageLayout>
</template>

<script setup>
import Profile from '@/components/User/Profile.vue';
import { ref, toRef } from 'vue';
import { useStore } from 'vuex';
import PageLayout from './Layouts/PageLayout.vue';

const store = useStore()
const userdata = ref(store.state.user.profileData)
const allCategory = ref(store.state.category.data)
const latest = ref(store.state.posts.latest)
</script>