import React from 'react';
import {connect} from "react-redux";
import {
    changeTodoTitleAC,
    changeTaskAC,
    setTaskInCurrentTodolistAC, changeFilterValueAC, deleteTodolistThunk, changeTodolistTitleThunk, getTasksThunk,
    addTasksThunk, deleteTaskThunk, changeTaskThunk
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
       this.props.setTasks(this.props.id,this.props.tasks)
    }

    deleteTodolist = (id) => {
        this.props.dellTodo(id)
    }
    updateTodoTitle = (id, title) => {
        this.props.updateTodolistTitleServer(id, title)
    }
    changeTodoTitle = (id, title) => {
        this.props.updateTodolistTitleLocal(id, title)
    }
    addNewTask = (newTask) => {
        this.props.addTaskInTodolist(this.props.id,newTask)
    }

    deleteTask = (idTodo, taskId) => {
        this.props.deleteTask(idTodo, taskId)
    }

    changeTaskInTodolist = (idTodo, taskId, task) => {
      this.props.setTaskInCurrentTodoServer(idTodo, taskId, task)
    }
    updateTaskInTodolist = (idTodo, idTask, newTitleTask) => {
        this.props.updateTaskLocal(idTodo, idTask, newTitleTask);
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
        setTasks(idTodolist,tasks) {
            dispatch(getTasksThunk(idTodolist,tasks))
        },
        dellTodo(id){
            dispatch(deleteTodolistThunk(id))
        },
        updateTodolistTitleServer(idTodo, title){
            dispatch(changeTodolistTitleThunk(idTodo, title))
        },
        updateTodolistTitleLocal(idTodo, title){
            dispatch(changeTodoTitleAC(idTodo, title))
        },

        addTaskInTodolist(todoId, task){
            dispatch(addTasksThunk(todoId, task))
        },
        deleteTask(todoId, taskId){
            dispatch(deleteTaskThunk(todoId, taskId))
        },
        updateTaskLocal(idTodo, idTask, title){
            dispatch(changeTaskAC(idTodo, idTask, title))
        },
        setTaskInCurrentTodoServer(idTodo, idTask, task){
            dispatch(changeTaskThunk(idTodo, idTask, task))
        },
        changeFilter(filter){
            dispatch(changeFilterValueAC(filter))
        },


    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(Todolist);
export default ConnectedApp;