import React from "react";
import "./cart1.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import BookService from '../../Services/userService';

const service = new BookService();

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function AddToCart() {

    const classes = useStyles();

    const [details, setDetails] = React.useState(false);
    const [summary, setSummary] = React.useState(false);
    const [value, setValue] = React.useState();
    const [count, setCount] = React.useState(1);

    const handleDetails = () => {
        setDetails(true);
    };

    const handleSummary = () => {
        setSummary(true);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const decrement = () =>{
        setCount(count-1);
    }

    const increment = () =>{
        setCount(count+1);
    }

    // validation

    const [fullName, setFullName] = React.useState();

    const [books, setBooks] = React.useState([])
    
    const cart = () => {
        service.getCartItems(localStorage.getItem("userToken")).then((data) => {
            let array = data.data.result;
            console.log(array);
            setBooks(array);
        }).catch(error => {
            console.log(error);
        })
      }

      React.useEffect(() => { 
        cart();
      }, [] )



    return (
        <div className="main-cart">
            <div className="book-details">
                <span className="heading">My cart({count})</span>
                <div className="book-quantity">
                {books.map((data,i) => (  
                    <div key ={i} className="book-count">
                        <div className="image">
                            <img src="../assets/book.png" alt="book" width="90px" height="100px" />
                        </div>
                        <div className="title-book">
                            <div className="all-details">
                                <div><small className="book-titleCart">{data.product_id.description}</small></div>
                                <div><small className="author">{data.product_id.author}</small></div>
                                <div><small className="price">Rs.{data.product_id.price}</small></div>
                            </div>
                            <div className="counter">
                                <div className="add-minus">
                                    <button className="buttons-minus" onClick={decrement}>-</button>
                                    <span className="show-number">{count}</span>
                                    <button className="buttons-add" onClick={increment}>+</button>
                                </div>
                                <div><button className="remove" onClick={() => removeBook(data.product_id)}>Remove</button></div>
                            </div>
                        </div>
                    </div>
                ))}
                    <div className="place-order">
                        <button className="order-button" onClick={handleDetails}>PLACE ORDER</button>
                    </div>
                </div>
            </div>
            <div>
                {!details ?
                    <div className="customer-details">
                        <span>Customer details</span>
                    </div>
                    :
                    <div className="details-open">
                        <span>Customer details</span>
                        <form>
                            <div className="name-phone">
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                />
                                <div className="mr">
                                    <TextField
                                        size="small"
                                        id="outlined-basic"
                                        label="Phone Number"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div className="pin">
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="Pincode"
                                    variant="outlined"
                                />
                                <div className="mr">
                                    <TextField
                                        size="small"
                                        id="outlined-basic"
                                        label="Locality"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div className="address">
                                <TextField
                                    size="small"
                                    id="outlined-multiline-static"
                                    label="Address"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    variant="outlined"
                                />
                            </div>
                            <div className="pin">
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="City/Town"
                                    variant="outlined"
                                />
                                <div className="mr">
                                    <TextField
                                        size="small"
                                        id="outlined-basic"
                                        label="Landmark"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div className="radio-buttons">
                                <small>Type</small>
                                <div className="radio" onChange={handleChange}>
                                {/* <RadioGroup aria-label="address" name="address" value={value} > */}
                                    <FormControlLabel  size="small" value="Home" control={<Radio />} label="Home" />
                                    <FormControlLabel  size="small" value="Work" control={<Radio />} label="Work" />
                                    <FormControlLabel  size="small" value="Other" control={<Radio />} label="Other" />
                                {/* </RadioGroup> */}
                                </div>
                            </div>
                            <div className="continue-button">
                            <button className="order-button" onClick={handleSummary}>CONTINUE</button>
                            </div>
                        </form>
                    </div>
                };
                <div>
                {!summary ?
                    <div className="summary">
                        <span>Order Summary</span>
                    </div>
                    :
                    <div className="details-open">
                            <div className="continue-button">
                                <span>Order summary</span>
                            <button className="order-button">CHECKOUT</button>
                            </div>
                    </div>
                }
            </div>
        </div>
        </div>
    );
}