import React, { Component } from 'react'

export default class Organisation extends Component {


    render() {
       // console.log(this.props.location.orgname)
        return (
            <div>
                hello{false ? this.props.location : 'holy duck ! get out of here soon'}<br></br>
                {this.props.match.params.ws_id}<br></br>
                {this.props.match.params.ch_id}
            </div>
        )
    }
}
