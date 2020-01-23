import React from 'react';
import {connect} from "react-redux";
import {
    addTaskAC,
    changeTodoTitleAC,
    deleteTodolist,
    setTasksAC,
    setTodolistAC,
    deleteTaskAc,
    changeTaskAC,
    setTaskInCurrentTodolistAC, changeFilterValueAC, deleteTodolistThunk, changeTodolistTitleThunk
} from "./reducer";
import TodolistsTitle from "./TodolistsTitle";
import axios from "axios/index";
import ShowTasks from "./ShowTasks";
import AddItem from "./AddItem";
import Footer from "./Footer";
import {tasksAPI, todoAPI} from "./api/api";


class Todolist extends React.Component {
    componentDidMount() {
        this._restoreState()
    }

    _restoreState = () => {
        return tasksAPI.getTasks(this.props.id).then(response => {
            this.props.setTasks(this.props.id, response.data.items)
        }).catch(() => {
            console.log('Error get all todolists tasks');
        })
    }
    addNewTask = (newTask) => {
        return tasksAPI.addTask(this.props.id, newTask).then(response => {
            this.props.addTaskInTodolist(this.props.id, response.data)
        }).catch(() => {
            console.log('Error add task in todolist');
        })
    }

    deleteTodolist = (id) => {
        this.props.dellTodo(id)
    }
    updateTodoTitle = (id, title) => {
        this.props.updateTodolistTitle(id, title)
    }
    changeTodoTitle = (id, title) => {
        this.props.updateTodolistTitleLocal(id, title)
    }

    deleteTask = (idTodo, taskId) => {
        return tasksAPI.deleteTask(idTodo, taskId).then(response => {
            this.props.deleteTask(idTodo, taskId)
        }).catch(() => {
            console.log('Error delete tasks');
        })
    }
    changeTaskInTodolist = (idTodo, taskId, task) => {
        return tasksAPI.updateTask(idTodo, taskId, task).then(response => {
            this.props.setTaskInCurrentTodo(idTodo, taskId, response.data)
        }).catch(() => {
            console.log('Error delete tasks');
        })
    }
    updateTaskInTodolist = (idTodo, idTask, newTitleTask) => {
        this.props.updateTask(idTodo, idTask, newTitleTask);
    }
    changeFilterValue = (newFilterValue) => {
        this.props.changeFilter(newFilterValue.currentTarget.value)
    }

    render() {
        return (
            <div className="TodoList">
                <TodolistsTitle changeTodoTitle={this.changeTodoTitle} updateTodoTitle={this.updateTodoTitle}
                                idTodo={this.props.id} deleteTodolist={this.deleteTodolist} title={this.props.title}/>
                <AddItem addItem={this.addNewTask}/>
                <ShowTasks changeStatus={this.changeStatus} changeTaskInTodolist={this.changeTaskInTodolist}
                           updateTaskInTodolist={this.updateTaskInTodolist} deleteTask={this.deleteTask}
                           idTodo={this.props.id} tasks={this.props.tasks.filter(t => {
                    if (this.props.filterValue === "All") {
                        return true
                    } else if (this.props.filterValue === "Completed") {
                        return t.status === 2;
                    } else if (this.props.filterValue === "Active") {
                        return t.status === 1;
                    } else {
                        return t.status === 0
                    }
                })}/>
                <Footer filterValue={this.props.filterValue} changeFilterValue={this.changeFilterValue}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
        filterValue: state.filterValue
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setTasks(todoId, tasks) {
            dispatch(setTasksAC(todoId, tasks))
        },
        dellTodo(id){
            dispatch(deleteTodolistThunk(id))
        },
        updateTodolistTitle(idTodo, title){
            dispatch(changeTodolistTitleThunk(idTodo, title))
        },
        updateTodolistTitleLocal(idTodo, title){
            dispatch(changeTodoTitleAC(idTodo, title))
        },

        addTaskInTodolist(todoId, task){
            dispatch(addTaskAC(todoId, task))
        },
        deleteTask(todoId, taskId){
            dispatch(deleteTaskAc(todoId, taskId))
        },
        updateTask(idTodo, idTask, title){
            dispatch(changeTaskAC(idTodo, idTask, title))
        },
        setTaskInCurrentTodo(idTodo, idTask, task){
            dispatch(setTaskInCurrentTodolistAC(idTodo, idTask, task))
        },
        changeFilter(filter){
            dispatch(changeFilterValueAC(filter))
        },


    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(Todolist);
export default ConnectedApp;