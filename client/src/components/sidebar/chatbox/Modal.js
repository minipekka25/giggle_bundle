import React, { Component } from 'react'
import './Modal.css'
import Uploadhandler from './Upload'

export default class Modal extends Component {
    state ={
        open:false
    }

    render() {
        return (
            <div className='upload_cont'>
                <Uploadhandler/>
            </div>
        )
    }
}
