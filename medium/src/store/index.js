import axiosClient from "@/axios/axios";
import { createStore } from "vuex";

const user = {
    state: ()=>({
        data:{},
        TOKEN: sessionStorage.getItem('TOKEN')
    }),
    actions:{
        async loginUser({comit},data){
            return axiosClient.post('/auth/login',data).then(({data})=>{
                console.log(data)
            })
        }
    },
    mutations:{

    }
}

const posts = {
    state:()=>({
        data:[]
    }),
    actions:{
        async getAllPost({commit}){
            return axiosClient.get('/posts').then(({data})=>{
                if(data.ok) commit('putPosts',data.data)
                return data
            })
        }
    },
    mutations:{
        putPosts: (state,data)=>{
            state.data = data
            console.log(state.data)
        }
    }
}

const postdetail = {
    state: ()=>({
        data:{}
    }),
    actions: {
        async getPost({commit}, id){
            return axiosClient.get(`/posts/${id}`).then(({data})=>{
                console.log(data)
                if(data.ok) commit('putPostData', data.data)
            })
        }
    },
    mutations: {
        putPostData: (state, data)=>{
            state.data = data
        }
    }
}

const store = createStore({
    modules:{
        user,
        posts,
        postdetail
    }
})

export default store