import {auth, db, profilesCollection} from "../config/firebase";
import {setLoading, setMessage} from "./status";
import {EMPTY_CATEGORY, EMPTY_TODO} from "../reducers/todo";

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const FETCH_TODOS = 'FETCH_TODOS';

export const FETCH_ALL_TODOS = 'FETCH_ALL_TODOS';

export const FETCH_COMPLETED_TODOS = 'FETCH_COMPLETED_TODOS';

export const EDIT_CATEGORY = 'EDIT_CATEGORY';

export const EDIT_TODO = 'EDIT_TODO';

export const SET_EDIT_CATEGORY = 'SET_EDIT_CATEGORY';

export const SET_EDIT_TODO = 'SET_EDIT_TODO';


export const fillInTodos = () => dispatch => {
    profilesCollection.doc(auth.currentUser.uid).collection('todos').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let todo = doc.data();
                if(!todo.categoryName) {
                    profilesCollection.doc(auth.currentUser.uid).collection('categories').doc(todo.category).get()
                        .then(doc => {
                            todo.categoryName = doc.data().name;
                            profilesCollection.doc(auth.currentUser.uid).collection('todos').doc(todo.id).set(todo);
                        });
                }
            });
        });
    profilesCollection.doc(auth.currentUser.uid).collection('completedTodos').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let todo = doc.data();
                if(!todo.categoryName) {
                    profilesCollection.doc(auth.currentUser.uid).collection('categories').doc(todo.category).get()
                        .then(doc => {
                            todo.categoryName = doc.data().name;
                            profilesCollection.doc(auth.currentUser.uid).collection('completedTodos').doc(todo.id).set(todo);
                        });
                }
            });
        });
};

export const fetchCategories = () => dispatch => {
    profilesCollection.doc(auth.currentUser.uid).collection('categories').orderBy('order').get()
        .then(snapshot => {
            let categories = {};
            snapshot.forEach(doc => {
                let category = doc.data();
                categories[category.id] = category;
                dispatch(fetchTodos(category.id));
                dispatch(fetchCompletedTodos(category.id));
            });
            dispatch({
                type: FETCH_CATEGORIES,
                payload: categories
            });
        })
        .catch(error => {
            dispatch(setMessage({message: `Error loading categories: ${error.message}`, status: 'danger', opened: false}));
        });
};

export const fetchAllTodos = () => dispatch => {
    profilesCollection.doc(auth.currentUser.uid).collection('completedTodos').orderBy('completedTime', 'desc').get()
        .then(snapshot => {
            dispatch({
                type: FETCH_ALL_TODOS,
                payload: snapshot.docs.map(doc => doc.data())
            });
        })
        .catch( error => {
            dispatch(setMessage({message: `Error loading todos: ${error.message}`, status: 'danger', opened: false}));
        });
};


export const fetchTodos = category => dispatch => {
    profilesCollection.doc(auth.currentUser.uid).collection('todos')
        .where('category', '==', category).orderBy('order').get()
        .then(snapshot => {
            dispatch({
                type: FETCH_TODOS,
                payload: {
                    category: category,
                    todos: snapshot.docs.map(doc => doc.data())
                }
            });
        })
        .catch(error => {
            dispatch(setMessage({message: `Error loading todos: ${error.message}`, status: 'danger', opened: false}));
        });
};

export const fetchCompletedTodos = category => dispatch => {
    profilesCollection.doc(auth.currentUser.uid).collection('completedTodos')
        .where('category', '==', category).get()
        .then(snapshot => {
            dispatch({
                type: FETCH_COMPLETED_TODOS,
                payload: {
                    category: category,
                    todos: snapshot.docs.map(doc => doc.data())
                }
            });
        })
        .catch(error => {
            dispatch(setMessage({message: `Error loading completed todos: ${error.message}`, status: 'danger', opened: false}));
        });
};

export const addCategory = category => dispatch => {
    dispatch(setLoading(true));
    let ref = profilesCollection.doc(auth.currentUser.uid).collection('categories').doc();
    category.id = ref.id;
    category.timestamp = new Date().getTime();
    ref.set(category)
        .then(() => {
            dispatch(fetchCategories());
            dispatch(setEditCategory(EMPTY_CATEGORY));
            dispatch(setLoading(false));
        })
        .catch(error => {
            dispatch(setMessage({message: `Error creating new category: ${error.message}`, status: 'danger', opened: false}));
            dispatch(setLoading(false));
        });
};

export const addTodo = todo => dispatch => {
    dispatch(setLoading(true));
    let ref = profilesCollection.doc(auth.currentUser.uid).collection('todos').doc();
    todo.id = ref.id;
    todo.timestamp = new Date().getTime();
    ref.set(todo)
        .then(() => {
            dispatch(fetchTodos(todo.category));
            let temp = EMPTY_TODO;
            temp.category = todo.category; // keep category the same
            dispatch(setEditTodo(temp));
            dispatch(setLoading(false));
        })
        .catch(error => {
            dispatch(setMessage({message: `Error creating todo: ${error.message}`, status: 'danger', opened: false}));
            dispatch(setLoading(false));
        });
};

export const editCategory = category => dispatch => {
    dispatch(setLoading(true));
    profilesCollection.doc(auth.currentUser.uid).collection('categories').doc(category.id).set(category)
        .then(() => {
            dispatch(fetchCategories());
            dispatch(setEditCategory(EMPTY_CATEGORY));
            dispatch(setLoading(false));
        })
        .catch(error => {
            dispatch(setMessage({message: `Error editing category: ${error.message}`, status: 'danger', opened: false}));
            dispatch(setLoading(false));
        });
};

export const editTodo = todo => dispatch => {
    dispatch(setLoading(true));
    profilesCollection.doc(auth.currentUser.uid).collection('todos').doc(todo.id).set(todo)
        .then(() => {
            dispatch(fetchTodos(todo.category));
            dispatch(setEditTodo(EMPTY_TODO));
            dispatch(setLoading(false));
        })
        .catch(error => {
            dispatch(setMessage({message: `Error editing todo: ${error.message}`, status: 'danger', opened: false}));
            dispatch(setLoading(false));
        });
};


export const setEditCategory = category => {
    return {
        type: SET_EDIT_CATEGORY,
        payload: category
    }
};

export const setEditTodo = todo => {
    return {
        type: SET_EDIT_TODO,
        payload: todo
    }
};

export const completeTodo = (todo) => dispatch => {
    todo.completedTime = new Date().getTime();
    let batch = db.batch();
    batch.delete(profilesCollection.doc(auth.currentUser.uid).collection('todos').doc(todo.id));
    batch.set(profilesCollection.doc(auth.currentUser.uid).collection('completedTodos').doc(todo.id), todo);
    batch.commit()
        .then(() => {
            dispatch(fetchTodos(todo.category));
            dispatch(fetchCompletedTodos(todo.category));
        })
        .catch(error => {
            dispatch(setMessage({message: `Error completing todo: ${error.message}`, status: 'danger', opened: false}));
        });
};

export const uncompleteTodo = todo => dispatch => {
    delete todo['completedTime'];
    let batch = db.batch();
    batch.delete(profilesCollection.doc(auth.currentUser.uid).collection('completedTodos').doc(todo.id.trim()));
    batch.set(profilesCollection.doc(auth.currentUser.uid).collection('todos').doc(todo.id.trim()), todo);
    batch.commit()
        .then(() => {
            dispatch(fetchTodos(todo.category));
            dispatch(fetchCompletedTodos(todo.category));
        })
        .catch(error => {
            dispatch(setMessage({message: `Error renewing todo: ${error.message}`, status: 'danger', opened: false}));
        });
};

export const deleteCategory = id => dispatch => {
    profilesCollection.doc(auth.currentUser.uid).collection('categories').doc(id).delete()
        .then(() => {
            dispatch(fetchCategories());
        })
        .catch(error => {
            dispatch(setMessage({message: `Error deleting category: ${error.message}`, status: 'danger', opened: false}));
        });
};

export const deleteTodo = todo => dispatch => {
    profilesCollection.doc(auth.currentUser.uid).collection('todos').doc(todo.id).delete()
        .then(() => {
            dispatch(fetchTodos(todo.category));
        })
        .catch(error => {
            dispatch(setMessage({message: `Error deleting todo: ${error.message}`, status: 'danger', opened: false}));
        });
};