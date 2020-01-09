/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {signOut} from "../../actions/user";

// react components for routing our app without refresh
import { NavLink } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";

import routes from 'routes/todo.jsx';


class HeaderLinks extends React.Component {

    renderLinks() {
        return routes.map((prop, key) => {
            if(prop.redirect || prop.invisible) {
                return null;
            }
            return (
                <ListItem className={this.props.classes.listItem} key={key}>
                    <NavLink to={prop.path} className={this.props.classes.navLink}>
                        <Button
                            color="transparent"
                            className={this.props.classes.navLink}>
                            <prop.icon className={this.props.classes.icon}/> {prop.name}
                        </Button>
                    </NavLink>
                </ListItem>
            )
        });
    }

    render () {
        const {classes} = this.props;
        return (
            <List className={classes.list + " " + classes.mlAuto}>
                {this.renderLinks()}
                <ListItem className={classes.listItem}>
                    <Button
                        color={window.innerWidth < 960 ? "info" : "white"}
                        className={classes.navButton}
                        round
                        onClick={() => {
                            this.props.signOut();
                        }}
                    >
                        Sign out
                    </Button>
                </ListItem>
            </List>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => {
            dispatch(signOut());
        }
    }
};

HeaderLinks.defaultProps = {
    hoverColor: "primary"
};

HeaderLinks.propTypes = {
    dropdownHoverColor: PropTypes.oneOf([
        "dark",
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "rose"
    ]),
    signOut: PropTypes.func
};

export default connect(null, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));
