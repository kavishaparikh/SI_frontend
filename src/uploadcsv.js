import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import './uploadcsv.css'
import { Redirect } from 'react-router';
import Menu from './menu'
export default class uploadcsv extends Component {
    
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        name:props.location.id,
        redirect:''
      }
   
  }
  onChangeHandler=event=>{
    // console.log(event.target.files[0])

    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  
  

  onClickHandler = () => {
    
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("name",this.state.name);
    
    // console.log("heyyy");
    axios
      .post("http://localhost:9000/upload", data, {
        headers:{
          'Content-Type':'multipart/form-data'
        }
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        // console.log(res.statusText);
        this.setState({
          redirect:'/node_list',
        })
        // console.log(this);
      });

  };

  render() {
    if (!localStorage.getItem("username")) {
      return <Redirect to = {{pathname:'/login'}}/>
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    
    return (
      <div><Menu />
      <div className="wrapper">
        <center>
       
        <div className="container">
          <div >
            <form method="post" action="#" id="#">
              <div >
                <label>Upload Your File </label>
                <input
                  type="file"
                  name="file"
                  onChange={this.onChangeHandler}
                />
              </div>
              <button
                type="button"
                className="button"
                onClick={this.onClickHandler}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
        </center>
      </div>
      </div>
    );
  }
}
