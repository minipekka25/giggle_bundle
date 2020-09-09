// import React, { Component } from 'react'
// import {Remarkable} from 'remarkable'
// import ReactHtmlParser from 'react-html-parser'; 
// import './editor.css'
// import { MentionsInput, Mention } from 'react-mentions'
// import axios from "axios";

// import {Form,InputGroup,Button,FormControl} from 'react-bootstrap'


// const MY_BLOG_POST = `plain text...
// # h6 Heading
// `

// // export default class editor extends Component {

// //      autoExpand = function (field) {

// //     // Reset field height
// //     field.style.height = 'inherit';

// //     // Get the computed styles for the element
// //     var computed = window.getComputedStyle(field);

// //     // Calculate the height
// //     var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
// //         + parseInt(computed.getPropertyValue('padding-top'), 10)
// //         + field.scrollHeight
// //         + parseInt(computed.getPropertyValue('padding-bottom'), 10)
// //         + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

// //     field.style.height = height + 'px';

// // };



// //     componentWillMount() {
// //         this.markdown = new Remarkable()
// //     }

// //     render() {
// //         return (
// //             <div>
// //                 <textarea></textarea>
// //                 <div style={{ color: 'white' }}>{ReactHtmlParser(this.markdown && this.markdown.render(MY_BLOG_POST))}</div>     
// //                 <div style={{ color: 'white' }}> <p><strong>Solution with span:</strong> <span class="textarea" role="textbox" contenteditable></span></p></div>
// //             </div>,
// //             document.addEventListener('input', function (event) {
// //                 if (event.target.tagName.toLowerCase() !== 'textarea') return;
// //                 this.autoExpand(event.target);
// //             }, false)
// //         )
// //     }
// // }

// export default class editor extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: "",
//             rows: 5,
//             minRows: 5,
//             maxRows: 10,
       
//         };
//     }
 
// inputchange(e){
// this.setState({value:e.target.value})
// }

// sendfetch(){
//     const data = { "org_name": this.state.value };

//     axios.get('/', { withCredentials: true })
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });

   
// }
//     render() {
//         return (
//            <div>
//                 <Form inline>
//                     <Form.Label htmlFor="inlineFormInputName2" srOnly>
//                         Name
//   </Form.Label>
//                     <Form.Control
//                         className="mb-2 mr-sm-2"
//                         id="inlineFormInputName2"
//                         placeholder="Jane Doe"
//                         onChange={(e)=>this.inputchange(e)}
//                     />
                  
//                     <Button type="submit" className="mb-2" onClick={()=>this.sendfetch()}>
//                         Submit
//   </Button>
//                 </Form>
//            </div>
//         );
//     }
// }


import React, { Component } from 'react';
import axios from 'axios';

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000'

class editor extends Component {constructor( props ) {
  super( props );
  this.state = {
   selectedFile: null,
   selectedFiles: null
  }
 }singleFileChangedHandler = ( event ) => {
  this.setState({
   selectedFile: event.target.files[0]
  });
 };multipleFileChangedHandler = (event) => {
  this.setState({
   selectedFiles: event.target.files
  });
  console.log( event.target.files );
 };singleFileUploadHandler = (  ) => {
  const data = new FormData();// If file selected
  if ( this.state.selectedFile ) {data.append( 'photos', this.state.selectedFile, this.state.selectedFile.name );axios.post( '/upload', data, {
    headers: {
     'Content-Type': 'multipart/form-data'
      }, onUploadProgress: (progress)=>{
          let r = Math.round((progress.loaded * 100)/ progress.total)
          console.log(r)
      },withCredentials: true 
   })
    .then( ( response ) => {if ( 200 === response.status ) {
      // If file size is larger than expected.
      if( response.data.error ) {
       if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
   
       } else {
        console.log( response.data );// If not the given file type
       
       }
      } else {
       // Success
       let fileName = response.data;
       console.log( 'fileName', fileName );
            }
     }
    }).catch( ( error ) => {
    // If another error
  console.log(error)
   });
  } else {
   // if file not selected throw error
  // this.ocShowAlert( 'Please upload file', 'red' );
  }};multipleFileUploadHandler = () => {
  const data = new FormData();let selectedFiles = this.state.selectedFiles;// If file selected
  if ( selectedFiles ) {
   for ( let i = 0; i < selectedFiles.length; i++ ) {
       data.append( 'photos', selectedFiles[ i ], selectedFiles[ i ].name );
      } axios.post( '/upload', data, {
    headers: {
     'Content-Type': 'multipart/form-data',
          }, onUploadProgress: (progress) => {
              let r = Math.round((progress.loaded * 100) / progress.total)
              console.log(r)
          }
   })
    .then( ( response ) => {
     console.log( 'res', response );if ( 200 === response.status ) {
      // If file size is larger than expected.
      if( response.data.error ) {
       if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
        this.ocShowAlert( 'Max size: 2MB', 'red' );
       } else if ( 'LIMIT_UNEXPECTED_FILE' === response.data.error.code ){
        this.ocShowAlert( 'Max 4 images allowed', 'red' );
       } else {
        // If not the given ile type
        this.ocShowAlert( response.data.error, 'red' );
       }
      } else {
       // Success
       let fileName = response.data;
       console.log( 'fileName', fileName );
      }
     }
    }).catch( ( error ) => {
    // If another error

   });
  } else {
   // if file not selected throw error
 
  }};// ShowAlert Function
 
  render() {
  return(
   <div>
    <div className="container">
     {/* For Alert box*/}
     <div id="oc-alert-container"></div>{/* Single File Upload*/}
     <div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
      <div className="card-header">
       <h3 style={{ color: '#555', marginLeft: '12px' }}>Single Image Upload</h3>
       <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
      </div>
      <div className="card-body">
       <p className="card-text">Please upload an image for your profile</p>
       <input type="file" onChange={this.singleFileChangedHandler}/>
       <div className="mt-5">
        <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload!</button>
       </div>
      </div>
     </div>{/* Multiple File Upload */}
     <div className="card border-light mb-3" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
      <div className="card-header">
       <h3 style={{ color: '#555', marginLeft: '12px' }}>Upload Muliple Images</h3>
       <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 400px x 400px ( Max 2MB )</p>
      </div>
      <div className="card-body">
       <p className="card-text">Please upload the Gallery Images for your gallery</p>
       <input type="file" multiple onChange={this.multipleFileChangedHandler}/>
       <div className="mt-5">
        <button className="btn btn-info" onClick={this.multipleFileUploadHandler}>Upload!</button>
       </div>
      </div>
     </div></div>
   </div>
  );
 }
}export default editor;