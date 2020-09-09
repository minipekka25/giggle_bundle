import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Chatarea.css'
import Chatelement from './Chatelement'
export default class Chatarea extends Component {

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }
  }

    render() {
        return (
            <div className='chatarea'>
                <div className='shade_top_chat'> </div>
               
                <div >
                  {this.props.data && this.props.data.map((i)=>{
                    let members = this.props.members.length >= 1 && this.props.members[0].members
                    let found = members.length >= 1 && members.filter((j) => { return j.nickName == i.created_by.nickName }) 
                   return <Chatelement data = {i} user={this.props.user} members={found}/>
                  })}
                   



                </div>
                <div className='shade_bottom_chat'> </div>
      </div>
               
            
        )
    }
}
