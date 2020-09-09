import React, { Component } from 'react'
import './Sidecontainer1.css'

export default class Sidecontainer1 extends Component {

    latest_msg_limiter(data,type) {
        if (type == 'file') {

            return 'New file...'
        } else {
            let txt = data
            let len = txt.length

            if (len > 17) {
                let g = txt.substr(0, 17)
                return g + '...'
            }
            return txt
        }

    }

    time_generator(ts) {
        var d = new Date();
        var nowTs = Math.floor(d.getTime() / 1000);
        var seconds = nowTs - ts;

        if (seconds > 2 * 24 * 3600) {
            return "2d";
        }
        if (seconds > 24 * 3600) {
            return "1d";
        }

        if (seconds > 3600) {
            return Math.floor(seconds / 3600) + "h";
        }
        if (seconds > 1800) {
            return Math.floor(seconds / 60) + "m";
        }
        if (seconds > 60) {
            return Math.floor(seconds / 60) + "m";
        }
        if (seconds < 60) {
            return "now";
        }
    }

    render() {
        return (
            <div className="side_element_1">
                <div className='boxs'>
                    <div className="avatars1">
                        <div className="avatarone_1">
                            <img src={this.props.data.members[0].profile_pic} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='channel_name_1'>{this.props.data.name}</div>
                    <div className='channel_msg_1'>{this.latest_msg_limiter(this.props.data.latest_msg.msg, this.props.data.latest_msg.type)}<span className='msg_time'><span className='time_dot'><svg height='8' width='8'>
                        <circle cx="5" cy="5" r="3" fill="#c3c4c5" />
                    </svg> </span>{this.time_generator(this.props.data.latest_msg.time)}</span></div>
                </div>
            </div>
        )
    }
}
