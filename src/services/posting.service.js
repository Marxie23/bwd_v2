import API_URL from "../API/API_URL";
import axiosInstance from "../API/AXIOS_INSTANCE"
import AuthServices from "./auth.service"

const getPostByCategory = (category,currentUserID) => {
    return axiosInstance.get(API_URL + `posts/get/${category}`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            post: response.data.posts
        })
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
const addPosting = (formData,currentUserID) => {
    return axiosInstance.post(API_URL + `posts`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        console.log(response)
        return response.data;
    })
    .catch((error) => {
        console.error('Error fetching customers:', error);
        if (error.status === 403){
            alert("Your session has expired. You will be logged out.");
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error;
    });
}
const updatePosting = (id,formData,currentUserID) => {
    return axiosInstance.put(API_URL + `posts/${id}`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        console.log(response)
        return response.data;
    })
    .catch((error) => {
        console.error('Error fetching customers:', error);
        if (error.status === 403){
            alert("Your session has expired. You will be logged out.");
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error;
    });
}
const deletePost = (id,currentUserID) => {
    return axiosInstance.delete(API_URL + `posts/${id}`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            post: response.data.posts
        })
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
export default{
    addPosting,
    getPostByCategory,
    updatePosting,
    deletePost
}