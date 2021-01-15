import Axios from './axiosService';

const httpService = new Axios();

export default class userService{

    baseUrl ="https://backend-bookstore.herokuapp.com"

    registration = (data) => {
        return httpService.Post(`${this.baseUrl}/bookstore_user/registration`,data);
    }
}