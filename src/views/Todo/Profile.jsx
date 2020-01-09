import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editProfile, changePassword} from "../../actions/user";
import { setMessage } from "../../actions/status";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/core icons
import Info from '@material-ui/icons/InfoOutlined';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import style from "assets/jss/views/profileStyle.jsx";


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.profile.name,
            nameError: false,
            email: '',
            emailError: false
        }
    }

    componentWillUnmount() {
        this.props.setMessage(null);
    }

    renderMessage() {
        if(this.props.message) {
            return (
                <div>
                    <SnackbarContent
                        message={
                            <span>
                          {this.props.message.message}
                        </span>
                        }
                        close
                        color={this.props.message.status}
                        icon={Info}
                    />
                    <div className={this.props.classes.space15}/>
                </div>
            )
        } else {
            return null;
        }
    }

    setName = e => {
        this.setState({name: e.target.value});
    };

    setEmail = e => {
        this.setState({email: e.target.value});
    };

    submit() {
        let valid = true;
        let errors = {};
        if (!this.state.name) {
            errors['nameError'] = true;
            valid = false;
        }
        if (valid) {
            this.props.editProfile(this.state.name)
        } else {
            this.setState(errors);
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <div className={classes.container + " " + classes.mainContainer}>
                    <GridContainer>
                        <GridItem xs={12} sm={8}>
                            {this.renderMessage()}
                            <Card>
                                <CardHeader color="info">
                                    <h4>Profile form</h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem sm={6}>
                                            <CustomInput
                                                id="name"
                                                labelText="Name"
                                                error={this.state.nameError}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: this.state.name,
                                                    onChange: this.setName,
                                                    type: "text",
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem sm={6}>
                                            <Button color="info" onClick={() => {
                                                this.submit();
                                            }}>
                                                Update profile
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                            <div className={classes.space15}/>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <Card profile>
                                <CardBody>
                                    <h6
                                        className={`${classes.cardCategory} ${
                                            classes.cardDescription
                                            }`}
                                    >
                                        {this.props.profile.email}
                                    </h6>
                                    <h4 className={classes.cardTitle}>{this.props.profile.name}</h4>
                                    {this.props.profile.registration === 'email' ? (
                                        <div>
                                            <Button round color="primary" block disabled={this.props.loading} onClick={() => this.props.changePassword()}>
                                                Change password
                                            </Button>
                                            <p className={classes.cardDescription}>
                                                You will be sent an email to your email on record
                                                with a link to change your password.
                                            </p>
                                        </div>
                                    ) : null}
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.user.profile,
        message: state.status.message,
        loading: state.status.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        editProfile: name => {
            dispatch(editProfile(name));
        },
        changePassword: () => {
            dispatch(changePassword());
        },
        setMessage: message => {
            dispatch(setMessage(message));
        }
    }
};

Profile.propTypes = {
    classes: PropTypes.object,
    profile: PropTypes.object,
    message: PropTypes.object,
    loading: PropTypes.bool,

    editProfile: PropTypes.func,
    changePassword: PropTypes.func,
    setMessage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Profile));
