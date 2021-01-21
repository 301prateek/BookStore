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

    token = () => {
        return httpService.Post(`${this.baseUrl}/bookstore_user/verification/{token}`);
    }

    getAllBooks = () => {
        return httpService.Get(`${this.baseUrl}/bookstore_user/get/book`)
    }


    addItem = (product_id,token) => {
        console.log(token);
        console.log(product_id);
        return httpService.Post(`${this.baseUrl}/bookstore_user/add_cart_item/${product_id}`,false,{
          headers: {
            "x-access-token" : `${token}`,
          },
        });
    }

    getCartItems = (token) => {
        console.log(token+"From service")
        return httpService.Get(`${this.baseUrl}/bookstore_user/get_cart_items`,{
          headers: {
            "x-access-token" : `${token}` ,
          },
        });
    }

    removeCartItems = (data) => {
        localStorage.getItem("userToken");
        console.log(token+"From service remove")
        return httpService.Delete(`${this.baseUrl}/bookstore_user/get_cart_items}`,data,{
          headers: {
            "x-access-token" : `${token}`,
          },
        });
    }
}