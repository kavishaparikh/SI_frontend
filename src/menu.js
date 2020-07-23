import React from 'react'
import './menu.css';
import {Link} from 'react-router-dom'
import Pic from "./logo.png"
export default function menu() {
    return (
        <div className="menu"> 
            <img src={Pic} alt="logo" style={{border: 'red',height:96,width:200}}/>
            <ul>
                <li><Link to='/' style={{color: 'white',textDecoration:'none',padding:50,fontSize:20}} >Add Node</Link></li>
                <li><Link to='user_detail' style={{color: 'white',textDecoration:'none',padding:50,fontSize:20}} >Add User</Link></li>
                <li><Link to='csvfile' style={{color: 'white',textDecoration:'none',padding:30,fontSize:20}} >Assign Node</Link></li>
                <li><Link to='showgraph' style={{color: 'white',textDecoration:'none',padding:50,fontSize:20}} >View Map</Link></li>
                
            </ul>
        </div>
    )
}
