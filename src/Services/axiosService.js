import axios from 'axios';

export default class axiosService{

    Post = (url, data, isHeaderRequired = false) =>{
        return axios.post(url, data, isHeaderRequired)
    }

    Get =(url, isHeaderRequired = false) => {
        return axios.get(url, isHeaderRequired)
    }

    Put = (url, data, isHeaderRequired = false) =>{
        return axios.put(url, data, isHeaderRequired)
    }

    Delete = (url, isHeaderRequired = false) =>{
        return axios.delete(url, isHeaderRequired)
    }
}