import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllTodos, fetchCategories, uncompleteTodo } from "../../actions/todo";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/core

// @material-ui/core icons

// core components
import ReactTable from 'react-table';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";


class History extends React.Component {
    constructor(props) {
        super(props);

        props.fetchAllTodos();
        props.fetchCategories();
    }

    getData() {
        return this.props.todos.map((todo, key) => {
            return {
                key: key,
                todo: todo.todo,
                category: todo.categoryName,
                completed: new Date(todo.completedTime).toUTCString().slice(0, -7)
            }

        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.container + " " + classes.mainContainer}>
                    <div>
                        <GridContainer>
                            <GridItem xs={12}>
                                <Card>
                                    <CardHeader color="info">
                                        <h2>Completed Todos History</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <ReactTable
                                            filterable
                                            columns={[
                                                {
                                                    Header: "Todo",
                                                    accessor: 'todo',
                                                },
                                                {
                                                    Header: "Category",
                                                    accessor: 'category',
                                                },
                                                {
                                                    Header: "Completed at",
                                                    accessor: 'completed',
                                                }
                                            ]}
                                            data={this.getData()}
                                            defaultPageSize={10}
                                            showPaginationBottom={true}
                                        />
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todo.allTodos
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTodos: () => {
            dispatch(fetchAllTodos());
        },
        fetchCategories: () => {
            dispatch(fetchCategories());
        },
        uncompleteTodo: todo => {
            dispatch(uncompleteTodo(todo));
        }
    }
};

History.propTypes = {
    classes: PropTypes.object,
    todos: PropTypes.array,
    fetchAllTodos: PropTypes.func,
    fetchCategories: PropTypes.func,
    uncompleteTodo: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(basicsStyle)(History));
