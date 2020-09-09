import React, { Component } from 'react'
import './Filelement.css'
import document from './document.svg'

export default class Filelement extends Component {

    Namecreator(data){
        let fileurl = decodeURIComponent(data)

       let y = fileurl.split('.')
       let ext = y[y.length-1]
        let namestr = y[y.length - 2]
        let arr = namestr.split('__--__')
        let fin = arr[0].split('/')
        let name = fin[1]

    return <div className='filename_div'>{name+'.'+ext}</div>
    }

    render() {
        return (
            <div className='file_contain' onClick={() => window.open(this.props.data)}>
                <img className='files_icon' src={document} />{this.Namecreator(this.props.data)}
            </div>
        )
    }
}
