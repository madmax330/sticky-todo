import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { googleSignIn, registerUser, googleRegister, setMethod } from "../../actions/user";
import { setMessage } from "../../actions/status";
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Checks from "@material-ui/icons/DoneAll";
import Dashboard from "@material-ui/icons/Dashboard";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from "components/Typography/Danger.jsx";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            termsError: false,
            name: '',
            nameError: false,
            email: '',
            emailError: false,
            password: '',
            passwordError: false,
            confirm: '',
            confirmError: false,

            registerLaunched: false
        };
        this.handleToggle = this.handleToggle.bind(this);

        if(props.user && props.profile) {
            props.history.push('/todo');
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((this.props.user && !this.props.profile) && this.props.method === 'google' && !this.state.registerLaunched) {
            this.setState({registerLaunched: true});
            this.props.googleRegister();
        }
        if(this.props.user && this.props.profile) {
            this.props.history.push('/todo');
        }
    }

    componentWillUnmount() {
        this.props.setMessage(null);
    }

    handleToggle() {
        let checked = this.state.checked;
        if(!checked) {
            this.setState({checked: !checked, termsError: false})
        } else {
            this.setState({checked: !checked})
        }
    }

    setName = e => {
        this.setState({name: e.target.value, nameError: false});
    };

    setEmail = e => {
        this.setState({email: e.target.value, emailError: false});
    };

    setPassword = e => {
        this.setState({password: e.target.value, passwordError: false});
    };

    setConfirm = e => {
        this.setState({confirm: e.target.value, confirmError: false});
    };

    register = () => {
        let valid = true;
        let errors = {};
        if(!this.state.name) {
            errors['nameError'] = true;
            valid = false;
        }
        if(!this.state.email) {
            errors['emailError'] = true;
            valid = false;
        }
        if(!this.state.password) {
            errors['passwordError'] = true;
            valid = false;
        }
        if(!this.state.confirm) {
            errors['confirmError'] = true;
            valid = false;
        }
        if(!this.state.checked) {
            errors['termsError'] = true;
            valid = false;
        }
        if(this.state.password !== this.state.confirm) {
            errors['passwordError'] = true;
            errors['confirmError'] = true;
            valid = false;
        }
        if(valid) {
            this.props.registerUser(this.state.name, this.state.email, this.state.password);
        } else {
            this.setState(errors);
        }
    };

    googleRegister = () => {
        let valid = true;
        let errors = {};
        if(!this.state.checked) {
            errors['termsError'] = true;
            valid = false;
        }
        if(valid) {
            this.props.setMethod('google');
            this.props.googleSignIn();
        } else {
            this.setState(errors);
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={10} md={10}>
                        <Card className={classes.cardSignup}>
                            <h2 className={classes.cardTitle}>Sign Up</h2>
                            <CardBody>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={5} md={5}>
                                        <InfoArea
                                            className={classes.infoArea}
                                            title="Todos"
                                            description="Keep track of all the things you want to do."
                                            icon={Checks}
                                            iconColor="rose"
                                        />
                                        <InfoArea
                                            className={classes.infoArea}
                                            title="Categories"
                                            description="Organize your todos in categories."
                                            icon={Dashboard}
                                            iconColor="primary"
                                        />
                                        <InfoArea
                                            className={classes.infoArea}
                                            title="Be Productive"
                                            description="Increase your productivity by always knowing what you have to do for all your projects."
                                            icon={Timeline}
                                            iconColor="info"
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={5} md={5}>
                                        <div className={classes.textCenter}>
                                            <Button round color="info" onClick={() => {
                                                this.googleRegister();
                                            }}>
                                                <i
                                                    className={classes.socials + " fab fa-google"}
                                                    style={{marginRight: '10px'}}
                                                />
                                                Sign up with Google
                                            </Button>
                                            <h4 className={classes.socialTitle}>
                                                or be classical
                                            </h4>
                                        </div>
                                        <form className={classes.form}>
                                            {this.props.message ? (<Danger>{this.props.message.message}</Danger>) : null}
                                            {this.state.passwordError && this.state.confirmError ? (<Danger>Passwords do not match</Danger>) : null}
                                            {this.state.termsError ? <Danger>You must accept the usage terms to continue</Danger> : null}
                                            <CustomInput
                                                labelText="Name *"
                                                error={this.state.nameError}
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    value: this.state.name,
                                                    onChange: this.setName,
                                                    endAdornment: this.state.nameError ? null : (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Face
                                                                className={classes.inputAdornmentIcon}
                                                            />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Email *"
                                                error={this.state.emailError}
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    type: 'email',
                                                    value: this.state.email,
                                                    onChange: this.setEmail,
                                                    endAdornment: this.state.emailError ? null : (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Email
                                                                className={classes.inputAdornmentIcon}
                                                            />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Password *"
                                                error={this.state.passwordError}
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    type: 'password',
                                                    value: this.state.password,
                                                    onChange: this.setPassword,
                                                    endAdornment: this.state.passwordError ? null : (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Icon className={classes.inputAdornmentIcon}>
                                                                lock_outline
                                                            </Icon>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Confirm password *"
                                                error={this.state.confirmError}
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    type: 'password',
                                                    value: this.state.confirm,
                                                    onChange: this.setConfirm,
                                                    endAdornment: this.state.confirmError ? null : (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Icon className={classes.inputAdornmentIcon}>
                                                                lock_outline
                                                            </Icon>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label: classes.label
                                                }}
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle()}
                                                        checkedIcon={
                                                            <Check className={classes.checkedIcon}/>
                                                        }
                                                        icon={
                                                            <Check className={classes.uncheckedIcon}/>
                                                        }
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot
                                                        }}
                                                        checked={
                                                            this.state.checked
                                                        }
                                                    />
                                                }
                                                label={
                                                    <span>
                                                    I agree to the{" "}
                                                    <NavLink to="/terms">terms and conditions</NavLink>.
                                                  </span>
                                                }
                                            />
                                            <div className={classes.textCenter}>
                                                <Button round color="primary" onClick={() => {
                                                    this.register();
                                                }}>
                                                    {this.props.loading ? <i className="fa fa-spin fa-spinner" style={{marginRight: '10px'}}/> : null} Get started
                                                </Button>
                                            </div>
                                        </form>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        profile: state.user.profile,
        method: state.user.method,
        message: state.status.message,
        loading: state.status.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (name, email, password) => {
            dispatch(registerUser(name, email, password));
        },
        googleRegister: () => {
            dispatch(googleRegister());
        },
        googleSignIn: () => {
            dispatch(googleSignIn(false));
        },
        setMethod: val => {
            dispatch(setMethod(val));
        },
        setMessage: message => {
            dispatch(setMessage(message));
        }
    }
};

Register.propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object,
    user: PropTypes.object,
    profile: PropTypes.object,
    method: PropTypes.string,
    message: PropTypes.object,
    loading: PropTypes.bool,
    registerUser: PropTypes.func,
    googleRegister: PropTypes.func,
    googleSignIn: PropTypes.func,
    setMethod: PropTypes.func,
    setMessage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(signupPageStyle)(Register));
