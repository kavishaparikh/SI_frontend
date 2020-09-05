import React, {Component} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import './userlist.css'
import axios from "axios";
import { MdAddLocation } from "react-icons/md";
import Tooltip from '@material-ui/core/Tooltip';    
import IconButton from '@material-ui/core/IconButton';    
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './menu'
import { Redirect } from 'react-router';
export default class user_list extends Component{
  constructor() {
    super();
    
    this.state = {
       data: [],
       nodeIds: {},
      selectedOptions: {}
    }
    this.componentDidMount = this.componentDidMount.bind(this);
 }

 handleChange = (email = "", selectedOption) => {
  this.setState({ selectedOptions: { ...this.state.selectedOptions, [email]: selectedOption } })
 }
  
 componentDidMount() {
  var th = this;
  this.serverRequest = axios.get("http://localhost:9000/user_list")
    .then(function (res) {
           th.setState({
        data: res.data
      });
    // console.log(res);

    let nodeIds = {};
    res.data.map((node, index) => {

    axios.get("http://localhost:9000/nodedropdown/"+node.email_id).then(function (response) {
      
      return response.data;
      })
        .then(reso => {
            // console.log(reso);
            let list = [];
            if(typeof reso !== 'undefined') {
              reso.map(resNode => {
                list.push({ label: resNode.node_id, value: resNode.node_id });
              });
            }
            nodeIds[node.email_id] = list;
            // console.log("hello", th.state.nodeIds);

            if(index === (res.data.length-1)) {
              th.setState({ nodeIds });
            }
        })
    
    // console.log(node.email_id);
    })
  

  })
 
    
 
}

 render(){
   const { data, nodeIds, selectedOptions } = this.state;
  if (!localStorage.getItem("username")) {
    return <Redirect to = {{pathname:'/login'}}/>
  }
  //  console.log(this.state);
  console.log({selectedOptions})
  // let nodes = this.state.nodeIds.map(function (nodeId) {
  //   return { value: nodeId.longitude, label: nodeId.node_id };
  // })
    let nodes;
  // console.log(this.state.data);

        return(

          <div><Menu />
            <div class="tableBox">
            <h1>User List</h1>
            <Link to='/user_detail'>
              <button class="large green button">Add User</button>
            </Link>
            <table>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Password</th>
              <th>Nodes</th>
              <th>Action</th>
            </tr>
            {
              data.map((user, index) => {
                console.log(nodeIds[user.email_id])
                return <tr key={index}>
            
                  <td>{user.email_id}</td> 
                  <td>{user.name}</td>
                  <td>{user.phone_no}</td>
                  <td>{user.password}</td>
                  <td>
                    <Select
                      name="form-field-name"
                      value={selectedOptions[user.email_id] || ""}
                      onChange={option => this.handleChange(user.email_id, option)}
                      // labelKey='name'
                      // valueKey='countryCode'
                      options={nodeIds[user.email_id]} 
                    />
                  </td>
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
            }
          </table>
        </div>    
        </div>
        )
    }
}
