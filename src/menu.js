
import './menu.css';
import {Link} from 'react-router-dom'
import Pic from "./logo.png"
import React, { Component } from 'react'

export default class menu extends Component {
    render() {
        return (
            <div className="menu"> 
            <img src={Pic} alt="logo" style={{height:95,width:120,marginLeft:20}}/>
            <ul>
            {/* <li><Link to='mapview' style={{color: 'white',textDecoration:'none',padding:50,fontSize:20}} >View Map</Link></li> */}
                <li><Link to='/' className="links" style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} >Home</Link></li>
                <li><Link to='node_list' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} >Nodes</Link></li>
                <li><Link to='user_list' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} >Users</Link></li>
                <li><Link to='csvfile' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} >Select</Link></li>
                
            </ul>
        </div>
        )
    }
}
