import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryDisplay from 'app-components/CategoryDisplay';


class TodoDisplay extends Component {

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
        return (
            <div>
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
        focus: state.status.focus
    }
};

TodoDisplay.propTypes = {
    categories: PropTypes.object,
    todos: PropTypes.object,
    completed: PropTypes.object,
    focus: PropTypes.string
};

export default connect(mapStateToProps)(TodoDisplay);