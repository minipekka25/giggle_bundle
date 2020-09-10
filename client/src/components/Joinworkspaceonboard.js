import React, { Component } from 'react'
import './Createchannelonboard.css'
import { Picker } from "emoji-mart";
import axios from "axios";
import logo from './logo.svg'
import arrow from './arrow.svg'
import { Link } from "react-router-dom"

export default class Joinworkspaceonboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           orgname:'',
            emoji: '😎',
            loading: false,
            next: false
        };
    }

    componentDidMount(){
        this.getOrgdetails()
        
    }

    getOrgdetails() {
        axios.get(`/api/get/orgname/${this.props.match.params.ws_id}`, { withCredentials: true })
            .then((response) => {
                if(response.data.length >= 1){
                    let foundorg = response.data[0]
                    this.setState({ orgname: foundorg.name, emoji: foundorg.emoji })
                }
          
            })
            .catch((error) => {
                console.log(error);
            });
    }

    sendreq() {
        this.setState({ loading: true })
        let k = { "workspace_id": this.props.match.params.ws_id }
        var config = {
            withCredentials: true
        };
        axios.post('/api/create/joinmessage', k, config)
            .then((response) => {
                this.setState({ loading: false, next: true })
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false })
            });
    }

    emojipicker() {
        this.setState({ emojipicker: !this.state.emojipicker })
    }

    emojiselector(emoji) {
        this.setState({ emoji: emoji.native })
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
                        Join New Workspace
                    </div>
                        <div className='orgexp_list_item'>{this.state.emoji+' '}{this.state.orgname}<img className='orgexp_arrow' src={arrow} /></div>
                        <div>
                            {this.state.next ? <Link to={{ pathname: `/workspace/redirect/${this.props.match.params.ws_id}` }}> <button className='submit_button_onboard'>Enter</button> </Link> : <button className='submit_button_onboard' onClick={() => this.sendreq()}>
                            {this.state.loading ? <lottie-player
                                autoplay
                                loop
                                mode="normal"
                                src="https://api.jsonbin.io/b/5f5330004d8ce411138921e0"
                                style={{ "height": "50px" }}
                            >
                            </lottie-player> : 'Join Now'}
                            </button>}
                        </div> 

                    </div>


                </div>

            </div>
        )
    }
}
