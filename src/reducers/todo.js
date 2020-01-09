import {
    FETCH_CATEGORIES, FETCH_TODOS, FETCH_ALL_TODOS, FETCH_COMPLETED_TODOS,
    SET_EDIT_CATEGORY, SET_EDIT_TODO
} from "../actions/todo";


export const EMPTY_CATEGORY = {
    name: '',
    order: 0,
    color: ''
};

export const EMPTY_TODO = {
    todo: '',
    category: '',
    categoryName: '',
    order: 0
};

const initialState = {
    editCategory: EMPTY_CATEGORY,
    editTodo: EMPTY_TODO,
    categories: {},
    todos: {},
    completedTodos: {},
    allTodos: []
};

export default (state=initialState, action) => {
    switch(action.type) {
        case FETCH_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.payload
            });

        case FETCH_TODOS: {
            let todos = {...state.todos};
            todos[action.payload.category] = action.payload.todos;
            return Object.assign({}, state, {
                todos: todos
            });
        }

        case FETCH_COMPLETED_TODOS: {
            let todos = {...state.completedTodos};
            todos[action.payload.category] = action.payload.todos;
            return Object.assign({}, state, {
                completedTodos: todos
            });
        }

        case FETCH_ALL_TODOS: {
            return Object.assign({}, state, {
                allTodos: action.payload
            });
        }

        case SET_EDIT_CATEGORY:
            return Object.assign({}, state, {
                editCategory: action.payload
            });

        case SET_EDIT_TODO:
            return Object.assign({}, state, {
                editTodo: action.payload
            });

        default:
            return state;
    }
}