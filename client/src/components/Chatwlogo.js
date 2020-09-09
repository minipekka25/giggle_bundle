import React, { Component } from 'react'
import './Chatelement.css'
import profile from "./profile_user.jpg";
import Optionschat from './Optionschat'


export default class Chatwlogo extends Component {

    state = {
        options: false
    }

    showoptions = () => {
        this.setState({ options: true })
    }

    hideoptions = () => {
        this.setState({ options: false })
    }

    render() {
        return (
            <div className='chat_block_with_logo' onMouseEnter={() => this.showoptions(true)}
                onMouseLeave={() => this.hideoptions(false)}>
                <div className="chat_block_flex">
                    <div><img className="chat_user_logo" src={profile} /></div>

                    <div className='chat_main'>
                        <div className="chat_user_name">SGS <span>12:30</span></div>
                        <div className="chat_text">hello everyone hello everyonehelloeveryonehello everyonehello hello everyone hello everyonehelloeveryonehello everyonehello everyonehello everyonesdfdsfdsfds
                    </div>
                    </div>

                </div>
                {this.state.options ? <Optionschat /> : null}
            </div>
        )
    }
}
