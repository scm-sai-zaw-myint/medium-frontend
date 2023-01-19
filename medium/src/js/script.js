import img from '@/assets/img/no-img.jpg'
import axiosClient from '@/axios/axios'

export const getImage = (url)=>{
    if(url!=null) return url
    return img
}
export const getProfile = (url)=>{
    if(url!=null) return url
    return img
}
export const getDate = (milli)=>{
    return new Date(milli).toLocaleDateString();
}
export const replyComment = (treeData = [], data = {})=>{
    let findId = data.parentCommentId
    if(findId == null){
        treeData.push(data)
    }else{
        treeData.forEach((d)=>{
            let element = searchChildComment(d,data)
            if(element!=null){
                element.childComments.push(data)
            }
        })
    }
}
function searchChildComment(element, childata){
    if(element.id === childata.parentCommentId){
         return element
    }else if (element.childComments != null){
         var result = null;
         for(var i=0; result == null && i < element.childComments.length; i++){
              result = searchChildComment(element.childComments[i], childata);
         }
         return result
    }
    return null
}

export const deleteComment = (treeData = [],data)=>{
    let findId = data.parentCommentId
    if(findId == null){
        treeData.forEach((d,i)=>{
            if(d.id === data.id){
                treeData.splice(i,1);
            }
        })
    }else{
        treeData.forEach((d)=>{
            let element = searchChildComment(d,data)
            console.log("found",element)
            if(element!=null){
                element.childComments.forEach((c,i)=>{
                    if(c.id === data.id){
                        element.childComments.splice(i,1)
                        return false
                    }
                })
                return false
            }
        })
    }
}

export const user = function(){
    return{
        async loginUser(data){
            return axiosClient.post('/auth/request/login',data).then(({data})=>{
                if(data.ok){
                    localStorage.setItem('user',JSON.stringify(data.data.details))
                    localStorage.setItem('TOKEN',data.data.accessToken)
                }
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async registration(payload){
            return axiosClient.post('/auth/request/registration',payload,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({data})=>{
                if(data.ok){
                    localStorage.setItem('user',JSON.stringify(data.data.details))
                    localStorage.setItem('TOKEN',data.data.accessToken)
                }
                return data
            }).catch(({response})=>{  
                return response.data
            })
        },
        async getProfileData(id = null, page = null){
            let route = id != null && id.length > 0 ? `/user/${id}` : `/user/${this.data().id}`
            page = page == null ? 1 : page
            return axiosClient.get(`${route}?page=${page}`).then(({data})=>{
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async updateUser(id,data,page = null){
            page = page == null ? 1 : page
            return axiosClient.put(`/user/${id}?page=${page}`,data).then(({data})=>{
                return data
            }).catch(({response})=>{
                return response.data
            })
        },
        async changePassword(data){
            return axiosClient.post(`/auth/changepassword`,data).then(({data})=>{
                if(data.ok){
                    localStorage.clear()
                    localStorage.setItem('TOKEN',data.data.access_token)
                }
                return data
            }).catch(({response})=>{
                return response.data
            })
        },
        async logout(){
            return axiosClient.post(`/auth/logout`).then(({data})=>{
                if(data.ok){
                    localStorage.clear();
                }
                return data
            })
        },
        isUserLogged(){
            return localStorage.getItem('TOKEN') != null
        },
        data(){
            return JSON.parse(localStorage.getItem('user'))
        }
    }
}

export const posts = function(){
    return{
        async getAllPost(page){
            page = page != null ? page : 1;
            return axiosClient.get(`/posts?page=${page}`).then(({data})=>{
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async getLatestPost(){
            return axiosClient.get('/posts/latest').then(({data})=>{
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async createPost(data){
            return axiosClient.post(`/posts/create`,data).then(({data})=>{
                return data
            }).catch(({response})=>{ 
                return response.data
            })
        },
        async updatePost(data){
            return axiosClient.put(`/posts/${data.id}`,data.payload).then(({data})=>{
                return data
            }).catch(({response})=>{ 
                return response.data
            })
        },
        async deletePost(id){
            return axiosClient.delete(`/posts/${id}`).then(({data})=>{
                return data
            }).catch((err)=>{
                return err
            })
        },
        async searchPosts(search, page = null){
            page = page == null ? 1 : page
            return axiosClient.get(`/posts/search?search=${search}&page=${page}`).then(({data})=>{
                return data
            }).catch(({response})=>{ 
                return response.data
            })
        },
        async getRelatedPosts(catId){
            return axiosClient.get(`/posts/categories/${catId}/posts`).then(({data})=>{
                return data
            }).catch(({response})=>{ 
                return response.data
            })
        },
        async getPost(id){
            return axiosClient.get(`/posts/${id}`).then(({data})=>{
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async postComment(id,payload){
            return axiosClient.post(`/${id}/comments`,payload).then(({data})=>{
                return data
            }).catch((err)=>{
                return err
            })
        },
        async updateComment(payload){
            return axiosClient.put(`/${payload.pid}/comments/${payload.data.id}`,payload.data).then(({data})=>{
                return data
            }).catch((err)=>{
                return err
            })
        },
        async deleteComment(id, comment){
            return axiosClient.delete(`/${id}/comments/${comment.id}`).then(()=>{
                return comment
            })
        }
    }
}

export const category = function(){
    return{
        async getAllCategories(){
            return axiosClient.get('/posts/categories').then(({data})=>{
                return data
            }).catch(({response})=>{    
                return response.data
            })
        },
        async getUsedCategories(){
            return axiosClient.get('/posts/categories/used').then(({data})=>{
                return data
            }).catch(({response})=>{    
                return response.data
            })
        }
    }
}

export default{
    getImage,
    getProfile,
    getDate,
    replyComment,
    user,
    posts,
    category
}