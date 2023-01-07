import image from '../assets/img/adsifa.png'
import profile from '../assets/img/user-profile.webp';
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
export default{
    getImage,
    getProfile,
    getDate
}