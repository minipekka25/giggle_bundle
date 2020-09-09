import React, { Component } from 'react'
import './Createchannelonboard.css'
import { Picker } from "emoji-mart";
import axios from "axios";
import logo from './logo.svg'
import arrow from './arrow.svg'
import { Link } from "react-router-dom"
import socket from './socket'

export default class Searchorgs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgname: '',
            emoji: '😎',
            loading: false,
            next: false,
            inputval:'',
            orgid:''
        };
    }

    componentWillMount(){
        axios.get('http://localhost:5000/api/authenticated', { withCredentials: true })
            .then((response) => {
                if (response.data == 'failed') {
                    this.props.history.push('/getstarted')
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {      
        if (this.props.match.params.ws_id != 'new') {
            this.setState({ inputval: this.props.match.params.ws_id })
        }
    }

    getOrgdetails(data) {
        axios.get(`http://localhost:5000/api/get/orgname/${data}`, { withCredentials: true })
            .then((response) => {
                if (response.data.length >= 1) {
                    let foundorg = response.data[0]
                    this.setState({ orgname: foundorg.name, emoji: foundorg.emoji, orgid: foundorg._id })
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    sendreq() {
        if (this.state.orgid != '123' && this.state.orgid != ''){
            this.setState({ loading: true })
            let k = { "workspace_id": this.state.orgid }
            var config = {
                withCredentials: true
            };
            axios.post('http://localhost:5000/api/join/workspace', k, config)
                .then((response) => {
                    this.setState({ loading: false, next: true })
                    socket.emit('created_channel', 'new channel created')
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ loading: false })
                });
        }else{
            alert('No workspace to join 😣')
            this.setState({ loading: false })
        }
        
    }


    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.getOrgdetails(this.state.inputval)
        }
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
                    <div>
                            <input className='org_id_input' value={this.state.inputval} onKeyPress={(e) => this.handleKeyPress(e)} onChange={(e) => this.setState({ inputval: e.target.value })}></input>
                    </div>
                        {this.state.orgname != '' ? <div className='orgexp_list_item'>{this.state.emoji + ' '}{this.state.orgname}<img className='orgexp_arrow' src={arrow} /></div> : null}  
                        <div>
                            {this.state.next ? <Link to={{ pathname: `/workspace/redirect/${this.state.orgid}` }}> <button className='submit_button_onboard'>Enter</button> </Link> : <button className='submit_button_onboard' onClick={() => this.sendreq()}>
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
