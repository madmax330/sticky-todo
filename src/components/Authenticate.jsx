import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export default function(ComposedComponent) {

    class Authentication extends Component {

        constructor(props) {
            super(props);

            if(props.user === null || props.profile === null) {
                props.history.push("/login");
            }
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if(!(this.props.user && this.props.profile)) {
                this.props.history.push("/login");
            }
        }

        render() {
            if(this.props.user && this.props.profile) {
                return <ComposedComponent {...this.props} />
            }
            return null;
        }
    }

    Authentication.propTypes = {
        history: PropTypes.object.isRequired,
        user: PropTypes.object,
        profile: PropTypes.object
    };

    function mapStateToProps(state) {
        return {
            user: state.user.user,
            profile: state.user.profile
        }
    }

    return connect(mapStateToProps)(Authentication);
}

