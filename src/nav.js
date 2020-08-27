import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import ShelterMap from './mapview'
import Csvfile from './csvfile'
import Menu from './menu'
import Node_detail from './node_detail'
import User_detail from './user_detail'
import User_list from './user_list'
import UploadCsv from './uploadcsv'
import Node_list from './node_list'
import Login from './login'
import UpdateUser from './updateUser'


export default function nav() {
    var isauthenticate = false;
    return (
        <div>
            <BrowserRouter>
            
            
            
            
            <switch>
            {/* <Route path="/" component={Login}/>
             <Route path="/home" component={Home}/> */}
             
             
             <Route path="/" exact  component={ShelterMap}/>
            <Route path="/user_detail" component={User_detail}/>
            <Route path="/updateUser:id" exact component={UpdateUser}/>
            <Route path="/user_list" component={User_list}/>
            <Route path="/csvfile"  component={Csvfile}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/addNode:id/" component={Node_detail}/>
            <Route exact path="/uploadCsv:id"  component={UploadCsv}/>
            
            <Route path="/node_list" component={Node_list}/>
            
            </switch>
            
            </BrowserRouter>
           
        </div>
    )
}
