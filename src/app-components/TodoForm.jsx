import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setEditTodo, addTodo, editTodo} from "../actions/todo";
import {setMessage} from "../actions/status";

import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/CustomButtons/Button.jsx";

import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";
import {EMPTY_TODO} from "../reducers/todo";


class TodoForm extends Component {

    setCategory = e => {
        this.props.setEditTodo(Object.assign({}, this.props.todo, {
            category: e.target.value,
        }));
    };

    setTodo = e => {
        this.props.setEditTodo(Object.assign({}, this.props.todo, {
            todo: e.target.value
        }));
    };

    setOrder = e => {
        this.props.setEditTodo(Object.assign({}, this.props.todo, {
            order: Number(e.target.value)
        }));
    };

    submit() {
        if(this.props.todo.todo && this.props.todo.category) {
            if (this.props.todo.id) {
                this.props.editTodo(this.props.todo);
            } else {
                this.props.todo.categoryName = this.props.categories[this.props.todo.category].name;
                this.props.addTodo(this.props.todo);
            }
        } else {
            this.props.setMessage({message: 'Error creating todo: All todo fields are required', status: 'danger'});
        }
    }

    renderCategories() {
        return Object.keys(this.props.categories).map((cat, key) => {
            return (
                <MenuItem
                    key={key}
                    classes={{
                        root: this.props.classes.selectMenuItem,
                        selected: this.props.classes.selectMenuItemSelected
                    }}
                    value={this.props.categories[cat].id}
                >
                    {this.props.categories[cat].name}
                </MenuItem>
            )
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Card>
                <CardHeader color="info">
                    <h5>Todo form</h5>
                </CardHeader>
                <CardBody>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel
                            htmlFor="category"
                            className={classes.selectLabel}
                        >
                            Category
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu
                            }}
                            classes={{
                                select: classes.select
                            }}
                            value={this.props.todo.category}
                            onChange={this.setCategory}
                            inputProps={{
                                name: "category",
                                id: "category"
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem
                                }}
                            >
                                Select category
                            </MenuItem>
                            {this.renderCategories()}
                        </Select>
                    </FormControl>
                    <CustomInput
                        id="order"
                        labelText="Order"
                        error={false}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: this.props.todo.order,
                            onChange: this.setOrder,
                            type: "number",
                        }}
                    />
                    <CustomInput
                        id="todo"
                        labelText="What do you have to do?"
                        error={false}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: this.props.todo.todo,
                            onChange: this.setTodo,
                            multiline: true,
                            rows: 3
                        }}
                    />
                    <Button color="info" round block onClick={() => {
                        this.submit();
                    }} disabled={this.props.loading}>
                        {this.props.todo.id ? 'Save' : 'New todo'}
                    </Button>
                    {this.props.todo.id ? (
                        <Button color="default" round  block onClick={() => {
                            this.props.setEditTodo(EMPTY_TODO);
                        }} disabled={this.props.loading}>
                            Cancel
                        </Button>
                    ) : null}
                </CardBody>
            </Card>
        )
    }

}

const mapStateToProps = state => {
    return {
        categories: state.todo.categories,
        todo: state.todo.editTodo,
        loading: state.status.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setEditTodo: todo => {
            dispatch(setEditTodo(todo));
        },
        addTodo: todo => {
            dispatch(addTodo(todo));
        },
        editTodo: todo => {
            dispatch(editTodo(todo));
        },
        setMessage: message => {
            dispatch(setMessage(message));
        }
    }
};

TodoForm.propTypes = {
    classes: PropTypes.object,
    categories: PropTypes.object,
    todo: PropTypes.object,
    loading: PropTypes.bool,

    setEditTodo: PropTypes.func,
    addTodo: PropTypes.func,
    editTodo: PropTypes.func,
    setMessage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(basicsStyle)(TodoForm));
