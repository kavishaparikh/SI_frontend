import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Showgraph from './showgraph'
import Csvfile from './csvfile'
import  Menu from './menu'
import Node_detail from './node_detail'
import User_detail from './user_detail'

export default function nav() {
    return (
        <div>
            <BrowserRouter>
            <Menu />
            <switch>
            <Route path="/node_detail" component={Node_detail}/>
            <Route path="/user_detail" component={User_detail}/>
            <Route path="/" exact  component={Csvfile}/>
            <Route path="/showgraph" component={Showgraph}/>
           
            </switch>
            </BrowserRouter>
           
        </div>
    )
}
