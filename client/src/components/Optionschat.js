import React, { Component } from 'react'
import './Chatelement.css'
import emoji from "./emoji.svg";
import thread from "./thread.svg";
import saved from "./bookmark.svg";
import pin from "./pin.svg";



export default class Optionschat extends Component {
    render() {
        return (
            <div className="options_cont">
                <div className='options_buttons_holder'>
                    <button className="options_buttons"><img className="options_icons" src={emoji} /></button>
                    <button className="options_buttons"><img className="options_icons" src={thread} /></button>
                    <button className="options_buttons"><img className="options_icons" src={saved} /></button>
                    <button className="options_buttons"><img className="options_icons" src={pin} /></button>
                </div>

            </div>
        )
    }
}
