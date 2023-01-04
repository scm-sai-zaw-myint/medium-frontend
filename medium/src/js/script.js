import image from '../assets/img/adsifa.png'
import profile from '../assets/img/user-profile.webp';

export const getImage = (url)=>{
    if(url!=null) return url
    return image
}
export const getProfile = (url)=>{
    if(url!=null) return url
    return profile
}

export const getDate = (milli)=>{
    return new Date(milli).toLocaleDateString();
}
export default{
    getImage,
    getProfile,
    getDate
}