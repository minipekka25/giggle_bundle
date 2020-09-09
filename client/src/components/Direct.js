import React, { Component } from "react";
import "./main.css";
import profile from "./profile_user.jpg";
import appicon from "./app.svg";
import axios from "axios";
import { Link, NavLink } from "react-router-dom"
import Sidecontainer3 from './sidebar/Sidecontainer3'
import Sidecontainer2 from './sidebar/Sidecontainer2'
import Sidecontainer1 from './sidebar/Sidecontainer1'
import search from './search.svg'
import Chatheader from "./sidebar/chatbox/Chatheader";
import Inputbox from "./sidebar/chatbox/Inputbox";
import Chatarea from "./sidebar/chatbox/Chatarea";
import Rigthbarprofile from "./sidebar/rightbar/Rigthbarprofile";
import Todolist from "./sidebar/rightbar/Todolist";
import Sharedpic from "./sidebar/rightbar/Sharedpic";
import socket from './socket'
import Createchannel from "./createchannels";
import add from './add.svg'
import logo from './logo.svg'
import Searchmodal from "./Searchmodal";

export default class Direct extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "/admin_tree",
      channels: [],
      directs: [],
        messages:[],
      profile_pic: '',
      loading: false,
      todo: [],
      newMessage: '',
      allrecentmsg: [],
      nickName: '',
      orgs:[],status:''
    };
  }

  componentWillMount() {
    axios.get('http://localhost:5000/api/authenticated', { withCredentials: true })
      .then((response) => {
        if (response.data == 'failed') {
          this.props.history.push('/getstarted')
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `http://localhost:5000/api/get/workspace/appdata/${this.props.match.params.ws_id}`,
        { withCredentials: true }
      )
      .then((res) => {
        this.setallrecentmessages(res.data)
        this.setState({ nickName: res.data.nickName, profile_pic: res.data.profile_pic, online: true, todo: res.data.todo, status: res.data.status, googleId: res.data.googleId })
      });
    axios.get(`http://localhost:5000/api/get/workspace/directmessage/${this.props.match.params.ws_id}/${this.props.match.params.dm_id}`,
      {withCredentials:true} )
      .then((res)=>{
          this.setmessages(res.data)
      })

    axios.get('http://localhost:5000/api/get/workspaceslist', { withCredentials: true })
      .then((response) => {
        this.setState({ orgs: response.data.workspaces })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updatemessages() {
    axios.get(`http://localhost:5000/api/get/workspace/directmessage/${this.props.match.params.ws_id}/${this.props.match.params.dm_id}`,
      { withCredentials: true })
      .then((res) => {
        this.setmessages(res.data)
      })

    this.setState({ newMessage: '' })
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.dm_id !== prevProps.match.params.dm_id) {
      this.updatemessages()

    };
  };

  setmessages = (data) =>{
      this.setState({messages:data})
  }

  todo_update(data) {
    socket.emit('todo_updated', data.todo)
  }

  todo_deleted(data) {
    socket.emit('todo_deleted', data)
  }

  

  setallrecentmessages = (data) => {
    let channels = data.channels
    let directs = data.directs

    let channel_arr = []
    let direct_arr = []

    channels.map((i) => {
      let k = {}
      k.members = i.members
      k.name = i.name
      k.latest_msg = i.latest_msg
      k.type = 'channel'
      k.id = i._id
      channel_arr.push(k)


    })

    directs.map((i) => {
      let g = {}
      g.latest_msg = i.latest_msg
      g.members = i.members
      let t = ''
      i.members.map((l) => {
        t = t + l.nickName + ','
      })
      let f = t.substr(0, t.length - 1)
      g.name = f
      g.type = 'direct'
      g.id = i._id
      g.hash = i.hash
      direct_arr.push(g)
    })

    this.setState({ channels: channel_arr, directs: direct_arr, loading: false })
    this.joinrooms()
  }

  

  
  joinrooms(){
    socket.on("connect", function () {
      console.log("connected to socket");
      this.setState({ online: true })

      socket.on("error", (data) => {
        console.log(data);
      });
    }.bind(this));
    socket.on("newMessage", (data) => {
      console.log(data);
    });

    socket.on("disconnect", function () {
      console.log("server disconnected");
      this.setState({ online: false })
    }.bind(this));

    socket.on("usercameonline", function (data) {
      console.log(data)
      this.setUseronline(data)

    }.bind(this))

    socket.on("userwentoffline", function (data) {
      console.log(data);
      this.setUseroffline(data)
    }.bind(this))

    socket.on("todo_updated", (data) => {
      this.setState({ todo: data })
    })

    socket.on("todo_deleted", (data) => {
      this.setState({ todo: data })
    })

    socket.on("status_changed", (data) => {
      console.log(data)
      this.setState({ status: data })
    })

    socket.on("created_channel", (data) => {
      this.refreshPage()
    })
    
    socket.emit("joinroom", { workspace_id: this.props.match.params.ws_id })
    let full_arr = this.state.channels.concat(this.state.directs)
    full_arr.map((i) => {
      let k = this.props.match.params.ws_id + '&' + i.id
      socket.on(k, (data) => {
        this.setnewmessages(data)
        this.setlatestmsg(data)
        console.log('new msg listened by' + i.name + data.message);
      });
    })
  }

  setonline() {
    this.setState({ online: true })
  }

  setoffline() {
    this.setState({ online: false })
  }

 

  setUseronline(data) {
    let directs = this.state.directs
    directs.map((i) => {
      i.members.map((j) => {
        if (j.googleId == data) {
          j.online = true
        }
      })
    })
    this.setState({ directs: directs })
  }

  setUseroffline(data) {
    let directs = this.state.directs
    directs.map((i) => {
      i.members.map((j) => {
        if (j.googleId == data) {
          j.online = false
        }
      })
    })
    this.setState({ directs: directs })
  }

  setnewmessages(data) {
    
    if (data.current == this.props.match.params.dm_id){
      let b = this.state.messages
      b.push(data.msg)
      this.setState({ messages: b })
    }
   
  }

  setlatestmsg(data) {
    let channels = this.state.channels
    let directs = this.state.directs
    let arr = channels.concat(directs)
    let id = data.id.split('&')
    let block = arr.filter((i) => i.id == id[1])
    block[0].latest_msg = { msg: data.msg.message, time: data.msg.updatedAt }
    if (block[0].type == 'channel') {
      let filtered = channels.filter((i) => i.id != id[1])
      filtered.push(block[0])
      this.setState({ channels: filtered })
    }else {
      let filtered = directs.filter((i) => i.id != id[1])
      filtered.push(block[0])
      this.setState({ directs: filtered })
    } 

  }

  headercreator() {
    let data = this.state.directs.filter((i) => i.id == this.props.match.params.dm_id)
    return data[0]
  }

  collnamefinder(){
    if (this.state.directs.length >= 1){
      let data = this.state.directs.filter((i) => i.id == this.props.match.params.dm_id)
      return data[0].hash
    }
    
  }

  chatelementselector(data) {

    let pathtype = data.type

    if (data.members.length == 1) {
      return (
        <NavLink to={{ pathname: `/app/${this.props.match.params.ws_id}/${pathtype}/${data.id}` }} activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}>
          <Sidecontainer1 data={data} />
        </NavLink>
      )
    } if (data.members.length == 2) {
      return (
        <Link to={{ pathname: `/app/${this.props.match.params.ws_id}/${pathtype}/${data.id}` }}>
          <Sidecontainer2 data={data} />
        </Link>
      )
    } if (data.members.length > 2) {

      return (
        <Link to={{ pathname: `/app/${this.props.match.params.ws_id}/${pathtype}/${data.id}` }}>
          <Sidecontainer3 data={data} />
        </Link>
      )
    }
  }

  newmsg = (data,type) => {
    this.sendmessage(data,type)
  }

 
  sendmessage(msg, type) {
    socket.emit("sendmsgtoroom", { roomid: this.props.match.params.ws_id + '&' + this.props.match.params.dm_id, msg: msg, ws_id: this.props.match.params.ws_id, coll_name: this.props.match.params.dm_id, type: 'direct', msg_type: type });
  }

  currenthash(data) {
    let a = this.state.directs.filter((i)=> i.id == data)
    return a[0].hash
  }


  mentions() {
    if (this.state.directs.length != 0) {
      let current = this.state.directs.filter((i) => i.id == this.props.match.params.dm_id)
      return current[0].members
    }

  }

  statuschange(data, ws) {

    let k = { workspace_id: ws, status: data.native }
    var config = {
      withCredentials: true
    };
    axios.post('http://localhost:5000/api/change/status', k, config)
      .then((response) => {
        socket.emit('status_changed', response.data.status)

      })
      .catch((error) => {
        console.log(error);
      });


  }

  refreshPage() {
    window.location.reload(false);
  }

  channel_created(data) {
    socket.emit('created_channel', data)
  }

  render() {
    return (
      <div className="maindiv">
        <div className="maincontainer">
          <div className="sidetray">
            <div>
              <img className="apps_logo" src={logo} />
            </div>

            <div className="felx_top">
    {this.state.orgs.length >= 1 && this.state.orgs.map((i) => <Link to={{ pathname: `/workspace/redirect/${i._id}` }}><span className="side_logo" >{i.emoji}</span></Link>)} 
              <Link to={{ pathname: "/create/workspace" }}>  <div className="add_workspace_div"><img className="add_workspace_logo" src={add} /></div></Link>
        
            </div>
          </div>
          <div className="sidebareeee">

            <div className="sidebar_fr invisible-scrollbar">
              <div>
                <div className='sidebar_top_sticky'>
                  {/* <div className='search_box'>
                    <img className="search_side_icon" src={search} />
                    <input className='search_bar_side' placeholder="Search chat..."></input>
                  </div> */}
                  <Searchmodal collname={'dm-' + this.collnamefinder()} ws_id={this.props.match.params.ws_id} schema={'direct'} />
                  <Createchannel ws_id={this.props.match.params.ws_id} channel_created={this.channel_created} />
                </div>

                {this.state.loading == false ? this.state.channels.map((item) => {
                  return this.chatelementselector(item)
                }) : null}
                {this.state.loading == false ? this.state.directs.map((item) => {
                  return this.chatelementselector(item)
                }) : null}


              </div>



            </div>
            <div className="shade"></div>
            <div className="shade_top"></div>
          </div>
          <div className="mainchat">
            <div className='chat_flexbox'>
              <Chatheader data={this.headercreator()} type={'direct'}/>
              <Chatarea data={this.state.messages} user={this.state.nickName} members={this.state.directs.filter((i) => i.id == this.props.match.params.dm_id)} />
              <Inputbox msg={this.newmsg}  members={this.state.directs} id={this.props.match.params.dm_id} />
            </div>

            {/* {this.state.messages.map((i) => { return <div>{i.message}</div> })}
                    <input onChange={(e) => this.handlechange(e)} value={this.state.newMessage}></input>
                    <button onClick={()=>this.sendmessage()}>send</button> */}
          </div>
          <div className="rightside">
            {/* {" "}
            {this.props.match.params.ws_id}
            <br></br>
            {this.props.match.params.ch_id} */}
            <Rigthbarprofile name={this.state.nickName} profile_pic={this.state.profile_pic} online={this.state.online} status={this.state.status} ws_id={this.props.match.params.ws_id} select={this.statuschange} />
            <Todolist data={this.state.todo} ws_id={this.props.match.params.ws_id} todo_update={this.todo_update} todo_deleted={this.todo_deleted}/>
            <Sharedpic data={this.state.messages} name={this.state.nickName}/> 
          </div>
        </div>
      </div>
    );
  }
}
