import React from "react";
import { Link } from 'react-router-dom';
import "./login.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserService from "../../Services/userService";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import userService from '../../Services/userService';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            email: "",
            emailError: false,
            emailMsg: "",
            password:"",
            passwordError: false,
            passwordMsg:"",
            showPassword: false
        };
        this.togglePassword = this.togglePassword.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    validate = () =>{

        this.setState({
            emailError: false, 
            emailMsg: "",
            passwordError: false,
            passwordMsg: "",
        })

        let isValid = false

        let emailRegex = new RegExp(/^([A-Za-z0-9]){2,}([.]?)([A-Za-z0-9]){2,}@([a-z])+([.][a-z]{2,})+$/);
        if(this.state.email.length > 0 && !emailRegex.test(this.state.email)){
            this.setState({
                emailError: true,
                emailMsg: 'Invlid Email'
            })
            isValid = true
        }

        if(this.state.email.length === 0){
            this.setState({
                emailError: true,
                emailMsg: 'Email required'
            })
            isValid = true
        }

        let passwordRegex = RegExp(/^(?=.+[0-9])(?=.+[a-z])(?=.+[!@#$%^&*])(?=.+[A-Z])(?=.*[a-zA-Z]).{8,}/);
        if(this.state.password.length > 0 && !passwordRegex.test(this.state.password)){
            this.setState({
                passwordError: true,
                passwordMsg: 'Follow Password Rules'
            })
            isValid = true
        }

        if(this.state.password.length === 0){
            this.setState({
                passwordError: true,
                passwordMsg: 'Password required'
            })
            isValid = true
        }
        return isValid;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });    
    }    

    togglePassword(){
        this.setState({showPassword: !this.state.showPassword});
      };

    handleChangePassword = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    submit = (e) =>{
        e.preventDefault();
        if(this.validate()){
            console.log('login failed');
        }else{
            console.log('login successful', this.state.email, this.state.password);
            let userData = {
                "email": this.state.email,
                "password": this.state.password,
            }
            service.login(userData).then(data => {
                console.log(data);
                console.log(data.data.result.accessToken);
                localStorage.setItem('userToken', data.data.result.accessToken);
                // localStorage.setItem(data.data.result.accessToken);
                this.props.history.push('/dashboard');
                
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render() {
        return (
            <div className="main-container">
                <div className="pic-container">
                    <div>
                        <img className="img" src="/assets/shoping.png" alt="" width="244" height="244" />
                    </div>
                    <div>
                        <span>ONLINE BOOK SHOPPING</span>
                    </div>
                </div>
                <div className="first-containerLogin" >
                    <h2>LOGIN</h2>
                    <form onSubmit={this.submit} >
                        <div className="content">
                            <div className="textfield">
                                <TextField
                                    name="email"
                                    label="Email id"
                                    id="outlined-margin-dense"
                                    fullWidth
                                    size="normal"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    error={this.state.emailError}
                                    helperText={this.state.emailMsg}
                                />
                            </div>
                            <div className="textfield">
                                <FormControl size="small" className="textfield" variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        size="small"
                                        name="password"
                                        label="Password"
                                        // id="outlined-adornment-password"
                                        id="filled-size-small"
                                        fullWidth
                                        onChange={this.handleChangePassword}
                                        error={this.state.passwordError}
                                        helperText={this.state.passwordMsg}
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        // onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.togglePassword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={25}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="buttons-login">
                        <ThemeProvider theme={theme}>
                            <Button size="medium" fullWidth color="primary" onClick={this.submit}>
                                <span>Sign in</span>
                            </Button>
                        </ThemeProvider>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
