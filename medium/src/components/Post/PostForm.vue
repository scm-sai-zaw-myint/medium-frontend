<template>
    <div class="w-100 d-flex justify-content-center align-items-center">
        <div class="container-wrapper">
            <div class="w-100 mx-auto d-flex align-items-center justify-content-center py-4">
                <form id="form" @submit.prevent="submitHandler" class="d-flex col-md-8 flex-column border border-3 forms border-secondary">
                    <h3>Post {{ options }}</h3>
                    <div class="d-flex flex-column mb-3">
                        <input v-model="inputData.title" type="text" id="title" name="title" class="rounded form-control border border-1 px-3 py-2"
                        :class="getErrorClass('title')" placeholder="Post title">
                        <span class="text-danger px-1 validator-msg" v-if="validation.title != null">{{ validation.title }}</span>
                    </div>
                    <div class="d-flex flex-column mb-3">
                        <Multiselect
                        mode="tags"
                        :close-on-select="false"
                        :searchable="true"
                        :create-option="true"
                        :options="select"
                        :classes="getErrorClass('category')"
                        placeholder="Select category"
                        v-model="inputData.category"
                        />
                        <span class="text-danger px-1 validator-msg" v-if="validation.categories != null">{{ validation.categories }}</span>
                    </div>
                    <div class="d-flex flex-column mb-3">
                        <input @change="changeImage" type="file" id="image" name="image" class="rounded form-control"
                        placeholder="Choose image" accept="image/jpeg, image/png, image/jpg, image/jfif" :class="getErrorClass('image')">
                        <span class="text-danger px-1 validator-msg" v-if="validation.image != null">{{ validation.image }}</span>
                        <div class="preview my-2 overflow-hidden rounded-3 border border-1" style="max-width: 150px;">
                            <img :src="inputData.image" alt="" style="width: 100%" class="block" v-if="inputData.image != null">
                            <img :src="getImage(inputData.image)" style="width: 100%" class="block" v-else />
                        </div> 
                    </div>
                    <!-- <div id="editor"></div> -->
                    <textarea v-model="inputData.description" name="description" id="" cols="30" rows="5" class="border-1 rounded p-2"
                    :class="getErrorClass('description')" placeholder="Post description"></textarea>
                    <span class="text-danger px-1 validator-msg" v-if="validation.description != null">{{ validation.description }}</span>
                    <button type="submit" class="w-auto mt-4 border-0 fit-content px-3 py-2 bg-secondary text-light rounded">{{ options }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRef } from 'vue';
import Multiselect from '@vueform/multiselect'
import { computed, ref } from '@vue/reactivity';
import { getImage } from '@/js/script';

const props = defineProps({
    data: {
        type: Object,
        default:{
            id: null,
            title: '',
            description: '',
            category: [],
            image: null,
        }
    },
    categories: {
        type: Array,
        default: []
    },
    options: {
        type: String,
        default: 'Publish'
    },
    validation: {
        type: Object,
        default:{
            title: null,
            description: null,
            categories: null,
            image: null,
        }
    }
})
const emits = defineEmits(['form-submit'])
const select = computed(()=>{
    let x = []
    props.categories.forEach((e)=>{
        x.push({value: e.id,label: e.name})
    })
    return x
})
const inputData = ref(props.data)

const changeImage = (e)=>{
    const [file] = e.target.files
    if (file) {
        var reader = new FileReader();
        reader.onload = function () {
            inputData.value.image = reader.result
        };
        reader.readAsDataURL(file);
        console.log("come here",inputData.value.image)
    }
}

const getErrorClass = (key)=>{
    if (key in props.validation && props.validation[key] != null) {
        return 'border-danger'
    }
    return null;
}

const submitHandler = ()=>{
    let forms = document.getElementById('form')
    let form = new FormData(forms)
    form.append('categories',inputData.value.category)
    if(inputData.value.id != null){
        form.append('id',inputData.value.id);
    }
    emits('form-submit',form)
}

</script>
