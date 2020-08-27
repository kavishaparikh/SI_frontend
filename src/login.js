import React,  { Component } from "react";
import './login.css';
import axios from "axios"
import { Redirect } from 'react-router';

export default class Login extends Component {

        constructor(){
            super();
            localStorage.removeItem("username");
            this.state={
                data:[],
                redirect: '',
                username:'',
                password:'',
                errormsg : ''
            };
            this.handleChange=this.handleChange.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
        }

handleSubmit=(e)=>{
    console.log(this.state.username);
    console.log(this.state.password);
    e.preventDefault();
    var th = this;
    localStorage.setItem("username",this.state.username);
    // this.state.redirect=true;
    this.serverRequest = axios.get("http://localhost:9000/user_list")
    .then(function(res){
        th.setState({
            data:res.data
        });
        // console.log(th);
    })
    // console.log(this.state.data);

    ////////////Comparision for valid email ID////////////////
    this.state.data.map(user =>{
        // console.log(this.state.username);
        console.log("mail : "+ user.email_id);
        if(user.email_id == this.state.username && user.password == this.state.password)
        {
            console.log("Valid");
            this.setState({
                redirect:'/',
            })
        }
        else{
            console.log("Invalid");
            // alert("Invalid Username or Password..!!!");
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
    // console.log(this);


}
    render(){
// console.log(this);


      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
return(

       <form onSubmit={this.handleSubmit}>
            <div className="loginbox">
                {/* <img src="user1.jpg" className="user" / > */}
                <h1> Login Pannel</h1>
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
