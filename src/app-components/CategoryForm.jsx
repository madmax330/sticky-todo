import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEditCategory, addCategory, editCategory } from "../actions/todo";
import {setMessage} from "../actions/status";
import {EMPTY_CATEGORY} from "../reducers/todo";

import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Square from '@material-ui/icons/Stop';
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

import Danger from "components/Typography/Danger.jsx";
import Warning from "components/Typography/Warning.jsx";
import Success from "components/Typography/Success.jsx";
import Info from "components/Typography/Info.jsx";
import Primary from "components/Typography/Primary.jsx";
import Rose from "components/Typography/Rose.jsx";

import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";


class CategoryForm extends Component {

    setName = e => {
        this.props.setEditCategory(Object.assign({}, this.props.category, {
            name: e.target.value
        }));
    };

    setColor = e => {
        this.props.setEditCategory(Object.assign({}, this.props.category, {
            color: e.target.value
        }));
    };

    setOrder = e => {
        this.props.setEditCategory(Object.assign({}, this.props.category, {
            order: Number(e.target.value)
        }));
    };

    submit() {
        if(this.props.category.name && this.props.category.color) {
            if(this.props.category.id) {
                this.props.editCategory(this.props.category);
            } else {
                this.props.addCategory(this.props.category);
            }
        } else {
            this.props.setMessage({message: 'Error creating category: All category fields are required', status: 'danger'});
        }
    }

    renderColors() {
        return [
            {color: 'danger', label: 'Red', comp: Danger},
            {color: 'warning', label: 'Yellow', comp: Warning},
            {color: 'success', label: 'Green', comp: Success},
            {color: 'info', label: 'Blue', comp: Info},
            {color: 'primary', label: 'Purple', comp: Primary},
            {color: 'rose', label: 'Rose', comp: Rose},
        ].map((color, key) => {
            return (
                <MenuItem
                    key={key}
                    classes={{
                        root: this.props.classes.selectMenuItem,
                        selected: this.props.classes.selectMenuItemSelected
                    }}
                    value={color.color}
                >
                    {color.label} <color.comp className={this.props.classes.floatRight}><Square/></color.comp>
                </MenuItem>
            )
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Card>
                <CardHeader color="info">
                    <h5>Category form</h5>
                </CardHeader>
                <CardBody>
                    <CustomInput
                        id="name"
                        labelText="Name"
                        error={false}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: this.props.category.name,
                            onChange: this.setName,
                            type: "text",
                        }}
                    />
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel
                            htmlFor="color"
                            className={classes.selectLabel}
                        >
                            Color
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu
                            }}
                            classes={{
                                select: classes.select
                            }}
                            value={this.props.category.color}
                            onChange={this.setColor}
                            inputProps={{
                                name: "color",
                                id: "color"
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem
                                }}
                            >
                                Select color
                            </MenuItem>
                            {this.renderColors()}
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
                            value: this.props.category.order,
                            onChange: this.setOrder,
                            type: "number",
                        }}
                    />
                    <Button block color="info" round onClick={() => {
                        this.submit();
                    }} disabled={this.props.loading}>
                        {this.props.category.id ? 'Save' : 'New category'}
                    </Button>
                    {this.props.category.id ? (
                        <Button color="default" round  block onClick={() => {
                            this.props.setEditCategory(EMPTY_CATEGORY);
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
        category: state.todo.editCategory,
        loading: state.status.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setEditCategory: category => {
            dispatch(setEditCategory(category));
        },
        addCategory: category => {
            dispatch(addCategory(category));
        },
        editCategory: category => {
            dispatch(editCategory(category));
        },
        setMessage: message => {
            dispatch(setMessage(message));
        }
    }
};

CategoryForm.propTypes = {
    classes: PropTypes.object,
    category: PropTypes.object,
    loading: PropTypes.bool,

    setEditCategory: PropTypes.func,
    addCategory: PropTypes.func,
    editCategory: PropTypes.func,
    setMessage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(basicsStyle)(CategoryForm));