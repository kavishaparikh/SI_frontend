import React from 'react'
import './menu.css';
import {Link} from 'react-router-dom'
export default function menu() {
    return (
        <div className="menu"> 
            <ul>
                <li><Link to='/' style={{color: 'white'}} >UPLOAD FILE</Link></li>
                <li><Link to='showgraph' style={{color: 'white'}} >SHOW GRAPH</Link></li>
                
            </ul>
        </div>
    )
}
