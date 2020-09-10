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
        border:'dashed 1px white',
        borderRadius:'10px'
    }
};


Modal.setAppElement('#root')

export default function Modal1(props) {
   
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [emojiIsOpen, emojiIsOpen1] = React.useState(false);
    const [emoji, emojipicker] = React.useState('🐱‍💻');
    const [inputval, handlechange] = React.useState('');


    function openModal() {
        setIsOpen(true);
    }
    function openEmoji(){
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

    function createTask(){
        axios({
            method: 'post',
            url: `/api/create/task/${props.ws_id}`,
            data: {
                task:inputval,
                emoji:emoji
            },
             withCredentials: true 
        }).then((res) => {
               props.todo_update(res.data)
               setIsOpen(false)
            })
    }
    
    

    return (
        <div className='modal_cont'>
            <button className="add_task_button" onClick={openModal}><img className='task_add' src={add}/></button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                
               
                <div className='modal_head'>Add a new Task</div>
              
                    <input className='modal_input' value={inputval} onChange={(e)=>handlechange(e.target.value)} placeholder='Have Coffee'/>
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
                /></div>:null}
                   
                <div><button className='create_task_btn' onClick={()=> createTask()}>Create Task</button></div>  
                   
              
            </Modal>
        </div>
    );
}