import React from "react";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./toolbar.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import DisplayBooks from "../display/displayBooks";
import AddToCart from "../cart/cart1";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
      },
      title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 1),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginRight: theme.spacing(0),
          marginLeft: theme.spacing(0),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'lightgray'
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '35ch',
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      appbar:{
        boxShadow: 'none',
        borderBottom: '1px solid lightgray' ,
        text: 'white',
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
}));

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

export default function ToolBar() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isProfileMenuOpen = Boolean(anchorEl1);
  
    const handleCartMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl1(event.currentTarget);
    };
  
    const handleProfileMenuClose = () => {
        setAnchorEl1(null);
    };

  
    const menuId = 'cart';
    const renderMenu = (
      <Menu
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Go to cart</MenuItem>
        {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      </Menu>
    );

    const menuIdProfile = 'account-menu';
    const renderProfileMenu = (
      <Menu
        getContentAnchorEl={null}
        anchorEl={anchorEl1}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        id={menuIdProfile}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <div>
        <div className="toolbar">
            <AppBar position="static" color="transparent" className={classes.appbar}>
                <Toolbar variant="dense">
                <div className="title">
                    <img src="../assets/education.png" alt="" />
                    <ThemeProvider theme={theme}>
                        <Typography color="primary">BookStore</Typography>
                    </ThemeProvider>
                </div>
                <div className="search">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    </div>
                    {/* <div className={classes.grow} /> */}
                    <div className="profile">
                    {/* <div className={classes.sectionDesktop}> */}
                        <IconButton color="inherit"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                        <ThemeProvider theme={theme}>
                            <Badge color="primary">
                                <PersonOutlineOutlinedIcon color="primary"/>
                            </Badge>
                        </ThemeProvider>
                        </IconButton>
                    </div>
                    {renderProfileMenu}
                    <div className="cart">
                        <IconButton
                            edge="end"
                            aria-label="cart current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleCartMenuOpen}
                            color="inherit"
                        >
                             <ThemeProvider theme={theme}>
                            <Badge badgeContent={17} color="primary">
                                <ShoppingCartOutlinedIcon color="primary" />
                            </Badge>
                            </ThemeProvider>
                        </IconButton>
                        </div>
                        {renderMenu}
                </Toolbar>
            </AppBar>
            </div>
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
                    {/* <Route path="/dashboard/deleted">
                      <DeletedNotes />
                    </Route> */}
                  </Switch>
                </BrowserRouter>
              </main> 
            </div>
      </div>
    );
}