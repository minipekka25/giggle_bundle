import React, { Component } from 'react'
import './Workredirector.css'
import axios from "axios";
import { Link, Redirect } from "react-router-dom"

export default class Workredirector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workspace_id: '',
            channel_id: '',
            redirect: false
        };
    }

    componentDidMount(){
        this.fetchdata(this.props.match.params.ws_id)
    }

    fetchdata(data) {
        let k = { "workspace_id": data }
        var config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
        };
        axios.post('http://localhost:5000/api/get/workspace/channels', k, config)
            .then((response) => {
                // console.log(response.data.channels[0])
                this.redirectd(response, data)

            })
            .catch((error) => {
                console.log(error);
            });

    }



    redirectd(response, data) {
        this.setState({ workspace_id: data, channel_id: response.data.channels[0] })
        setTimeout(()=>{
            this.setState({ redirect: true })
        }, 2000)

    }

    render() {
        return (
            <div className='redirect_bg'>
                 {this.state.redirect && <Redirect to={{ pathname: `/app/${this.state.workspace_id}/channel/${this.state.channel_id}` }} />}   
                <div>Redirecting</div>
                
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}
