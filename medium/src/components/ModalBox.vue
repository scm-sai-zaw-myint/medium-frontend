<template>
    <div class="modal">
        <div class="modal-box rounded bg-light shadow">
            <div class="py-2 d-flex justify-content-between align-items-center border-bottom">
                <span class="px-4 text-center mx-auto">
                    {{ title }}
                </span>
                <button @click="closeHandler" class="border-0 bg-transparnt modal-close rounded-circle circle d-flex justify-content-center align-items-center mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Modal box'
    },
    show: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['close'])
const closeHandler = (e)=>{
    emits('close',e)
}
</script>
<style scoped>
.modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1200;
    background-color: #0000004c;
    display: block;
}
.modal-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    min-width: 25%;
}
.modal-close{
    position: absolute;
    right: 0;
}
</style>