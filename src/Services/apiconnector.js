import axios from "axios"
import toast from "react-hot-toast"
export const axiosInstance = axios.create({});

export const apiConnector = (method , url, bodyData , headers , params) =>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data : bodyData ? bodyData:null,
        headers:headers?headers:null,
        params:params?params:null
    })
}
// In url and method  should be string  type so use used backticks here.