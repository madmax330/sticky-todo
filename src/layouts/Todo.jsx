import React from "react";
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from "../actions/user";

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import routes from 'routes/todo.jsx';

class Todo extends React.Component {
    constructor(props) {
        super(props);

        props.fetchUser();
    }

    render() {
        return (
            <div>
                <Header
                    color="info"
                    brand="Sticky Todo"
                    links={<HeaderLinks />}
                />
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

Todo.propTypes = {
    fetchUser: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Todo);
