import React from 'react';
import BookService from '../../Services/userService';

const service = new BookService();

export default function AddToBag(props){

    const addItem = () =>{
        console.log(props.id);

        let bookId =  props.id;

        service.addItem(bookId, localStorage.getItem("userToken")).then(data =>{
            console.log(data);
        }).catch(error => {
            console.log(error);
        })

    }

    return(
        <button className="add-button" onClick={addItem}>ADD TO BAG</button>
    )

}