import axiosClient from "@/axios/axios";
import { deleteComment, replyComment } from "@/js/script";
import { createStore } from "vuex";

const user = {
    state: ()=>({
        data:{},
        TOKEN: sessionStorage.getItem('TOKEN'),
        profileData:{}
    }),
    actions:{
        async loginUser({commit},data){
            return axiosClient.post('/auth/request/login',data).then(({data})=>{
                if(data.ok) commit('putUserData',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async registration({commit},payload){
            return axiosClient.post('/auth/request/registration',payload,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({data})=>{
                if(data.ok) commit('putUserData',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async getProfileData({commit}){
            return axiosClient.get('/auth/').then(({data})=>{
                if(data.ok) commit('putProfileData',data.data)
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async updateUser({commit,state},data){
            return axiosClient.put(`/user/${state.profileData.id}`,data).then(({data})=>{
                console.log(data)
                if(data.ok) commit('putProfileData',data.data)
                return data
            }).catch(({response})=>{
                return response.data
            })
        },
        async changePassword({state},data){
            return axiosClient.post(`/auth/changepassword`,data).then(({data})=>{
                if(data.ok){
                    state.TOKEN = data.data.access_token
                    sessionStorage.clear()
                    sessionStorage.setItem('TOKEN',data.data.access_token)
                }
                return data
            }).catch(({response})=>{
                return response.data
            })
        },
        async logout({state}){
            return axiosClient.post(`/auth/logout`).then(({data})=>{
                if(data.ok){
                    sessionStorage.clear();
                }
                return data
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
            state.data = data
        }
    }
}

const posts = {
    state:()=>({
        data:[],
        latest:[],
        search: []
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
                if(data.ok) commit('addPost',data.data)
                return data
            }).catch(({response})=>{ 
                return response.data
            })
        },
        async updatePost({commit},data){
            return axiosClient.put(`/posts/${data.id}`,data.payload).then(({data})=>{
                return data
            }).catch(({response})=>{ 
                return response.data
            })
        },
        async deletePost({commit},id){
            return axiosClient.delete(`/posts/${id}`).then(({data})=>{
                return data
            }).catch((err)=>{
                return err
            })
        },
        async searchPosts({state,commit},search){
            return axiosClient.get(`/posts/search?search=${search}`).then(({data})=>{
                if(data.ok){
                    commit('searchPostsData',data.data)
                }
                return data
            }).catch(({response})=>{ 
                return response.data
            })
        }
    },
    mutations:{
        putPosts: (state,data)=>{
            state.data = data
        },
        addPost: (state,data)=>{
            state.data.push(data)
        },
        putLatestPosts: (state,data)=>{
            state.latest=data
        },
        searchPostsData: (state,data)=>{
            state.search = data
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
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async postComment({commit,state},payload){
            return axiosClient.post(`/${state.data.id}/comments`,payload).then(({data})=>{
                if(data.ok) commit('addComment',data.data)
                return data
            }).catch((err)=>{
                return err
            })
        },
        async updateComment({commit},payload){
            return axiosClient.put(`/${payload.pid}/comments/${payload.data.id}`,payload.data).then(({data})=>{
                if(data.ok) commit('updateComment',data.data)
                return data
            }).catch((err)=>{
                return err
            })
        },
        async deleteComment({commit,state}, comment){
            return axiosClient.delete(`/${state.data.id}/comments/${comment.id}`).then(({data})=>{
                if(data.ok) commit('deleteComment',comment);
                return data
            })
        }
    },
    mutations: {
        putPostData: (state, data)=>{
            state.data = data
        },
        addComment: (state, data)=>{
            if(data.parentCommentId != null){
                replyComment(state.data.comments, data)
            }else{
                state.data.comments.push(data)
            }
        },
        updateComment: (state,data) =>{
            let index = state.data.comments.findIndex((com)=>com.id === data.id)
            if(index > -1){
                state.data.comments[index] = data
            }
        },
        deleteComment: (state,comment)=>{
            console.log(comment)
            if(comment.parentCommentId != null){
                deleteComment(state.data.comments, comment)
            }else{
                remove(state.data.comments)
            }
            function remove(parent=[]){
                let index = parent.findIndex((p)=>p.id === comment.id)
                if(index > -1){
                    parent.splice(index,1)
                }
            }
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