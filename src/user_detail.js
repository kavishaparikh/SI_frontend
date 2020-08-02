import React, { Component } from 'react'
import './node_detail.css'
import axios from "axios";
import { Redirect } from 'react-router';

export default class user_detail extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            
            redirect:'',
            name:"",
            email_id:"",
            pass:"",
            phone_no:"",
            sub:true
            
        }
    }
    onClickHandler = () => {
       
        const userdetail ={
            name:this.state.name,
            email_id:this.state.email_id,
            pass:this.state.pass,
            phone_no:this.state.phone_no,
            }
        // console.log(userdetail);
        axios.post("http://localhost:9000/adduserdetails",{
            name:this.state.name,
            email_id:this.state.email_id,
            pass:this.state.pass,
            phone_no:this.state.phone_no,
            })
            .then((res) => {
                
                // console.log("details added");

            });
            
            this.setState({
                redirect:true,
            })
        
    };

    onChange=(e)=> {
        var tname=e.target.name;
        let obj={};
        obj[tname] = e.target.value
        // console.log(obj);
        this.setState(obj);
        
        if(this.state.name==="" || this.state.email_id===""|| this.state.pass===""|| this.state.phone_no==="")
        {
            this.setState({sub:true});
            // console.log(this.state)
            document.getElementById("sub").disabled=true;
        }
        else
        {
            this.setState({sub:false});
            // console.log("false")
            document.getElementById("sub").disabled=false;
        }
      }
      
     
    render() {
        
        if (this.state.redirect) {
            console.log(this);
            return <Redirect to = {{pathname:'/addNode:id',id:this.state.email_id}}/>
        }
          
        return (
            <div>
            <div className="main1" ></div>
            <div className="adjustsize1"> </div>
            <div d="details"className="nodebox">
                <form  autocomplete="off" onSubmitted>
                    <h1> User Details</h1>
                    <p> Enter Name</p>
                    <input  onChange={this.onChange } type="text" name="name" placeholder="Full Name"  id="name" required/>
                    <p>Enter Email-ID</p>
                    <input  onChange={this.onChange } type="email" name="email_id" placeholder="xyz@gmail.com"  id="email_id" required/>
                    <p>Enter Password</p>
                    <input  onChange={this.onChange } type="password" name="pass" placeholder="Password"  id="pass" required/>
                    <p> Enter Phone Number</p>
                    <input  onChange={this.onChange } type="text" name="phone_no" placeholder="Phone Number"  id="phone_no" required/>
                    
                       <br/> 
                       <br/>
                    <button type="button" id="sub" disabled={this.state.sub}
                    onClick={this.onClickHandler}>Submit</button>
                </form>
            </div>
            </div>            
           
        )
    }
}
