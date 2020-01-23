import React from 'react';


class AddItem extends React.Component {
    state = {
        title: ''
    }
    updateTitle = (e) => {
        this.setState({title: e.currentTarget.value})
    }

    render() {
        return (
            <div>
                <input value={this.state.title} onChange={this.updateTitle}/>
                <button disabled={this.state.title===''?true:false} onClick={() => {
                    this.props.addItem(this.state.title)
                    this.state.title = ''
                }}>ADD
                </button>
            </div>
        )
    }
}


export default AddItem;