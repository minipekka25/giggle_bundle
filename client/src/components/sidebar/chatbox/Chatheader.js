import React, { Component } from 'react'
import "./Chatheader.css"
import add from "../../add.svg"

export default class Chatheader extends Component {
    render() {
        return (
            <div className='header_chat_box'>
                <div className="header_chat"><span className="header_emoji">🎉</span>{this.props.data && this.props.data.name.toUpperCase()}</div>
                <div className="header_profiles">
                    <div className="avatars_prof">
                        {this.props.type == 'channel' ? <span className="avatar_prof">
                            <img src={add} className='prof_add' onClick={() => { navigator.clipboard.writeText(`Join My New Workspace in Giggle using this link https://${window.location.hostname}/joinorg/search/${this.props.ws_id}. 
                            If not a registered user use the code ${this.props.ws_id} to join the workspace`); alert('Join Link Copied to Clipboard') }} />
                        </span> :null }
                        
                      {this.props.data && this.props.data.members.map((i)=>{
                          return (<span className="avatar_prof">
                              <img src={i.profile_pic} />
                          </span>)
                      })}
</div>
                </div>
            </div>
        )
    }
}
