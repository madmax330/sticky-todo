import React from "react";
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from "../actions/user";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
import PagesLinks from "components/Header/PagesLinks.jsx";
import Footer from "components/Footer/Footer.jsx";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";

import image from "assets/img/stickybg.jpg";

import routes from "routes/pages.jsx";

class Login extends React.Component {
    constructor(props) {
        super(props);

        props.fetchUser();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <PagesHeader
                    absolute
                    color="transparent"
                    brand="Sticky Todo"
                    links={<PagesLinks dropdownHoverColor="info" />}
                />
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "contain",
                        backgroundPosition: "top center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <Switch>
                        {routes.map((prop, key) => {
                            if(prop.redirect) {
                                return (
                                    <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                                )
                            } else {
                                return (
                                    <Route path={prop.path} component={prop.component} key={key} />
                                )
                            }
                        })}
                    </Switch>
                    <Footer
                        className={classes.footer}
                        content={
                            <div>
                                <div className={classes.left}>
                                    <List className={classes.list}>
                                        <ListItem className={classes.inlineBlock}>
                                            <NavLink
                                                to="/terms"
                                                className={classes.block}
                                            >
                                                Terms & Conditions
                                            </NavLink>
                                        </ListItem>
                                        <ListItem className={classes.inlineBlock}>
                                            <NavLink
                                                to="/privacy"
                                                className={classes.block}
                                            >
                                                Privacy Policy
                                            </NavLink>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className={classes.right}>
                                    &copy; {1900 + new Date().getYear()} , created by{" "}
                                    <a href="https://www.bossoftwaresolutions.com">Boss Software Solutions</a>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => {
            dispatch(fetchUser());
        }
    }
};

Login.propTypes = {
    classes: PropTypes.object,
    fetchUser: PropTypes.func
};


export default connect(null, mapDispatchToProps)(withStyles(loginPageStyle)(Login));
