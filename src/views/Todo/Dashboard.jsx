import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeNew } from "../../actions/user";
import { fetchCategories } from "../../actions/todo";
import { setMessage } from "../../actions/status";

import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Info from '@material-ui/icons/InfoOutlined';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import CategoryForm from 'app-components/CategoryForm.jsx';
import TodoForm from 'app-components/TodoForm.jsx';
import TodoDisplay from 'app-components/TodoDisplay.jsx';

import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            new: this.props.profile.new
        };

        props.fetchCategories();
        if(props.profile.new) {
            props.removeNew();
        }
    }

    componentWillUnmount() {
        this.props.setMessage(null);
    }

    renderMessage() {
        if(this.props.message) {
            return (
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
            )
        } else {
            return null;
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.container + " " + classes.mainContainer}>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={4}>
                            <CategoryForm/>
                            <div className={classes.space} />
                            <TodoForm/>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={8}>
                            {this.state.new ? (
                                <SnackbarContent
                                    message={
                                        <span>
                                            <strong>Welcome to Sticky Todo!</strong> Use the forms on your <strong>left</strong> to create new todo categories
                                            and todos and get organized right away!
                                        </span>
                                    }
                                    close
                                    color="success"
                                    icon={Info}
                                />
                            ) : null}
                            {this.renderMessage()}
                            <TodoDisplay/>
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
        message: state.status.message
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => {
            dispatch(fetchCategories());
        },
        removeNew: () => {
            dispatch(removeNew());
        },
        setMessage: message => {
            dispatch(setMessage(message));
        }
    }
};

Dashboard.propTypes = {
    classes: PropTypes.object,
    profile: PropTypes.object,
    message: PropTypes.object,


    fetchCategories: PropTypes.func,
    removeNew: PropTypes.func,
    setMessage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(basicsStyle)(Dashboard));
