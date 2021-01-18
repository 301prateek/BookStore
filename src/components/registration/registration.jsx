import React from "react";
import "./registration.css";
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

const service = new UserService();

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         // marginLeft: theme.spacing(2),
//         // marginRight: theme.spacing(5),
//         // width: '25ch',
//         // marginLeft: "5%",
//         // marginRight: "3%",
//     },
// }));

export default class Registration extends React.Component {

    // classes = useStyles(); withstyle

    constructor(props) {
        super(props)
        this.state = {
            fullName: "",
            fullNameError: false,
            fullNameMsg: "",
            email: "",
            emailError: false,
            emailMsg: "",
            password: "",
            passwordError: false,
            passwordMsg: "",
            phoneNumber: "",
            phoneNumberError: false,
            phoneNumberMsg: "",
            showPassword: false
        }
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this. handleChangePassword = this. handleChangePassword.bind(this) ;
    };


    validation = () => {
        this.setState({
            fullNameError: false,
            fullNameMsg: "",
            emailError: false,
            emailMsg: "",
            passwordError: false,
            passwordMsg: "",
            phoneNumberError: false,
            phoneNumberMsg: "",
        })

        let isValid = false;
        const fullNameRegex = new RegExp(/^[A-Z]{1}[a-zA-Z]{1,}[ ][A-Z]{1}[a-zA-Z]{1,}$/);
        if (this.state.fullName.length > 0 && !fullNameRegex.test(this.state.fullName)) {
            this.setState({
                fullNameError: true,
                fullNameMsg: 'Full Name Invalid'
            })
            isValid = true
        }

        if (this.state.fullName.length === 0) {
            this.setState({
                fullNameError: true,
                fullNameMsg: 'Full Name Required'
            })
            isValid = true
        }

        const emailRegex = new RegExp(/^([A-Za-z0-9]){2,}([.]?)([A-Za-z0-9]){2,}@([a-z])+([.][a-z]{2,})+$/);
        if (this.state.email.length > 0 && !emailRegex.test(this.state.email)) {
            this.setState({
                emailError: true,
                emailMsg: "Email Required"
            })
            isValid = true
        }

        if (this.state.email.length === 0) {
            this.setState({
                emailError: true,
                emailMsg: "Invalid Email"
            })
            isValid = true
        }

        const passwordRegex = RegExp(/^(?=.+[0-9])(?=.+[a-z])(?=.+[!@#$%^&*])(?=.+[A-Z])(?=.*[a-zA-Z]).{8,}/);
        if (this.state.password.length > 0 && !passwordRegex.test(this.state.password)) {
            this.setState({
                passwordError: true,
                passwordMsg: 'Follow password rules'
            })
            isValid = true
        }

        if (this.state.password.length === 0) {
            this.setState({
                passwordError: true,
                passwordMsg: 'Email Required'
            })
            isValid = true
        }

        const phoneRegex = new RegExp(/^([6-9]){1}([0-9]){9}/);
        if (this.state.phoneNumber.length > 0 && !phoneRegex.test(this.state.phoneNumber)) {
            this.setState({
                phoneNumberError: true,
                phoneNumberMsg: 'Follow phone number rules'
            })
            isValid = true
        }

        if (this.state.phoneNumber.length === 0) {
            this.setState({
                phoneNumberError: true,
                phoneNumberMsg: 'Phone number Required'
            })
            isValid = true
        }
        return isValid;
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = () => {
        if (this.validation()) {
            console.log("Sign Up Failed");
        }
        else {
            console.log('Successful!', this.state.fullName, this.state.email, this.state.password, this.state.phoneNumber);
            let userData = {
                "fullName": this.state.fullName,
                "email": this.state.email,
                "password": this.state.password,
                "phoneNumber": this.state.phoneNumber
            }
            service.registration(userData).then(data => {
                console.log(data);
                this.props.history.push("/login");
            }).catch(error => {
                console.log(error);
            })
        }
    }

    handleClickShowPassword = (e) => {
        // e.preventDefault();
        this.setState({
           showPassword: true,
        })
      };

    handleChangePassword = (e) => {
        // e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

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
                <div className="first-container" >
                    <h2>SIGNUP</h2>
                    <form onSubmit={this.submit} >
                        <div className="content">
                            <div className="textfield">
                                <TextField
                                    name="fullName"
                                    label="Full Name"
                                    id="outlined-margin-dense"
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    error={this.state.fullNameError}
                                    helperText={this.state.fullNameMsg}
                                />
                            </div>
                            <div className="textfield">
                                <TextField
                                    name="email"
                                    label="Email id"
                                    id="outlined-margin-dense"
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    error={this.state.emailError}
                                    helperText={this.state.emailMsg}
                                />
                            </div>
                            <div className="textfield">
                                {/* <TextField
                                    name="password"
                                    label="Password"
                                    id="outlined-margin-dense"
                                    fullWidth
                                    type="password"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    error={this.passwordError}
                                    helperText={this.passwordMsg}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                /> */}
                            {/* <div className="textfield"> */}
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        name="password"
                                        label="Password"
                                        id="outlined-adornment-password"
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
                                                    onClick={this.handleClickShowPassword}
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
                            <div className="textfield">
                                <TextField
                                    name="phoneNumber"
                                    label="Phone number"
                                    id="outlined-margin-dense"
                                    fullWidth
                                    helperText=""
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    error={this.state.phoneNumberError}
                                    helperText={this.state.phoneNumberMsg}
                                />
                            </div>
                        </div>
                        <div className="buttons">
                            <Button size="medium" fullWidth color="default" onClick={this.submit}>
                                <span>Sign up</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

