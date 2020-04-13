import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {completeTodo, deleteTodo, setEditTodo, setEditCategory, deleteCategory, uncompleteTodo} from "../actions/todo";
import {EMPTY_TODO} from "../reducers/todo";
import {setFocus} from "../actions/status";

import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/core
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Check from '@material-ui/icons/Check';
import Edit from '@material-ui/icons/Edit';
import Trash from '@material-ui/icons/Delete';
import More from '@material-ui/icons/MoreVert';
import Refresh from '@material-ui/icons/Refresh';
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Success from "components/Typography/Success.jsx";
import Muted from "components/Typography/Muted.jsx";

import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";


class CategoryDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: false,
            show: this.props.show
        }
    }

    showCompleted = () => {
        this.setState({completed: !this.state.completed});
    };

    show = () => {
        this.setState({show: !this.state.show});
    };

    moreClicked = item => {
        if (item === 'Edit') {
            this.props.setEditCategory(this.props.category);
        } else if (item === 'Delete') {
            this.props.deleteCategory(this.props.category.id);
        }
    };

    renderTodos() {
        return this.props.todos.map((todo) => {
            return [
                todo.todo,
                [
                    (
                        <Button key={0} simple justIcon color="success" onClick={() => {
                            this.props.completeTodo(todo);
                        }}>
                            <Check/>
                        </Button>
                    ),
                    (

                        <Button key={1} simple justIcon color="info" onClick={() => {
                            this.props.setEditTodo(todo);
                        }}>
                            <Edit/>
                        </Button>
                    ),
                    (
                        <Button key={2} simple justIcon color="danger" onClick={() => {
                            this.props.deleteTodo(todo);
                        }}>
                            <Trash/>
                        </Button>
                    )
                ]
            ]
        });
    }

    renderComplete() {
        return this.props.completed.map((todo, key) => {
            return [
                todo.todo,
                new Date(todo.completedTime).toUTCString().slice(0, -7),
                (
                    <Tooltip
                        key={key}
                        id="revive-todo"
                        title="Un-complete"
                        placement="top"
                        classes={{tooltip: this.props.classes.tooltip}}
                    >
                        <Button simple justIcon color="danger" onClick={() => {
                            this.props.uncompleteTodo(todo);
                        }}>
                            <Refresh/>
                        </Button>
                    </Tooltip>
                )
            ]
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.props.pad ? (
                    <div className={classes.space}/>
                ) : null}
                <Card>
                    <CardHeader color={this.props.category.color}>
                        <div className={classes.floatRight}>
                            <CustomDropdown
                                buttonIcon={More}
                                caret={false}
                                buttonProps={{
                                    round: true,
                                    block: true,
                                    color: "transparent",
                                    size: 'sm'
                                }}
                                dropPlacement="bottom"
                                dropdownList={[
                                    "Edit",
                                    "Delete",
                                ]}
                                onClick={this.moreClicked}
                            />
                        </div>
                        <h3>
                            {this.props.category.name}
                            <Button color={this.props.category.color} size="sm" round onClick={() => {
                                if (this.props.focus) {
                                    this.props.setFocus(null);
                                } else {
                                    this.props.setFocus(this.props.category.id);
                                }
                            }} style={{marginLeft: '16px'}}>
                                {this.props.focus ? "Remove focus" : 'Focus'}
                            </Button>
                            <Button color={this.props.category.color} size="sm" round onClick={() => {
                                this.props.setEditTodo(Object.assign({}, EMPTY_TODO, {category: this.props.category.id}))
                            }} style={{marginLeft: '16px'}}>
                                New todo
                            </Button>
                            <Button color={this.props.category.color} size="sm" round onClick={this.show}
                                    style={{marginLeft: '16px'}}>
                                {this.state.show ? "Hide" : 'Show'}
                            </Button>
                        </h3>
                    </CardHeader>
                    <CardBody>
                        {this.state.show ? (
                            <div>
                                <GridContainer>
                                    <GridItem xs={12}>
                                <span style={{marginRight: '32px'}}>
                                    Todos <Muted>({this.props.todos.length})</Muted>
                                </span>
                                        <span>
                                    <Success>Completed <Muted>({this.props.completed.length})</Muted></Success>
                                </span>
                                        <Button color="secondary" onClick={() => {
                                            this.showCompleted()
                                        }} className={classes.floatRight}>
                                            {this.state.completed ? "Hide completed" : "Show completed"}
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                                <Table
                                    tableData={this.renderTodos()}
                                    customCellClasses={[
                                        classes.actionsTd,
                                    ]}
                                    customClassesForCells={[1]}
                                />
                                {
                                    this.state.completed ? (
                                        <div>
                                            <h4>Completed <Muted>({this.props.completed.length})</Muted></h4>
                                            <Table
                                                tableHead={[
                                                    'Todo',
                                                    'Completed at',
                                                    'Un-complete'
                                                ]}
                                                tableData={this.renderComplete()}
                                                customCellClasses={[
                                                    classes.textRight
                                                ]}
                                                customClassesForCells={[2]}
                                            />
                                        </div>
                                    ) : null
                                }
                            </div>
                        ) : null}
                    </CardBody>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        focus: state.status.focus
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setEditCategory: category => {
            dispatch(setEditCategory(category));
        },
        deleteCategory: id => {
            dispatch(deleteCategory(id));
        },
        completeTodo: todo => {
            dispatch(completeTodo(todo));
        },
        deleteTodo: todo => {
            dispatch(deleteTodo(todo));
        },
        setEditTodo: todo => {
            dispatch(setEditTodo(todo));
        },
        uncompleteTodo: todo => {
            dispatch(uncompleteTodo(todo));
        },
        setFocus: val => {
            dispatch(setFocus(val));
        }
    }
};

CategoryDisplay.propTypes = {
    show: PropTypes.bool.isRequired,
    pad: PropTypes.bool,
    classes: PropTypes.object,
    focus: PropTypes.string,
    category: PropTypes.object,
    todos: PropTypes.array,
    completed: PropTypes.array,
    setEditCategory: PropTypes.func,
    deleteCategory: PropTypes.func,
    completeTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    setEditTodo: PropTypes.func,
    uncompleteTodo: PropTypes.func,
    setFocus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(basicsStyle)(CategoryDisplay));