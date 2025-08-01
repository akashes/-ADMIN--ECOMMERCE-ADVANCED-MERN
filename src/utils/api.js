import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;



export const postData = async(url,formData)=>{

    try {
        //  const headers = {
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    // }
    const response = await axios.post(`${apiUrl}${url}`,formData
        // ,{headers}
    );
   return response.data
    } catch (error) {
        const message = error.response?.data?.message ||'Something went wrong';
        return{
            success:false,
            error:true,
            message
        }
        
    }
   
}

//put method
export const putData = async(url,formData)=>{

    try {
        //  const headers = {
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    // }
    const response = await axios.put(`${apiUrl}${url}`,formData
        // ,{headers}
    );
   return response.data
    } catch (error) {
        const message = error.response?.data?.message ||'Something went wrong';
        return{
            success:false,
            error:true,
            message
        }
        
    }
}

export const fetchDataFromApi = async(url)=>{
    try {
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        // }
        const response = await axios.get(`${apiUrl}${url}`);
       return response.data
        } catch (error) {
            const message = error.response?.data?.message ||'Something went wrong';
            return{
                success:false,
                error:true,
                message
            }
            
        }
}

//upload image 
export const uploadImage = async(url,formData)=>{
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await axios.put(`${apiUrl}${url}`,formData,{headers});
       return response.data
        } catch (error) {
            const message = error.response?.data?.message ||'Something went wrong';
            return{
                success:false,
                error:true,
                message
            }
            
        }
}