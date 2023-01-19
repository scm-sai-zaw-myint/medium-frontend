<template>
    <div class="d-flex justify-content-end align-items-center">
        <RouterLink :to="`${url}${previous()}`" v-if="previous() != null" class="d-flex rounded p-2 m-2 bg-paginate jsutify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                width="20px" height="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </RouterLink>
        <span class="bg-muted d-flex rounded p-2 m-2  jsutify-content-center align-items-center" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                width="20px" height="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </span>
        <span class="d-flex rounded p-2 m-2  jsutify-content-center align-items-center">{{ data.offset }}</span>
        <RouterLink :to="`${url}${next()}`" v-if="next() != null"
            class="d-flex rounded p-2 m-2 bg-paginate jsutify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                width="20px" height="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </RouterLink>
        <span class="bg-muted d-flex rounded p-2 m-2  jsutify-content-center align-items-center" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                width="20px" height="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </span>
    </div>
</template>
<script setup>
const props = defineProps({
    data:{
        type: Object,
        default:{}
    },
    url: {
        type:String,
        default: ''
    }
})
const previous = ()=>{
    return props.data.offset - 1 >= 1 ? (props.data.offset - 1) : null
}
const next = ()=>{
    return props.data.offset + 1 <= props.data.page ? (props.data.offset + 1) : null
}
</script>