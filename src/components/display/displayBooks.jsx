import { Button } from "@material-ui/core";
import React from "react";
import "./displayBook.css";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import userService from '../../Services/userService';
import ToolBar from "../toolbar/toolbar";
import AddToBag from "../addtobag/addtobag";

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
                <span>Books<span className="length"> ({books.length} items)</span></span>
                <select className="select-option" name="sort" id="select">
                    <option>Sort by relevence</option>
                    <option value="Low">Price: Low to High</option>
                    <option value="High">High to Low</option>
                    <option value="Newest">Newest Arrivals</option>
                </select>
            </div>
            <div className="books">
                {books.map((data,i) => (  
                    <div key={i} className="main">
                        <div className="book-image">
                            <div className="image">
                                <img src="../assets/book.png" alt="book" />
                            </div>
                        </div>
                        <div className="description">
                            <div className="title-book">
                                <div><small className="book-titleDisplay">{data.description}</small></div>
                                <div><small className="author">{data.author}</small></div>
                                <div><small className="price">Rs.{data.price}</small></div>
                            </div>
                            <div className="buttons">
                                <AddToBag id={data._id}/>
                                {/* <button className="add-button">ADD TO BAG</button> */}
                                <button className="wish-button">WHISHLIST</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}