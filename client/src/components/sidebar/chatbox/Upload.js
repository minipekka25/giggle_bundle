import React, { Component } from 'react'
import axios from 'axios';
import upload_img from './upload.png'
import { Line } from 'rc-progress';
import './Modal.css'
import ImageGallery from 'react-image-gallery';







export default class Uploadhandler extends Component {
    state = {
    selectedFiles: null,
    filesnumber:false,
    progress:0
}

    multipleFileChangedHandler = (event) => {
        console.log(event.target.files)
        this.setState({
            selectedFiles: event.target.files,
            filesnumber:true
        })
    }

    multipleFileUploadHandler = () => {
        
        const data = new FormData(); 
        let selectedFiles = this.state.selectedFiles;
        this.setState({
            filesnumber: false,
        })

        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                data.append('photos', selectedFiles[i], selectedFiles[i].name);
            } axios.post('http://localhost:5000/api/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }, onUploadProgress: (progress) => {
                    let uploadedprogress = Math.round((progress.loaded * 100) / progress.total)
                    this.setState({
                        progress: uploadedprogress
                    })
                    if(uploadedprogress == 100){
                        setTimeout(()=>{
                            this.setState({
                                progress:0
                            })
                           
                        },500)
                    }
                }
            })
                .then((response) => {
                    console.log('res', response); if (200 === response.status) {
                        if (response.data.error) {
                           
                        } else {                         
                            this.props.upload(JSON.stringify(response.data),'file')                       
                        }
                    }
                }).catch((error) => {
                console.log(error)
                });
            } 
    }



    render() {
        return (
            <div className='upload_cont'>
                <div>
                    <label htmlFor="filePicker" className='fileupload_box'>
                        <img htmlFor="filePicker" className='upload_img' src={upload_img} />
                    </label>
                    <input id="filePicker" multiple style={{ visibility: "hidden", width: '0px' }} type={"file"} onChange={this.multipleFileChangedHandler} />
                    <div className='upload_selected'> {this.state.filesnumber ? this.state.selectedFiles.length + ' loaded' : null}</div>
                    <button className="upload_button" onClick={this.multipleFileUploadHandler}>{this.state.progress != 0 ? this.state.progress + '% loaded' : 'Upload Now'}</button>

                    {this.state.progress != 0 ? <div className='progress_bar'>
                        <Line percent={this.state.progress} strokeWidth="2" strokeColor="#12171d" />
                    </div> : null}
                    
                  
                 
                </div>
            </div>
           
        )
    }
}
