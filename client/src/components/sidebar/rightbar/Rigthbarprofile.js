import React, { Component } from 'react'
import './Rightbarprofile.css'
import { Picker } from "emoji-mart";
import axios from "axios";

export default class Rigthbarprofile extends Component {
    state={
        emojipicker:false,
        emoji: '🥱'
    }

    emojiselector(data){
        this.props.select(data,this.props.ws_id)
    }

    

    emojipicker(){
        this.setState({emojipicker:!this.state.emojipicker})
    }

    componentDidMount(){
        if(this.props.status){
            this.setState({ emoji: this.props.status })
        }
    }

    render() {
        return (
            <div className='right_profile'>
                <div> <img className='chat_element_profile' src={this.props.profile_pic} /><span className="profile_online"><svg height='10' width='10'>
                    <circle cx="5" cy="5" r="4" fill={this.props.online ? "#34ca3b" : "#f44336"} />
                </svg></span></div> 
                <div>
                    <div className='profile_name_right'>{this.props.name && this.props.name.length > 8 ? this.props.name.substr(0,8)+'..' : this.props.name}</div>
                    <div className = 'profile_role_right'>UI Developer</div> 
                </div>
        <div className='profile_status' onClick={()=> this.emojipicker()}>{this.props.status}</div>
                {this.state.emojipicker ? <Picker
                    style={{
                        position: "absolute",
                        top: "90px",
                        right: "10px",
                        border: "0px",
                    }}
                    onSelect={(emoji) => this.emojiselector(emoji)}
                    title={"Pick emojis here.."}
                    theme={"dark"}
                    sheetSize={64}
                    perLine={8}
                    className='test'
                /> : null}     
            </div>
        )
    }
}
