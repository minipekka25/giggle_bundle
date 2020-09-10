import React from 'react';
import Modal from 'react-modal';
import './modal.css';
import add from './add.svg'
import { Picker } from "emoji-mart";
import axios from "axios";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#1e2126',
        border: 'dashed 1px white',
        borderRadius: '10px'
    }
};


Modal.setAppElement('#root')

export default function Createchannel(props) {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [emojiIsOpen, emojiIsOpen1] = React.useState(false);
    const [emoji, emojipicker] = React.useState('🐱‍💻');
    const [inputval, handlechange] = React.useState('');
    const [type, typechange] = React.useState('channel');
    const [directavailable, directset] = React.useState([]);
    const [directchosen, directvalue] = React.useState('');


    function openModal() {
        setIsOpen(true);
        getdirectslot()
    }
    function openEmoji() {
        emojiIsOpen1(!emojiIsOpen)
    }
    function emojiselector(e) {
        emojipicker(e.native)
        openEmoji()
    }
    function closeModal() {
        setIsOpen(false);
        handlechange('')
    }

    function directchange(val){
        console.log(val.target.value)
        directvalue(val.target.value)
    }

    function createchannel() {
        axios({
            method: 'post',
            url: `/api/create/channel/${props.ws_id}`,
            data: {
                channel_name: inputval,
                emoji:emoji
            },
            withCredentials: true
        }).then((res) => {
            props.channel_created(res.data)
            setIsOpen(false)
        }).catch((err)=>{
            props.channel_created('hi')
        })
    }

    function createdirect() {
        let k = directavailable.filter((i)=> i.googleId == directchosen)
        let b = k[0]
        if(directchosen == ''){
            b = directavailable[0]
        }
        axios({
            method: 'post',
            url: `/api/create/direct/${props.ws_id}`,
            data: {
               googleId:b.googleId,
               hash:b.hash
            },
            withCredentials: true
        }).then((res) => {
            props.channel_created(res.data)
            setIsOpen(false)
        })
    }

    function refreshPage() {
        window.location.reload(false);
    }

    function getdirectslot() {
        axios({
            method: 'GET',
            url: `/api/get/directslot/${props.ws_id}`,
            withCredentials: true
        }).then((res) => {
            if (res.data.length == 1){
                directvalue(res.data[0].googleId)
            }
            directset(res.data)
        })
    }



    return (
        <div className='modal_cont'>
            <button className="add_task_button_channel" onClick={openModal}><img className='task_add' src={add} /></button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >



                <div className='modal_head'>Create a New Chat</div>
                <div>
                    <select  className='channel_select_create' onChange={(e)=>typechange(e.target.value)} value={type}>
                        <option className='channel_select_options' value="channel">Channel</option>
                        <option className='channel_select_options' value="direct">Direct</option>
                    </select> 
                </div>
            

                {type == 'channel' ?<div>
                    <button onClick={() => openEmoji()} className='modal_emoji_btn'>{emoji}</button>
                    {emojiIsOpen ? <div><Picker
                        style={{

                            bottom: "0px",
                            right: "0px",
                            border: "0px",
                        }}
                        onSelect={(emoji) => emojiselector(emoji)}
                        title={"Pick emojis here.."}
                        theme={"dark"}
                        sheetSize={64}
                        perLine={8}
                        className='test'
                    /></div> : null} <input className='modal_input' value={inputval} onChange={(e) => handlechange(e.target.value)} placeholder='Channel Name' />
                </div>
                    : 
                    <select className='channel_select_create' onChange={(e) => directchange(e)} disabled={ directavailable.length == 0 ? true : false }>
                        {directavailable.length != 0 && directavailable[0] != null && directavailable.map((i) => { return i !== null && <option value={i != null && i.googleId}>{i != null && i.name}</option> })} 
                 </select> } 

                <div><button className='create_task_btn' onClick={() => { type == 'channel' ? createchannel() : createdirect()}}>Create</button></div>


            </Modal>
        </div>
    );
}