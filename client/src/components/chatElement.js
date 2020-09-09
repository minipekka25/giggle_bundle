import React from 'react'
import star from "./star.svg"
import profile from "./profile_user.jpg";
import './Chatelement.css'
import Chatwtime from './Chatwtime'
import Chatwlogo from './Chatwlogo'


export default class chatElement extends React.Component {
    render() {
        return (
        
        <div>
                <Chatwlogo/>

                <Chatwlogo />            <Chatwlogo />
                <Chatwtime/>
                <Chatwtime />
                <Chatwtime />

        </div>
           
        )
    }
}