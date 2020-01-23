import {todoAPI} from "./api/api";
const SET_TODOLIST = "SET_TODOLIST";
const ADD_TODOLIST = "ADD_TODOLIST";
const DELL_TODOLIST = "DELL_TODOLIST";
const CHANGE_TODO_TITLE = "CHANGE_TODO_TITLE";


const SET_TASKS = "SET_TASKS";
const ADD_TASK = "ADD_TASK";
const DELL_TASK = "DELL_TASK";
const CHANGE_TASK = "CHANGE_TASK_TITLE";
const SET_TASK_IN_CURRENT_TODOLIST = "SET_TASK_IN_CURRENT_TODOLIST";

const CHANGE_FILTER = "CHANGE_FILTER";


let initialState = {
    todolists: [],
    filterValue: 'All'
}

let reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOLIST: {
            return {
                ...state,
                todolists: action.nextTodo.map(tl => {
                    return {...tl, tasks: []}
                })
            }
        }
        case SET_TASKS: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {...tl, tasks: [...action.tasks]}
                    } else return tl
                })
            }
        }
        case ADD_TODOLIST: {
            return {
                ...state,
                todolists: [...state.todolists, {...action.newTodolist, tasks: []}]
            }
        }
        case DELL_TODOLIST: {
            return {
                ...state,
                todolists: state.todolists.filter(t => {
                    return t.id !== action.idTodo
                })
            }
        }
        case CHANGE_TODO_TITLE: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.idTodo) {
                        return {...tl, title: action.title}
                    } else return tl
                })
            }
        }

        case ADD_TASK: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl,
                            tasks: [...tl.tasks, {...action.task.data.item}]
                        }
                    } else return tl
                })

            }
        }

        case DELL_TASK: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => {
                                return t.id !== action.taskId
                            })
                        }
                    }
                    return tl
                })
            }
        }

        case CHANGE_TASK: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl,
                            tasks: [...tl.tasks.map(task => {
                                if (task.id === action.taskId) {
                                    return {
                                        ...task, ...action.task
                                    }
                                }
                                return task
                            })]
                        }
                    } else return tl
                })
            }
        }
        case SET_TASK_IN_CURRENT_TODOLIST: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl,
                            tasks: [...tl.tasks.map(task => {
                                if (task.id === action.taskId) {
                                    return {
                                        ...action.task.data.item
                                    }
                                }
                                return task
                            })]
                        }
                    } else return tl
                })
            }
        }

        case CHANGE_FILTER: {
            return {
                ...state,
                filterValue: action.filter
            }
        }


        default:
            return state
    }
}


export const setTodolistAC = (nextTodo) => ({type: SET_TODOLIST, nextTodo})
export const addTodolistAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist});
export const deleteTodolist = (idTodo) => ({type: DELL_TODOLIST, idTodo});
export const changeTodoTitleAC = (idTodo, title) => ({type: CHANGE_TODO_TITLE, idTodo, title});


export const setTasksAC = (todoId, tasks) => ({type: SET_TASKS, todoId, tasks});
export const addTaskAC = (todoId, task) => ({type: ADD_TASK, todoId, task});
export const deleteTaskAc = (todoId, taskId) => ({type: DELL_TASK, todoId, taskId});
export const changeTaskAC = (todoId, taskId, task) => ({type: CHANGE_TASK, todoId, taskId, task});
export const setTaskInCurrentTodolistAC = (todoId, taskId, task) => ({
    type: SET_TASK_IN_CURRENT_TODOLIST,
    todoId,
    taskId,
    task
});

export const changeFilterValueAC = (filter) => ({type: CHANGE_FILTER, filter});


export const setTodolistThunk = () => {
    return async (dispatch) => {
      await todoAPI.getTodolist().then(response => {
            if (response.statusText === "OK") {
                dispatch(setTodolistAC(response.data))
            } else  console.log('Error set todolist');
        })
    }
}

export const addTodolistThunk = (newTodoTitle) => {
    return async (dispatch) => {
        await todoAPI.addTodolist(newTodoTitle).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC(response.data.data.item))
            } else  console.log('Error add todolist');
        })
    }
}

export const deleteTodolistThunk = (id) => {
    return async (dispatch) => {
       await todoAPI.deleteTodolist(id).then(response => {
            if (response.statusText === "OK") {
                dispatch(deleteTodolist(id))
            } else  console.log('Error delete todolist');
        })
    }
}

export const changeTodolistTitleThunk = (id, title) => {
    return async (dispatch) => {
       await todoAPI.updateTodolist(id, title);
    }
}




export default reducer;