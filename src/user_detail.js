import React, { Component } from 'react'
import './node_detail.css'
export default class user_detail extends Component {
    render() {
        return (
            <div>
            <div className="main1" ></div>
            <div className="nodebox">
                <form>
                    <h1> User Details</h1>
                    <p>  Enter Name</p>
                    <input type="text" name="name" placeholder="Enter Name"  id="name"/>
                    <p>Enter Email-ID</p>
                    <input type="email" name="email_id" placeholder="Enter Email-ID"  id="email_id"/>
                    <p>Enter Password</p>
                    <input type="password" name="pass" placeholder="Enter Password"  id="pass"/>
                    <p> Enter User Address</p>
                    <input type="text" name="adress" placeholder="Enter User Address"  id="address"/>
                    <p> Enter Phone Number</p>
                    <input type="number" name="phone_no" placeholder="Enter Phone Number"  id="phone_no"/>
                        <br/> 
                       <br/>
                    <input type="button" name="registerbtn" value="Submit"/>
                    </form>
                    {/* <form action ="loginuser.html">  
                        <input type="submit" name="loginbtn" value="Login"/>
                    </form> */}
            
            </div>
            </div>            
           
        )
    }
}
