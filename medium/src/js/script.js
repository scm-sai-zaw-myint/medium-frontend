import img from '@/assets/img/no-img.jpg'

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
    // let findId = data.parentCommentId
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

export const actions = function(){
    return{
        
    }
}

export default{
    getImage,
    getProfile,
    getDate,
    replyComment
}