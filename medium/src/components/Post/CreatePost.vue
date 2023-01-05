<template>
    <div class="w-100 d-flex justify-content-center align-items-center">
        <div class="container-wrapper">
            <div class="w-100 mx-auto d-flex align-items-center justify-content-center py-4">
                <form id="form" @submit.prevent="createPost" class="d-flex col-md-8 flex-column border border-3 forms border-secondary">
                    <h3>Post Create</h3>
                    <div class="d-flex flex-column mb-3">
                        <input v-model="inputData.title" type="text" id="title" name="title" class="rounded form-control border border-1 px-3 py-2"
                        placeholder="Post title">
                    </div>
                    <div class="d-flex flex-column mb-3">
                        <Multiselect
                        mode="tags"
                        :close-on-select="false"
                        :searchable="true"
                        :create-option="true"
                        v-model="inputData.category"
                        :options="select"
                        />
                    </div>
                    <div class="d-flex flex-column mb-3">
                        <input @change="changeImage" type="file" id="image" name="image" class="rounded form-control"
                        placeholder="Choose image">
                        <div class="preview my-2 overflow-hidden rounded-3 border border-1" style="max-width: 150px;">
                            <img :src="inputData.file" alt="" style="width: 100%" class="block" v-if="inputData.file != null">
                            <img src="@/assets/img/profs.jpg" style="width: 100%" class="block" v-else />
                        </div> 
                    </div>
                    <!-- <div id="editor"></div> -->
                    <textarea name="description" id="" cols="30" rows="5" class="border-1 rounded p-2" placeholder="Post description"></textarea>
                    <button type="submit" class="w-auto mt-4 border-0 fit-content px-3 py-2 bg-secondary text-light rounded">Publish</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect'
import { computed } from '@vue/reactivity';

const store = useStore()
const categories = ref(store.state.category.data)
const select = computed(()=>{
    let x = []
    categories.value.forEach((e)=>{
        x.push({value: e.id,label: e.name})
    })
    return x
})
const inputData = ref({
    title: '',
    description: '',
    category: [],
    file: null,
})

const changeImage = (e)=>{
    const [file] = e.target.files
    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            inputData.value.file = reader.result
        };
    }
}
const createPost = ()=>{
    let forms = document.getElementById('form')
    let form = new FormData(forms)
    form.append('categories',inputData.value.category)
    
    store.dispatch(`createPost`,form).then((res)=>{
        console.log(res)
    })

}
</script>
