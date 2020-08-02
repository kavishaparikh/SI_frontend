import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './userlist.css'
import axios from "axios";
import { MdAddLocation } from "react-icons/md";
import Tooltip from '@material-ui/core/Tooltip';    
import IconButton from '@material-ui/core/IconButton';    
import 'bootstrap/dist/css/bootstrap.min.css';

export default class user_list extends Component{
  constructor() {
    super();
    this.state = {
       data: [],
    }
 }
  
 componentDidMount() {
  var th = this;
  this.serverRequest = axios.get("http://localhost:9000/user_list")
    .then(function (res) {
      
      th.setState({
        data: res.data
    });
    // console.log(th.state.data);
 })
}

 render(){
    // console.log(this.state.data);
  const users = this.state.data.map(user => {
    return <tr>

      <td>{user.email_id}</td> 
      <td>{user.name}</td>
      <td>{user.phone_no}</td>
      <td>{user.password}</td>
      <td>{user.role}</td>
      <td className="icon-action">
          <Tooltip title="Add Node">    
            <IconButton aria-label="addNode">
                <Link to={{pathname:'/addNode:id',id:user.email_id }}> 
                    <MdAddLocation />
                </Link>
             </IconButton>    
          </Tooltip>
      </td>
    </tr>
    })
        return(
            <div className="tableBox">
            <h1>User List</h1>
            <Link to='/user_detail'>
              <button class="large green button">Add User</button>
            </Link>
            <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Password</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            {users}
          </table>
        </div>          
        )
    }
}