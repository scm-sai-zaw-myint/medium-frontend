import axiosClient from "@/axios/axios";
import { createStore } from "vuex";

const user = {
    state: ()=>({
        data:{},
        TOKEN: sessionStorage.getItem('TOKEN'),
        profileData:{}
    }),
    actions:{
        async loginUser({commit},data){
            return axiosClient.post('/auth/login',data).then(({data})=>{
                console.log(data.data)
                if(data.ok) commit('putUserData',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async registration({commit},payload){
            return axiosClient.post('/auth/registration',payload,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({data})=>{
                if(data.ok) commit('putProfileData',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async getProfileData({commit}){
            return axiosClient.get('/auth/').then(({data})=>{
                console.log(data)
                if(data.ok) commit('putProfileData',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        }
    },
    mutations:{
        putUserData: (state,data)=>{
            state.data = data.details
            state.TOKEN = data.accessToken
            state.profileData=data.details
            sessionStorage.setItem('TOKEN',data.accessToken)
        },
        putProfileData: (state,data)=>{
            state.profileData = data
        }
    }
}

const posts = {
    state:()=>({
        data:[],
        latest:[]
    }),
    actions:{
        async getAllPost({commit}){
            return axiosClient.get('/posts').then(({data})=>{
                if(data.ok) commit('putPosts',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async getLatestPost({commit}){
            return axiosClient.get('/posts/latest').then(({data})=>{
                if(data.ok) commit('putLatestPosts',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async createPost({commit},data){
            return axiosClient.post(`/posts/create`,data).then(({data})=>{
                console.log(data)
                return data
            }).catch(({response})=>{ 
                console.log(response)  
                return response.data
            })
        }
    },
    mutations:{
        putPosts: (state,data)=>{
            state.data = data
            console.log(state.data)
        },
        putLatestPosts: (state,data)=>{
            state.latest=data
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
            }).catch(({response})=>{    
                return response.data
            })
        }
    },
    mutations: {
        putPostData: (state, data)=>{
            state.data = data
        }
    }
}
const category = {
    state: ()=>({
        data:[]
    }),
    actions:{
        async getAllCategories({commit}){
            return axiosClient.get('/posts/categories').then(({data})=>{
                console.log(data)
                if(data.ok) commit('putCategoryData',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        }
    },
    mutations: {
        putCategoryData: (state,data)=>{
            state.data = data
        }
    }
}
const store = createStore({
    modules:{
        user,
        posts,
        postdetail,
        category
    }
})

export default store