import React from "react";
import DisplayBooks from "../display/displayBooks";
import ToolBar from "../toolbar/toolbar";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddToCart from "../cart/cart1";
import Footer from "../footer/footer";
import "./dashboard.css"

export default function DashBoard(){

    return(
        <div className="main-content">
            <ToolBar />
            <div > {/*className={classes.content*/}
              <main>
                <BrowserRouter>
                  <Switch >
                    <Route path="/dashboard/books" >
                      <DisplayBooks />
                    </Route>
                    <Route exact path="/dashboard/cart1">
                      <AddToCart />
                    </Route>
                  </Switch>
                </BrowserRouter>
              </main> 
            </div>
            <Footer />
        </div>

    );
}