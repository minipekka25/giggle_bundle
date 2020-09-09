import React, { Component } from "react";
import "./Inputbox.css";
import upload from "../../photo.svg";
import mentions from "../../contact.svg";
import send from "../../send.svg";
import Uploadhandler from "./Upload";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { MentionsInput, Mention } from 'react-mentions'
import defaultMentionStyle from './defaultStyle'



export default class Inputbox extends Component {
  state = {
    newmsg: "",
    modal: false,
    emoji:false
  };
  handlechange(e) {
    this.setState({ newmsg: e.target.value });
  }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendmsg()
        }
    }

  sendmsg() {
    this.props.msg(this.state.newmsg, "text");
    this.setState({ newmsg: "" });
  }
  modalchange() {
    let now = this.state.modal;
    this.setState({ modal: !now });
  }

  showemoji() {
      let emo = this.state.emoji
      this.setState({emoji: !emo})
  }

  emojipicker(emoji) {
    let prev_txt = this.state.newmsg;
    this.setState({ newmsg: prev_txt + emoji.native });
  }

  mentionsdata(){

      let current = this.props.members.length != 0 && this.props.members.filter((i)=> i.id == this.props.id)
      let data = []
      if (current.length >= 1){
          current[0].members.map((i) => {
          let g = {}
          g.id = i._id
          g.display = i.nickName
          data.push(g)
      })

      }
   
        return data
  }

  render() {
    return (
      <div className="input_contain">
           
        <div className="input_tools">
                <MentionsInput className="chat_msg_input_box"
                    singleLine
                    value={this.state.newmsg}
                    onChange={(e) => {
                        this.handlechange(e)
                    }
                } onKeyPress={(e)=>this.handleKeyPress(e)}
                    style={defaultMentionStyle}
                    placeholder={"Type something ..."}
                >
                    <Mention data={this.mentionsdata()} onAdd={(e) => console.log(e)} style={defaultMentionStyle} />
                </MentionsInput>
          {/* <input
            className="chat_msg_input_box"
            placeholder="Type something..."
            value={this.state.newmsg}
            onChange={(e) => {
              this.handlechange(e);
            }}
          /> */}
          <button
            className="chat_msg_upload"
            onClick={() => this.modalchange()}
          >
            <img className="upload_icon" src={upload} />
          </button>
                <button className="chat_msg_todo" onClick={() => this.showemoji()}>
            {" "}
            <img className="upload_icon" src={mentions} />
          </button>
          {this.state.modal ? (
            <Uploadhandler upload={this.props.msg} closeit={this.closeit} />
          ) : null}
          <button
            className="chat_msg_send"
            onClick={() => {
              this.sendmsg();
            }}
          >
            {" "}
            <img className="upload_icon" src={send} />
          </button>
                {this.state.emoji ? <div className="upload_cont">
                    <Picker
                        style={{
                            position: "absolute",
                            bottom: "0px",
                            right: "0px",
                            border: "0px",
                        }}
                        onSelect={(emoji) => this.emojipicker(emoji)}
                        title={"Pick emojis here.."}
                        theme={"dark"}
                        sheetSize={64}
                        perLine={8}
                    />
                </div> : null} 
        </div>
      </div>
    );
  }
}
