import React, { Component } from 'react'
import './Sharedpic.css'

export default class Sharedpic extends Component {

    typefinder(data) {
        let obj = JSON.parse(data.message)
        let k = obj.s3locationArray.length
        let l = 0
        var fully_image = null
        obj.s3locationArray.map((i) => {
            l++
            let h = i.split('.')
            if (h[h.length - 1] != 'jpg' && h[h.length - 1] != 'jpeg' && h[h.length - 1] != 'png' && h[h.length - 1] != 'svg') { fully_image = false }
        })

        if (l == k && fully_image == null) {
            return true
        } else if (l == k && fully_image == false) {
            return false
        }
    }

    elementcreator(data,name){
        let messages = data
        let files = messages.length >= 1 && messages.filter((j)=>j.type == 'file' && j.created_by.nickName == name)
        let links =[]
        let l = files.length
        let k  = 0
        files.length >= 1 && files.map((i)=>{
            let obj = JSON.parse(i.message)
            links = links.concat(obj.s3locationArray)
            k++
        })
        let b = links.length
        let g = 0
        let img_arr = []
        console.log(links)
        if(k==l){
         links.length >=1 &&links.map((j)=>{
             let h = j.split('.')
             if (h[h.length - 1] == 'jpg' || h[h.length - 1] == 'jpeg' || h[h.length - 1] == 'png' || h[h.length - 1] == 'svg') { img_arr.push(j) }
            g++
            })
        }
        if(b==g){
            console.log('jjj',img_arr)
            return (img_arr.map((n) => <img className='shared_photos_image' src={n} onClick={() => window.open(n)}/>))
        }


    }



    

    render() {
        return (
            
            <div className='shared_pic_main'>
                <div className='shared_photos_heading'>Shared Photos</div>
                <div className='shared_images'> 
                    {this.elementcreator(this.props.data, this.props.name)}
                    {/* <img className='shared_photos_image' src="https://www.fillmurray.com/50/50" />
                    <img className='shared_photos_image' src="https://www.fillmurray.com/50/50" />
                    <img className='shared_photos_image' src="https://www.fillmurray.com/50/50" />
                    <img className='shared_photos_image' src="https://www.fillmurray.com/50/50" /> */}
                </div>
            
            </div>
        )
    }
}
