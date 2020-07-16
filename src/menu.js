import React from 'react'
import './menu.css';
import {Link} from 'react-router-dom'
export default function menu() {
    return (
        <div className="menu"> 
            <ul>
                <li><Link to='node_detail' style={{color: 'white'}} >ADD NODE</Link></li>
                <li><Link to='user_detail' style={{color: 'white'}} >ADD USER</Link></li>
                <li><Link to='/' style={{color: 'white'}} >ASSIGN NODE</Link></li>
                <li><Link to='showgraph' style={{color: 'white'}} >VIEW MAP</Link></li>
                
            </ul>
        </div>
    )
}
