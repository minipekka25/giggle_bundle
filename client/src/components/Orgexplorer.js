import React, { Component } from 'react'
import axios from "axios";
import {Link,Redirect} from "react-router-dom"
import './orgexplorer.css'
import logo from './logo.svg'
import no_wrps from './orgexp_nowrp.png'
import "@lottiefiles/lottie-player";
import arrow from './arrow.svg'

export default class Orgexplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgnames: [],
            workspace_id:'',
            channel_id:'',
            redirect:false

        };
    }

    componentDidMount(){
        this.getOrgdetails()
    }

    inputchange(e) {
        this.setState({ value: e.target.value })
    }

  

    getOrgdetails() {

        axios.get('https://giggle2.herokuapp.com/api/get/workspaceslist', { withCredentials: true })
            .then( (response) => {
               this.setdata(response)
            })
            .catch( (error) => {
                console.log(error);
            });


    }
    setdata(response) {
        this.setState({ orgnames: response.data.workspaces })
    }
    
    

   

    render() {
        return (
            <div className='orgexp_main'>
                <div className='signup_title_orgexp'>
                    <img className='main_logo_orgexp' src={logo} />Giggle
                    </div>
              <div className='orgexplorer_flex'>
<div className='create_workspace'>
                        <div className='orgexp_title'> Try Giggle with your team, for free </div>
                        <div className='orgexp_cont'> Create a brand-new workspace for you and your team. </div>  
                        <div><Link to={{ pathname: "/create/workspace" }}><button className='orgexp_button'> Create A New Workspace </button></Link></div>
</div>
<div className='join_workspace'>
                        <div className='orgexp_title'> Is your team already using Giggle ? </div>  
                        <div className='orgexp_cont'> Find and sign in to your team’s existing workspace. </div> 
                        <div><Link to={{ pathname: "/joinorg/search/new" }}><button className='orgexp_button'> Join Existing workspace </button></Link></div> 
</div>
              </div>
<div className='orgexp_list_main'>
                    <div className='orgexp_list_inner'>
                        {this.state.orgnames.length != 0 && this.state.orgnames.map((i) => { return <Link to={{ pathname: `/workspace/redirect/${i._id}` }}><div className='orgexp_list_item'>😎 {i.name}<img className='orgexp_arrow' src={arrow} /></div></Link> })} 
                    </div>
   </div>
                {/* orgnames
                { this.state.orgnames.length !=0 && this.state.orgnames.map((i) => {return <div onClick={()=>{this.fetchdata(i._id)}}>{i.name}</div>})} */}
                {/* <div>  <img className='no_wrps' src={no_wrps} /></div> */}
         <div className='orgexp_nowrp_anime'>
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="https://assets7.lottiefiles.com/packages/lf20_ZQhQzO.json"
                        style={{ "width": "750px" }}
                    >
                    </lottie-player>
             </div>     
    
            </div>

        );
    }
}

