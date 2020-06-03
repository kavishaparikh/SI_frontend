import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Showgraph from './showgraph'
import Csvfile from './csvfile'
import  Menu from './menu'



export default function nav() {
    return (
        <div>
            <BrowserRouter>
            <Menu />
            <switch>
            <Route path="/" exact  component={Csvfile}/>
            <Route path="/showgraph" component={Showgraph}/>
            </switch>
            </BrowserRouter>
           
        </div>
    )
}
