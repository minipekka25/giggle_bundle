import React, { Component } from 'react'
import './Chatelement.css'
import options from '../../more.svg'
import Chatoptions from './Chatoptions'
import { Remarkable } from 'remarkable'
import ReactHtmlParser from 'react-html-parser';
import SmartGallery from 'react-smart-gallery';
import Filelement from './Filelement'



export default class Chatelement extends Component {


     componentWillMount() {
        this.markdown = new Remarkable()
     }

    typefinder(data) {
    let obj = JSON.parse(data.message)
    let k = obj.s3locationArray.length
    let l = 0
    var fully_image = null
    obj.s3locationArray.map((i) => {
        l++
        let h = i.split('.')
        console.log(h[h.length - 1])
        if (h[h.length - 1] != 'jpg' && h[h.length - 1] != 'jpeg' && h[h.length - 1] != 'png') { fully_image = false }
    })

    if (l == k && fully_image == null) {
        return true
    } else if (l == k && fully_image == false) {
        return false
    }

}

     elementcreator (data) {
         if(data.type == 'file'){

             if (this.typefinder(data) == false){
                 let obj = JSON.parse(data.message)
                 return <div className='profile_msg_chat'>{obj.s3locationArray.map((i) => {return <Filelement data={i} />})}</div> 
             } else if (this.typefinder(data) == true){
                 let obj = JSON.parse(data.message)
                 return <div className='profile_msg_chat'><SmartGallery images={obj.s3locationArray} rootStyle={{ boxShadow: '0px 0px 6px #000', borderRadius:'5px' }} width={250} height={250} onImageSelect={(event, src) => window.open(src)}/></div>
             }
         }else if(data.type=='text'){
             return <div className='profile_msg_chat'>{data && ReactHtmlParser(this.markdown && this.markdown.render(data.message))}</div> 
         }
    
     }

    render() {
        return (
          
            <div >
                <div className='chatelement_flex'>
                    <div>
                        <img className='chat_element_profile' src={this.props.data.created_by && this.props.data.created_by.profile_pic} /><span className="profile_online"><svg height='10' width='10'>
                            <circle cx="5" cy="5" r="4" fill={this.props.members.length >= 1 && this.props.members[0].online ? "#34ca3b" : "#f44336"} />
                        </svg></span>
                    </div>
                    <div className='chat_message_main'>
                       
                        <div className='profile_name_chat'>{this.props.data.created_by && this.props.data.created_by.nickName == this.props.user ? 'You ' + this.props.data.created_by.status : this.props.data.created_by.nickName +' '+ this.props.data.created_by.status }</div>
                        {this.elementcreator(this.props.data)}
                         {/* <div className='profile_msg_chat'><SmartGallery images={images} /></div> 
                         <div className='profile_msg_chat'>{this.props.data && ReactHtmlParser(this.markdown && this.markdown.render(this.props.data.message))}</div>  */}
                        {/* <Optionschat/> */}
                    </div>
                    {/* <div className='options_container'>
                        <div className='options_box'>
                        <img className='options_chat' src={options} />
                    </div>
                       
</div> */}
                    

                </div>
            
            </div>
        )
    }
}
