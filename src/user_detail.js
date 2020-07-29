import React, { Component } from 'react'
import './node_detail.css'
import axios from "axios";

export default class user_detail extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            
            redirect: false,
            name:"",
            email_id:"",
            pass:"",
            address:"",
            phone_no:"",
            sub:true
            
        }
    }
    onClickHandler = () => {
       

        
        const userdetail ={
            name:this.state.name,
            email_id:this.state.email_id,
            pass:this.state.pass,
            address:this.state.address,
            phone_no:this.state.phone_no,
            }
        console.log(userdetail);
        axios.post("http://localhost:9000/adduserdetails",{
            name:this.state.name,
            email_id:this.state.email_id,
            pass:this.state.pass,
            address:this.state.address,
            phone_no:this.state.phone_no,
            })
            .then((res) => {
                
                console.log("details added");
              });
            
        
    };

    onChange=(e)=> {
        var tname=e.target.name;
        let obj={};
        obj[tname] = e.target.value
        console.log(obj);
        this.setState(obj);
        
        if(this.state.name==="" || this.state.email_id===""|| this.state.pass===""|| this.state.address===""|| this.state.phone_no==="")
        {
            this.setState({sub:true});
            console.log(this.state)
            document.getElementById("sub").disabled=true;
        }
        else
        {
            this.setState({sub:false});
            console.log("false")
            document.getElementById("sub").disabled=false;
        }
      }
      
     
    render() {
        return (
            <div>
            <div className="main1" ></div>
            <div className="adjustsize1"> </div>
            <div d="details"className="nodebox">
                <form  autocomplete="off" onSubmitted>
                    <h1> User Details</h1>
                    <p>  Enter Name</p>
                    <input  onChange={this.onChange } type="text" name="name" placeholder="Enter Name"  id="name" required/>
                    <p>Enter Email-ID</p>
                    <input  onChange={this.onChange } type="email" name="email_id" placeholder="Enter Email-ID"  id="email_id" required/>
                    <p>Enter Password</p>
                    <input  onChange={this.onChange } type="password" name="pass" placeholder="Enter Password"  id="pass" required/>
                    <p> Enter User Address</p>
                    <input  onChange={this.onChange } type="text" name="address" placeholder="Enter User Address"  id="address" required/>
                    <p> Enter Phone Number</p>
                    <input  onChange={this.onChange } type="number" name="phone_no" placeholder="Enter Phone Number"  id="phone_no" required/>
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
