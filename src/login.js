import React,  { Component } from "react";
import './login.css';
import axios from "axios"
import { Redirect } from 'react-router';

export default class Login extends Component {

        constructor(){
            super();
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            this.state={
                data:[],
                redirect: '',
                username:'',
                password:'',
                errormsg : ''
            };
            this.handleChange=this.handleChange.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
            var th = this;
            this.serverRequest = axios.get("http://localhost:9000/user_list")
    .then(function(res){
        th.setState({
            data:res.data
        });
        
    })
        }

handleSubmit=(e)=>{
  
    e.preventDefault();
  
    
    
    ////////////Comparision for valid email ID////////////////
    this.state.data.map(user =>{
        
      
        if(user.email_id == this.state.username && user.password == this.state.password)
        {
            localStorage.setItem("username",this.state.username);
            localStorage.setItem("role",user.role);
          
            this.setState({
                redirect:'/',
            })
        }
        else{
          
          
            this.setState({
                errormsg : 'Invalid credentials'
            })
        }
    })
    
}


handleChange(e){
    const name=e.target.name;
    const value=e.target.value;

    this.setState({
        [name]:value
    });
   


}
    render(){



      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
return(

       <form onSubmit={this.handleSubmit}>
            <div className="loginbox">
                <center>
                <img src="logo.png" className="user" ></img>
                </center>
                <br/>
                    <p><i className="fa fa-user" aria-hidden="true"></i>   User Email</p>
                    <input type="text" onChange={this.handleChange} name="username" placeholder="Enter Email"  id="username"/>
                    <p> <i className="fa fa-key" ></i>   Password</p>
                    <input type="password" onChange={this.handleChange} name="password" placeholder="Enter password"  id="password"/>
                    <input type="submit" value="Login"/>
                    {this.state.errormsg}
            </div>
        </form>
        );
    }
}
