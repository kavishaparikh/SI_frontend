import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Mapview from './mapview'
import Csvfile from './csvfile'
import Menu from './menu'
import Node_detail from './node_detail'
import User_detail from './user_detail'
import User_list from './user_list'
// import Home from './home'
import UploadCsv from './uploadcsv'
import Node_list from './node_list'
import Login from './login'

export default function nav() {
    return (
        <div>
            <BrowserRouter>
            <Menu />
            
            <switch>
            {/* <Route path="/" component={Login}/>
             <Route path="/home" component={Home}/> */}
             <Route path="/" exact component={Mapview}/>
            <Route path="/user_detail" component={User_detail}/>
            <Route path="/user_list" component={User_list}/>
            <Route path="/csvfile"  component={Csvfile}/>
            {/* <Route path="/mapview" component={Mapview}/> */}
            
            <Route exact path="/addNode:id/" component={Node_detail}/>
            <Route exact path="/uploadCsv:id"  component={UploadCsv}/>
            
            <Route path="/node_list" component={Node_list}/>
            
            </switch>
            </BrowserRouter>
           
        </div>
    )
}
