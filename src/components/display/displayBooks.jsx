import { Button } from "@material-ui/core";
import React from "react";
import "./displayBook.css";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import userService from '../../Services/userService';
import ToolBar from "../toolbar/toolbar";

const service = new userService();

const theme = createMuiTheme({

    palette: {
        primary:{
            main: '#fff',
        },
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
        },
      },

  });


export default function DisplayBooks(){

    const [books,setBooks]= React.useState([]);

    const getAllBooks = () => {
        service.getAllBooks().then((data) => {
            let array = data.data.result;
            console.log(array);
            setBooks(array);
        }).catch(error => {
            console.log(error);
        })
      }
    
    React.useEffect(() => { 
        getAllBooks();
      }, [] )

    return(
        <div className="display">
            <div className="header">
                <span>Books<span className="length">({books.length} items)</span></span>
            </div>
            <div className="books">
                {books.map((data,i) => (  
                    <div key={i} className="main">
                        <div className="book-image">
                            <div className="image">
                                <img src="./assets/book.png" alt="book" />
                            </div>
                        </div>
                        <div className="description">
                            <div className="title-book">
                                <div><small className="book-title">{data.description}</small></div>
                                <div><small className="author">{data.author}</small></div>
                                <div><small className="price">Rs.{data.price}</small></div>
                            </div>
                            <div className="buttons">
                                <button className="add-button">Add to Bag</button>
                                <button className="wish-button">Whislist</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}