<template>
    <PageLayout>
        <Profile :all-category="allCategory" :latest="latest" :id="id" />
    </PageLayout>
</template>

<script setup>
import Profile from '@/components/User/Profile.vue';
import { category, posts } from '@/js/script';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageLayout from './Layouts/PageLayout.vue';

const allCategory = ref([])
const latest = ref([])
const route = useRoute()
const id = ref(route.params.id)
posts().getLatestPost().then((res) => {
    if (res.ok) {
        latest.value = res.data
    }
})
category().getUsedCategories().then((res)=>{
    allCategory.value = res.data
})
</script>