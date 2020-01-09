import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import indexRoutes from 'routes/index';

import { connect } from 'react-redux';
import { fetchUser } from "./actions/user";

class App extends Component {

    constructor(props) {
        super(props);

        props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {indexRoutes.map((prop, key) => {
                        return <Route path={prop.path} key={key} component={prop.component}/>;
                    })}
                </Switch>
            </BrowserRouter>
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

App.propTypes = {
    fetchUser: PropTypes.func
};

export default connect(null, mapDispatchToProps)(App);
