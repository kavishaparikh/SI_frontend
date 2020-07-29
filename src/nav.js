import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Viewmap from './mapview'
import Csvfile from './csvfile'
import  Menu from './menu'
import Node_detail from './node_detail'
import User_detail from './user_detail'

export default function nav() {
    return (
        <div>
            <BrowserRouter>
            <Menu />
            
            <Route path="/" exact component={Node_detail}/>
            <Route path="/user_detail" component={User_detail}/>
            <Route path="/csvfile"  component={Csvfile}/>
            <Route path="/mapview" component={Viewmap}/>
           
            
            </BrowserRouter>
           
        </div>
    )
}
