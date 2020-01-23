import React from 'react';
import './App.css';
import {connect} from "react-redux";
import axios from "axios";
import {addTodolistAC, setTodolistAC, addTodolistThunk, setTodolistThunk, deleteTodolistThunk} from "./reducer";
import Todolist from "./Todolist";
import AddItem from "./AddItem";
import {todoAPI} from "./api/api";


class App extends React.Component {


    componentDidMount() {
        this.restoreState();
    }


    restoreState = () => {
        this.props.setTodo();
    }

    addNewTodo=(newTodoTitle)=>{
        this.props.addTodo(newTodoTitle);
    }


    render = () => {
        let todolists = this.props.todolists.map(function (tl) {
            return <Todolist id={tl.id} title={tl.title} tasks={tl.tasks}/>
        })

        return (
            <>
            <div>
                <AddItem addItem={this.addNewTodo}/>
            </div>
            <div className="App">
                    {todolists}
            </div>
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setTodo() {
            dispatch(setTodolistThunk())
        },
        addTodo(newTodolist){
            dispatch(addTodolistThunk(newTodolist))
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

