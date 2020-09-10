import React, { Component } from 'react'
import Modal from 'react-modal';
import search from './search.svg';
import axios from "axios";
import notfound from './not_found.gif'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#12171d',
        borderRadius: '10px',
        border:'0px',
        filter:'drop-shadow(0px 3px 5px #121315d0)'
    }
};



export default class Searchmodal extends Component {

    state = {
        modal:false,
        search:'',
        results:[],
        loading:false
    }

    openmodal(){
        this.setState({modal:true})
    }

    closemodal() {
        this.setState({ modal: false })
    }


    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({modal:true})
            this.searchnow()
        }
    }

    handlechange(e){
        this.setState({search:e.target.value})
    }

    searchnow(){
        this.setState({loading:true})
        axios({
            method: 'GET',
            url: `/api/search/messages/${this.props.collname}/${this.props.schema}/${this.props.ws_id}/${this.state.search}`,
            withCredentials: true
        }).then((res) => {
           this.setState({results:res.data,loading:false})
        }).catch((err)=>{
            this.setState({ loading: false })
        })
    }

    elementrender(data){
        return ( 
            <div className='chatelement_flex'>
                <div>
                    <img className='chat_element_profile' src={data.created_by.profile_pic} />
                </div>
                <div className='chat_message_main'>

                    <div className='profile_name_chat'>{data.created_by.nickName + ' ' + data.created_by.status}</div>
                    <div className='profile_msg_chat'>{data.message}</div>
                    {/* {this.elementcreator(this.props.data)} */}
                    {/* <div className='profile_msg_chat'><SmartGallery images={images} /></div> 
                         <div className='profile_msg_chat'>{this.props.data && ReactHtmlParser(this.markdown && this.markdown.render(this.props.data.message))}</div>  */}
                    {/* <Optionschat/> */}
                </div>
                </div>
            )
    }

    render() {
        return (
            <div>
                <div className='search_box'>
                    <img className="search_side_icon" src={search} />
                    <input className='search_bar_side' onKeyPress={(e) => this.handleKeyPress(e)} value={this.state.search} onChange={(e)=>this.handlechange(e)} placeholder="Search chat..."></input>
                </div>
                <Modal
                    isOpen={this.state.modal}
                    onRequestClose={()=>this.closemodal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                >



                    <div className='modal_head_search'>Search Results</div>
                    {this.state.loading ? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : null}
                    <div>
                        {this.state.results.length != 0 && 
                        this.state.results.map((i)=> this.elementrender(i))}
                        {this.state.results.length == 0 ? <img className='not_found_search' src={notfound} /> : null}
                    </div>


               
                </Modal>
            </div>
        )
    }
}
