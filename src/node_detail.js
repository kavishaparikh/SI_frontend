import React, { Component } from 'react'
import './node_detail.css'

export default class node_detail extends Component {
    render() {
        return (
            <div>
            <div className="main1">
            </div>
            <div className="nodebox">
                <form>
                    <h1> Node Details</h1>
                    <p>  Enter Node ID</p>
                    <input type="text" name="node_id" placeholder="Enter Node ID"  id="node_id"/>
                    <p> Enter Soil Type</p>
                    <input type="text" name="soil_type" placeholder="Enter Soil Type"  id="soil_type"/>
                    
                    <p> Enter Crop Type</p>
                    <input type="text" name="crop_type" placeholder="Enter Crop Type"  id="crop_type"/>
                    <p>Enter Soil Density</p>
                    <input type="text" name="soil_density" placeholder="Enter Soil Density"  id="soil_density"/>
                    <p>Enter Date of Feeding</p>
                    <input type="date" name="feeding_date" placeholder="Enter Date of Feeding"  id="feeding_date"/>
                    <p>Enter Longitude</p>
                    <input type="text" name="longitude" placeholder="Enter Longitude"  id="longitude"/>
                    <p>Enter Latitude</p>
                    <input type="text" name="latitude" placeholder="Enter Latitude"  id="latitude"/>
                    <p>Enter User Email ID</p>
                    <input type="email" name="email_id" placeholder="Enter User Email ID"  id="email_id"/>
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
