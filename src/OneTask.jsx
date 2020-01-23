import React from 'react';


class OneTask extends React.Component {
    state = {
        isVisible: false,
        priority: ['Low', 'Middle', 'Hi','Urgently','Later']
    }
    setChangeTask = () => {
        this.props.changeTaskInTodolist(this.props.idTodo, this.props.idTask, this.props.task)
        this.setState({isVisible: false})
    }
    updateTaskInTodolist = (e) => {
        let priority;
        switch (e.currentTarget[1].value){
            case "Low":priority=0;break;
            case "Middle":priority=1;break;
            case "Hi":priority=2;break;
            case "Urgently":priority=3;break;
            case "Later":priority=4;break;
            default:priority=5;break;
        }

        let newTask = {
            title: e.currentTarget[0].value,
            priority: priority
        }
        this.props.updateTaskInTodolist(this.props.idTodo, this.props.idTask, newTask)
    }
    changeStatus = (e) => {
        let value;
        if (e.currentTarget.checked) {
            value = 2;
        } else {
            value = 1;
        }
        let task={...this.props.task,status:value}
        this.props.changeTaskInTodolist(this.props.idTodo, this.props.idTask, task)

    }

    render() {
        let priority;
        switch (this.props.task.priority){
            case 0:priority="Low";break;
            case 1:priority="Middle";break;
            case 2:priority="Hi";break;
            case 3:priority="Urgently";break;
            case 4:priority="Later";break;
            default:priority='Server error';break;
        }
        return (
            <div className="OneTask">
                {this.state.isVisible ?
                    <div>
                        <form onChange={this.updateTaskInTodolist} className="form">
                            Title: <input autoFocus={true}  value={this.props.task.title}/>
                            <select value={priority}>{this.state.priority.map((priority, idx) => <option key={idx}>{priority}</option>)}</select>
                            <button onClick={this.setChangeTask}>EDIT</button>
                        </form>
                    </div> :

                    <div onDoubleClick={() => this.setState({isVisible: true})}><input checked={this.props.task.status === 2 ? true : false} onChange={this.changeStatus}
                        type="checkbox"/>Title: {this.props.task.title + " "}
                        Priority: {priority}
                        <button onClick={() => this.props.deleteTask(this.props.idTodo, this.props.idTask)}>x</button>
                    </div>

                }
            </div>
        )
    }
}


export default OneTask;