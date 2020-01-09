import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn, googleSignIn } from "../../actions/user";
import { setMessage } from "../../actions/status";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/LockOutlined";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from "components/Typography/Danger.jsx";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            password: '',
            passwordError: false
        };

        if(props.user && props.profile) {
            props.history.push('/todo');
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.user && this.props.profile) {
            this.props.history.push('/todo');
        }
    }

    componentWillUnmount() {
        this.props.setMessage(null);
    }

    setEmail = e => {
        this.setState({email: e.target.value, emailError: false});
    };

    setPassword = e => {
        this.setState({password: e.target.value, passwordError: false});
    };

    signIn = () => {
        let valid = true;
        let errors = {};
        if(!this.state.email) {
            errors['emailError'] = true;
            valid = false;
        }
        if(!this.state.password) {
            errors['passwordError'] = true;
            valid = false;
        }
        if(valid) {
              this.props.signIn(this.state.email, this.state.password);
        } else {
            this.setState(errors);
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card className={classes.loginCard}>
                            <form className={classes.form}>
                                <CardHeader
                                    color="primary"
                                    signup
                                    className={classes.cardHeader}
                                >
                                    <h4 className={classes.cardTitle}>Login</h4>
                                    <div className={classes.socialLine}>
                                        <Button
                                            justIcon
                                            color="transparent"
                                            className={classes.iconButtons}
                                            onClick={e => {
                                                e.preventDefault();
                                                this.props.googleSignIn();
                                            }}
                                        >
                                            <i className="fab fa-google" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <p
                                    className={`${classes.description} ${classes.textCenter}`}
                                >
                                    Or Be Classical
                                </p>
                                <CardBody signup>
                                    {this.props.message ? (<Danger>{this.props.message.message}</Danger>) : null}
                                    <CustomInput
                                        id="email"
                                        labelText="Email"
                                        error={this.state.emailError}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: this.state.email,
                                            onChange: this.setEmail,
                                            type: "email",
                                            endAdornment: this.state.emailError ? null : (
                                                <InputAdornment position="start">
                                                    <Email className={classes.inputIconsColor} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <CustomInput
                                        id="pass"
                                        labelText="Password"
                                        error={this.state.passwordError}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: this.state.password,
                                            onChange: this.setPassword,
                                            type: "password",
                                            endAdornment: this.state.passwordError ? null : (
                                                <InputAdornment position="start">
                                                    <Lock className={classes.inputIconsColor} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </CardBody>
                                <div className={classes.textCenter}>
                                    <Button simple color="primary" size="lg" onClick={() => {
                                        this.signIn();
                                    }}>
                                        {this.props.loading ? <i className="fa fa-spin fa-spinner" style={{marginRight: '10px'}}/> : null} {"Let's Go"}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        profile: state.user.profile,
        message: state.status.message,
        loading: state.status.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: (email, password) => {
            dispatch(signIn(email, password));
        },
        googleSignIn: () => {
            dispatch(googleSignIn());
        },
        setMessage: message => {
            dispatch(setMessage(message));
        }
    }
};

Login.propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object,
    user: PropTypes.object,
    profile: PropTypes.object,
    message: PropTypes.object,
    loading: PropTypes.bool,
    signIn: PropTypes.func,
    googleSignIn: PropTypes.func,
    setMessage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(Login));

