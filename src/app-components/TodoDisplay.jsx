import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {setSearch} from "../actions/status";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Search from "@material-ui/icons/Search";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import CategoryDisplay from 'app-components/CategoryDisplay';

import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx";


class TodoDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.setSearch('');
    }

    setSearch = e => {
        this.setState({search: e.target.value});
    };

    onSubmit(event) {
        event.preventDefault();

        this.props.setSearch(this.state.search);
    }

    clearSearch = () => {
        this.setState({search: ''});
        this.props.setSearch('');
    };

    renderCategories() {
        if(this.props.focus) {
            const category = this.props.categories[this.props.focus];
            return (
                <CategoryDisplay
                    pad={false}
                    category={category}
                    todos={this.props.todos[category.id] ? this.props.todos[category.id] : []}
                    completed={this.props.completed[category.id] ? this.props.completed[category.id] : []}
                />
            );

        } else if(this.props.search) {
            const cats = Object.keys(this.props.categories).filter( val => {
                const cat = this.props.categories[val];
                return cat.name.toLowerCase().includes(this.props.search.toLowerCase());
            });
            if(cats.length) {
                return <div>
                    <div>
                        <p>
                            Showing results for search &quot;{this.props.search}&quot;.
                            <Button simple color="info" size="sm" onClick={this.clearSearch}>
                                Clear search
                            </Button>
                        </p>
                    </div>
                    {
                        cats.map((cat, key) => {
                            return (
                                <CategoryDisplay
                                    pad={key>0}
                                    category={this.props.categories[cat]}
                                    todos={this.props.todos[cat] ? this.props.todos[cat] : []}
                                    completed={this.props.completed[cat] ? this.props.completed[cat] : []}
                                    key={key}
                                />
                            )
                        })
                    }
                </div>
            } else {
                return <div>
                    <p>
                        No results for search &quot;{this.props.search}&quot;.
                        <Button simple color="info" size="sm" onClick={this.clearSearch}>
                            Clear search
                        </Button>
                    </p>
                </div>;
            }
        } else {
            return Object.keys(this.props.categories).map((cat, key) => {
                return (
                    <CategoryDisplay
                        pad={key>0}
                        category={this.props.categories[cat]}
                        todos={this.props.todos[cat] ? this.props.todos[cat] : []}
                        completed={this.props.completed[cat] ? this.props.completed[cat] : []}
                        key={key}
                    />
                )
            });
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <CustomInput
                            formControlProps={{
                                className: classes.formControl,
                                style: {width: "80%"}
                            }}
                            inputProps={{
                                placeholder: "Search category",
                                value: this.state.search,
                                onChange: this.setSearch,
                                inputProps: {
                                    "aria-label": "Search category",
                                    className: classes.searchInput
                                }
                            }}
                        />
                        <Button color="white" justIcon round type="submit">
                            <Search className={classes.searchIcon} />
                        </Button>
                    </form>
                </div>
                {this.renderCategories()}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        categories: state.todo.categories,
        todos: state.todo.todos,
        completed: state.todo.completedTodos,
        focus: state.status.focus,
        search: state.status.search
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSearch: val => {
            dispatch(setSearch(val));
        }
    }
};

TodoDisplay.propTypes = {
    classes: PropTypes.object,
    categories: PropTypes.object,
    todos: PropTypes.object,
    completed: PropTypes.object,

    focus: PropTypes.string,
    search: PropTypes.string,

    setSearch: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(navbarsStyle)(TodoDisplay));