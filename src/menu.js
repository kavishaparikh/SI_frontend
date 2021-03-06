
import './menu.css';
import {Link} from 'react-router-dom'
import Pic from "./logo.png"
import React, { Component } from 'react'

export default class menu extends Component {
    render() {
        return (
            <div className="menu"> 
            <img src={Pic} alt="logo" style={{height:95,marginLeft:20}}/>
            {localStorage.getItem("role")=="admin"?
            <ul>
         
                <li><Link to='/' className="links" style={{color: 'black',textDecoration:'none',padding:50,fontSize:25 }}><span className="links">Home</span></Link></li>
                <li><Link to='node_list' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} ><span className="links">Nodes</span></Link></li>
                <li><Link to='user_list' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} ><span className="links">Users</span></Link></li>
                <li><Link to='csvfile' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} ><span className="links">Select</span></Link></li>
                <li><Link to='login' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} ><span className="links">Logout</span></Link></li>
            </ul>
    :
    <ul>
              <li><Link to='/' className="links" style={{color: 'black',textDecoration:'none',padding:50,fontSize:25 }}><span className="links">Home</span></Link></li>
                <li><Link to='csvfile' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} ><span className="links">Select</span></Link></li>
                <li><Link to='login' style={{color: 'black',textDecoration:'none',padding:50,fontSize:25}} ><span className="links">Logout</span></Link></li>
            </ul>
    }
        </div>
        )
    }
}
