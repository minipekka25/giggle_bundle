import React, { Component } from 'react'
import './Createworkspace.css'
import "@lottiefiles/lottie-player";
import logo from './logo.svg'
import google from './google.svg'
import { Picker } from "emoji-mart";
import axios from "axios";
import loadinglottie from './loading_lottie.json'
import {Link} from "react-router-dom"

export default class Createworkspace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputval:'',
            emoji:'😎',
            emojipicker:false,
            loading:false,
            buttontext:'Submit',
            next:false,
            workspace_id:''
        };
    }

    sendreq() {
        this.setState({loading:true})
        let k = { "workspace_name": this.state.inputval,
    "emoji":this.state.emoji }
        var config = {
            withCredentials: true
        };
        axios.post('/api/create/workspace', k, config)
            .then((response) => {

                this.setState({ loading: false, workspace_id:response.data._id, next:true })
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false })
            });
    }

    emojipicker(){
        this.setState({emojipicker:!this.state.emojipicker})
    }

    emojiselector(emoji){
        this.setState({emoji:emoji.native})
        this.setState({ emojipicker: !this.state.emojipicker })
    }

    render() {
        return (
            <div className='get_Started_main'>
                <div className='get_Started_flex'>
                    <div className='signup_anime'>  <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="https://assets7.lottiefiles.com/packages/lf20_ZQhQzO.json"
                        style={{ "width": "850px" }}
                    >
                    </lottie-player></div>
                    <div className='signup_side'>
                        <div className='signup_title'>
                            <img className='main_logo' src={logo} />Giggle
                    </div>
                        <div className='signup_text'>
                           Create New Workspace
                    </div>
        <div className='input_flex_channel_create'><button className='button_emoji_channel_create' onClick={()=>this.emojipicker()}>{this.state.emoji}</button><input className='channel_name_input' value={this.state.inputval} onChange={(e)=>this.setState({inputval:e.target.value})}></input></div>
                        <div>
                            {this.state.next ? <Link to={{ pathname: `/create/channel/${this.state.workspace_id}` }}> <button className='submit_button_onboard'>Next</button> </Link>: <button className='submit_button_onboard' onClick={() => this.sendreq()}>
                                {this.state.loading ? <lottie-player
                                    autoplay
                                    loop
                                    mode="normal"
                                    src="https://api.jsonbin.io/b/5f5330004d8ce411138921e0"
                                    style={{ "height": "50px" }}
                                >
                                </lottie-player> : 'Submit'}

                            </button>}
                           </div> {this.state.emojipicker ? <Picker
                            style={{
                                position: "absolute",
                                bottom: "30px",
                                right: "600px",
                                border: "0px",
                            }}
                            onSelect={(emoji) => this.emojiselector(emoji)}
                            title={"Pick emojis here.."}
                            theme={"dark"}
                            sheetSize={64}
                            perLine={8}
                            className='test'
                        />: null}
                        
                    </div>
                   

                </div>

            </div>
        )
    }
}
