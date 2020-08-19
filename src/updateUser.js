import React, { Component } from 'react'
import './node_detail.css'
import axios from "axios";
import { Redirect } from 'react-router';

export default class UpdateUser extends Component {

    constructor(props)
    {
        super(props);
        this.state = {    
            redirect:'',
            name:"",
            email_id:props.location.id,
            pass:"",
            phone_no:"",
        }
    }

    componentDidMount() {
        var th = this;
        console.log(this.state.email_id);
        this.serverRequest = axios.get("http://localhost:9000/updateuser/"+this.state.email_id)
            .then(function (res) {
                console.log(res);
                th.setState({
                data: res.data
          });
        //   console.log(th.state.data);
       })
    //    console.log(th.state.data);
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
                    <p>Enter Email-ID</p>
                    <input type="text" disabled value={this.state.email_id}/>
                    <p> Enter Name</p>
                    <input  onChange={this.onChange } type="text" name="name" value={this.state.name}  id="name"/>
                    <p>Enter Password</p>
                    <input  onChange={this.onChange } type="password" name="pass"  value={this.state.name} id="pass"/>
                    <p> Enter Phone Number</p>
                    <input  onChange={this.onChange } type="text" name="phone_no" value={this.state.phone_no}  id="phone_no"/>
                       <br/> 
                       <br/>
                    <button type="button" id="sub"
                    onClick={this.onClickHandler}>Submit</button>
                </form>
            </div>
            </div>            
           
        )
    }
}