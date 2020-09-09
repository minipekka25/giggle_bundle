import React, { Component } from 'react'
import './Todolist.css'
import Modal1 from '../../modal'
import axios from "axios";

export default class Todolist extends Component {

    deleteTask(data) {
    axios({
        method: 'post',
        url: `/delete/task/${this.props.ws_id}`,
        data: {
            task:data
        },
        withCredentials: true
    }).then((res) => {
        this.props.todo_deleted(res.data.todo)
    })
}

    render() {
        return (
            <div className='todo_main'>
                <div className='todo_heading'>To-Do Lists</div>
                {this.props.data.length >= 1 && this.props.data.map((i)=>{
                    return <div className='Todo_container' onClick={() => this.deleteTask(i.task)}>
                    <div className='todo_item'>{i.task}</div>
                <div className='todo_icons'>{i.emoji}</div>
                </div>
                })}
                <div className='Todo_container'>
                    <Modal1 ws_id={this.props.ws_id} todo_update={this.props.todo_update}/>
                </div>
               
            </div>
          
        )
    }
}
