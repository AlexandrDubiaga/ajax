import React from 'react';
import {connect} from "react-redux";
import OneTask from "./OneTask";


class ShowTasks extends React.Component {
    render() {
        return (
            <div>
                {this.props.tasks.map(t => {
                    return <OneTask changeStatus={this.props.changeStatus} deleteTask={this.props.deleteTask} changeTaskInTodolist={this.props.changeTaskInTodolist}
                                    updateTaskInTodolist={this.props.updateTaskInTodolist} idTodo={this.props.idTodo}
                                    task={t} idTask={t.id}/>
                })}
            </div>
        )
    }
}


export default ShowTasks;