import React, { Component } from 'react'
import './Getstarted.css'
import "@lottiefiles/lottie-player";
import logo from './logo.svg'
import google from './google.svg'
import { Link } from "react-router-dom"

export default class Getstarted extends Component {
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
                        Login to your account
                    </div>
                        <div><a href='/auth/google' ><button className='login_button'><img className='google_logo' src={google} />With Google</button></a></div>
                        <div className='register_text'>Don't have an account ? <a href='/auth/google' ><span className='sugnup_link'>Sign Up.</span></a></div>
                    </div>
                    
                  
                </div>
               
            </div>
        )
    }
}
