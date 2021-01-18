import Axios from './axiosService';

const httpService = new Axios();

export default class userService{

    baseUrl ="https://backend-bookstore.herokuapp.com"

    registration = (data) => {
        return httpService.Post(`${this.baseUrl}/bookstore_user/registration`,data);
    }

    login = (data) => {
        return httpService.Post(`${this.baseUrl}/bookstore_user/login`,data);
    }

    getAllBooks = () => {
        return httpService.Get(`${this.baseUrl}/bookstore_user/get/book`)
    }

    addItem = () => {
        return httpService.Post(`${this.baseUrl}/bookstore_user/add_cart_item/{product_id}`)
    }
}