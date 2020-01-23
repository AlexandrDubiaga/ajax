import React from 'react';
class TodolistsTitle extends React.Component {
    state = {
        isVisible: false
    }

    updateTodoTitle = (e) => {
        this.props.changeTodoTitle(this.props.idTodo, e.currentTarget.value)
    }
    setTodoTitle = () => {
        this.props.updateTodoTitle(this.props.idTodo, this.props.title)
        this.setState({isVisible: false})
    }

    render() {
        return (

            <div className="TodoTitle">
                {this.state.isVisible ?
                    <div ><input
                        onChange={this.updateTodoTitle}
                        autoFocus={true}
                        onBlur={this.setTodoTitle} value={this.props.title}/></div>
                    : <div onDoubleClick={() => this.setState({isVisible: true})}>{this.props.title}
                        <button onClick={() => this.props.deleteTodolist(this.props.idTodo)}>x</button>
                    </div>
                }
            </div>
        )
    }
}

export default TodolistsTitle