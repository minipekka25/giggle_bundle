import React, { Component } from "react";
//import "./home.css";
import send from "./enviar.svg";
import at from "./at.svg";
import emoji from "./emoji.svg";
import attach from "./attach.svg";
import write from "./edit.svg";
import profile from "./profile_user.jpg";
import appicon from "./app.svg";
import plus from "./add.svg";
import swap from "./sort.svg";
import star from "./star.svg";
import search from "./search.svg";
import thread from "./thread.svg";
import mentions from "./mail.svg";
import saved from "./bookmark.svg";
import files from "./stack.svg";
import draft from "./draft.svg";
import people from "./contact.svg";
import channels from "./broadcast.svg";
import dm from "./direct.svg";
import online from "./dot.svg";
import offline from "./dot_off.svg";
import { MentionsInput, Mention } from "react-mentions";
import defaultStyle from "./defaultStyle";
import ReactHtmlParser from "react-html-parser";
import ChatElement from './chatElement';

export default class home extends Component {
  state = {
    showdetails: false,
    showborder: false,
    showaddicon: false,
    value: "",
  };

  users = [
    {
      id: "walter/rrre",
      display: "Walter White",
    },
    {
      id: "jesse",
      display: "Jesse Pinkman",
    },
    {
      id: "gus",
      display: 'Gustavo "Gus" Fring',
    },
    {
      id: "saul",
      display: "Saul Goodman",
    },
    {
      id: "hank",
      display: "Hank Schrader",
    },
    {
      id: "skyler",
      display: "Skyler White",
    },
    {
      id: "mike",
      display: "Mike Ehrmantraut",
    },
    {
      id: "lydia",
      display: "Lydìã Rôdarté-Qüayle",
    },
  ];

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  showdetails = () => {
    this.setState({ showdetails: !this.state.showdetails });
  };

  add_icon_show = (val) => {
    this.setState({ showaddicon: val });
  };

  setIsShown = (val) => {
    this.setState({ showborder: val });
  };

  render() {
    return (
     
      <div
        className={
          this.state.showdetails
            ? "grid-container-with-details"
            : "grid-container-without-details"
        }
        >   
        <div className="org-bg">
          <div>
            {" "}
            <img className="app_icon" src={appicon} />{" "}
          </div>
          <div className="org_box">
            <img className="org_prof" src={profile} />
            <img className="org_prof" src={profile} />
            <div className="org_add_icon_cont">
              <div
                class={this.state.showaddicon ? "org_add_anim" : "org_add"}
                onMouseEnter={() => this.add_icon_show(true)}
                onMouseLeave={() => this.add_icon_show(false)}
              >
                <img className="org_add_icon" src={plus} />
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="side">
            <div className="side_head">
              <div className="workspace_container">
                <img className="workspace_logo" src={profile} />
                <div>
                  <div className="worspace_name"> Design Team</div>
                  <div className="profile_name"> Aravind</div>
                </div>
                <div className="swap">
                  <img className="swap_logo" src={write} />
                </div>
              </div>
            </div>

            <div className="side_toolbar">
              <div className="tools-container">
                <div className="tools">
                  <span>
                    <img className="tools_logo" src={thread} />
                  </span>
                  Threads
                </div>
                <div className="tools">
                  <span>
                    <img className="tools_logo" src={mentions} />
                  </span>
                  Mentions & Reactions
                </div>
                <div className="tools">
                  <span>
                    <img className="tools_logo" src={draft} />
                  </span>
                  Drafts
                </div>
                <div className="tools tools_selected">
                  <span>
                    <img className="tools_logo" src={saved} />
                  </span>
                  Saved Items
                </div>
                <div className="tools">
                  <span>
                    <img className="tools_logo" src={people} />
                  </span>
                  People & User groups
                </div>
                <div className="tools">
                  <span>
                    <img className="tools_logo" src={files} />
                  </span>
                  File Browser
                </div>
              </div>
            </div>

            <div className="channels_bar">
              <div className="channels_container">
                <div className="channels_area">
                  <div className="channels_header">
                    <span>
                      <img className="channels_logo" src={channels} />
                    </span>
                    Channels
                    <img className="add_channel" src={plus} />
                  </div>
                  <div className="channels"> #general</div>
                  <div className="channels selected_option">#random</div>
                  <div className="channels"> #team</div>
                </div>
                <div className="dm_area">
                  <div className="dm_header">
                    <span>
                      <img className="channels_logo" src={dm} />
                    </span>
                    Direct Messages
                    <img className="add_channel" src={plus} />
                  </div>
                  <div className="dm">
                    <span>
                      <img className="online_logo" src={online} />
                    </span>
                    Aravind
                  </div>
                  <div className="dm  selected_option">
                    <span>
                      <img className="online_logo" src={online} />
                    </span>
                    Ari
                  </div>
                  <div className="dm">
                    <span>
                      <img className="online_logo" src={offline} />
                    </span>
                    sgs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainbanner">
          <div className="mainbannerinner">
            <div className="banner_left">
              <div className="star_cont">
                <button className="star_button">
                  {" "}
                  <img className="star" src={star} />
                </button>
              </div>
              <div className="header">
                <div className="channel_name"># hello</div>
                <div className="profil">
                  <div
                    class={
                      this.state.showborder
                        ? "border_with_anim"
                        : "border_without_anim"
                    }
                    onMouseEnter={() => this.setIsShown(true)}
                    onMouseLeave={() => this.setIsShown(false)}
                  >
                    <img className="borde" src={profile} />
                  </div>
                  <div className="member_no"> +3 </div>
                  <span className="divider">|</span>
                  <div className="channel_topic">
                    Non-work banter and water cooler conversation
                  </div>
                </div>
              </div>
            </div>

            <div className="ban">
              <button className="search_button">
                Search <img className="search_icon" src={search} />
              </button>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="man">
            <div className="boxi">
              <div className="chat_window_main">
                            <ChatElement />
              </div>
              <div className="bodr">
                <form class="InputAddOn">
                  <div className="bbbg">
                    <MentionsInput
                      value={this.state.value}
                      onChange={this.handleChange}
                      style={defaultStyle}
                      placeholder={"Mention people using '@'"}
                      allowSuggestionsAboveCursor={true}
                    >
                      <Mention
                        trigger="@"
                        data={this.users}
                        renderSuggestion={(
                          suggestion,
                          search,
                          highlightedDisplay
                        ) => <div className="user">{highlightedDisplay}</div>}
                      />
                      <Mention
                        trigger="#"
                        data={this.users}
                        renderSuggestion={(
                          suggestion,
                          search,
                          highlightedDisplay
                        ) => <div className="user">{highlightedDisplay}</div>}
                      />
                    </MentionsInput>

                    <div className="InputAddOn-item-cont">
                      <button
                        class="InputAddOn-item2"
                        onClick={() => this.showdetails()}
                      >
                        <img className="sendlogo" src={at} />
                      </button>
                      <button
                        class="InputAddOn-item2"
                        onClick={() => this.showdetails()}
                      >
                        <img className="sendlogo" src={emoji} />
                      </button>
                      <button
                        class="InputAddOn-item2"
                        onClick={() => this.showdetails()}
                      >
                        <img className="sendlogo" src={attach} />
                      </button>{" "}
                      |
                      <button
                        class="InputAddOn-item"
                        onClick={() => this.showdetails()}
                      >
                        <img className="sendlogo" src={send} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="det ">
          <div className="det1">
            <button className="minus" onClick={() => this.showdetails()}>
              |
            </button>{" "}
          </div>
        </div>

        <div className="bod"></div>
      </div>
    );
  }
}

