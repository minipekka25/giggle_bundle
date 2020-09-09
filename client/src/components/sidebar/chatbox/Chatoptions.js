import React, { Component } from 'react'
import './Chatoptions.css'

export default class Chatoptions extends Component {
    render() {
        return (
            <div className='chat_options_panel'>
              <div className='panel_base'>
                    <div className='chat_options_items'>😃 React</div>
                    <div className='chat_options_items'>💬 Reply</div>
                    <div className='chat_options_items'>💾 save</div>
                    <div className='chat_options_items'>🖊 edit</div>
                    <div className='chat_options_items'>🗑 Delete</div>
              </div>
            </div>
        )
    }
}
