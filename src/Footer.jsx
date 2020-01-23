import React from 'react';



class Footer extends React.Component {
    render() {
        return (
            <div>
                <button className={this.props.filterValue==="All"?'All':''} onClick={this.props.changeFilterValue} value={"All"}>All</button>
                <button className={this.props.filterValue==="Completed"?'Completed':''} onClick={this.props.changeFilterValue} value={"Completed"}>Completed</button>
                <button className={this.props.filterValue==="Active"?'Active':''} onClick={this.props.changeFilterValue} value={"Active"}>Active</button>
                <button className={this.props.filterValue==="New"?'New':''} onClick={this.props.changeFilterValue} value={"New"}>New</button>
            </div>
        )
    }
}


export default Footer;