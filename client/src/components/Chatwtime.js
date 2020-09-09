import React, { Component } from 'react'
import './Chatelement.css'
import { Button } from 'react-bootstrap'
import Optionschat from './Optionschat'

export default class Chatwtime extends Component {
   
    state={
        options:false
    }

    showoptions =()=>{
        this.setState({options:true})
    }

    hideoptions = () => {
        this.setState({ options: false })
    }

    render() {
        return (
            <div className='chat_block_with_time' onMouseEnter={() => this.showoptions(true)}
                onMouseLeave={() => this.hideoptions(false)}>
                    <div className="chat_wtime_flex">
                    <div className="chat_time">{this.state.options ? '12:30' : <div style={{'color':'white'}}>12:30</div> }</div>
                        <div className="chat_text_with_time">hello everyone hello <br />
                        everyonehelloeveryonehello everyonehello everyonehello everyonesdfdsfdsfds
                      
                        everyonehelloeveryonehello everyonehello everyonehello everyonesdfdsfdsfds
                      
                        everyonehelloeveryonehello everyonehello everyonehello everyonesdfdsfdsfds
                        </div>
                    </div>
                {this.state.options ? <Optionschat /> : null }
               
            </div>
        )
    }
}
