/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import {NavLink} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";

import Fingerprint from "@material-ui/icons/Fingerprint";
import PersonAdd from "@material-ui/icons/PersonAdd";

import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx";

function PagesLinks({...props}) {

    const {classes} = props;

    return (
        <List className={classes.list + " " + classes.mlAuto}>
            <ListItem className={classes.listItem}>
                <NavLink to="/login" className={classes.navLink}>
                    <Button
                        color="transparent"
                        className={classes.navLink}>
                            <Fingerprint className={classes.icon}/> Login
                    </Button>
                </NavLink>
            </ListItem>
            <ListItem className={classes.listItem}>
                <NavLink to="/signup" className={classes.navLink}>
                    <Button
                        color="transparent"
                        className={classes.navLink}>
                        <PersonAdd className={classes.icon}/> Sign Up
                    </Button>
                </NavLink>
            </ListItem>
        </List>
    );
}

export default withStyles(navbarsStyle)(PagesLinks);
