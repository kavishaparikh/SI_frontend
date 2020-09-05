import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './userlist.css'
import axios from "axios";
import { MdFileUpload,MdDelete } from "react-icons/md";
import Tooltip from '@material-ui/core/Tooltip';    
import IconButton from '@material-ui/core/IconButton';    
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './menu'
export default class node_list extends Component{
  constructor() {
    super();
    
    this.state = {
       data: [],
       redirect:'',
       redirect1: false,
       delete:""
       
    }
   
    
    
 }
 deletehandler=(e)=>{
   var th=this;
  console.log("kavii "+e);
    var a= axios.delete("http://localhost:9000/deletenode/"+e)
    
    .then(function (){
      window.location.reload(false);
      
    
            });
            
   }
 componentDidMount() {
  var th = this;
  this.serverRequest = axios.get("http://localhost:9000/node_list")
    .then(function (res) {
      
      th.setState({
        data: res.data
    });
     if (localStorage.getItem("pr"))
    {
      localStorage.removeItem("pr");
      window.location.reload(false)

    }
    
 })
}

 render(){
  if (!localStorage.getItem("username")) {
    return <Redirect to = {{pathname:'/login'}}/>
  }
  if (this.state.redirect1) {
    return <Redirect to={this.state.redirect} />
  }
  
  const nodes = this.state.data.map(node => {
    return <tr>
      <td>{node.node_id}</td> 
      <td>{node.soil_type}</td>
      <td>{node.crop_type}</td>
      <td>{node.soil_density}</td>
      <td>{node.feeding_date}</td>
      <td>{node.longitude}</td>
      <td>{node.latitude}</td>
      <td>{node.name}</td>
      <td className="icon-action">
        <Tooltip title="Upload CSV File">    
            <IconButton aria-label="Upload CSV File">
                <Link to={{pathname:'/uploadCsv:id',id:node.node_id}}>
                    <MdFileUpload />
                </Link>
             </IconButton>    
        </Tooltip>
        <Tooltip title="Delete Node">    
            <IconButton  aria-label="deletenode">
              {/* {console.log(node.node_id)} */}
                    <a onClick={()=>this.deletehandler(node.node_id) }><MdDelete /></a>
             </IconButton>    
        </Tooltip>
      </td>
    </tr>
    })
        return(
          <div><Menu />
            <div className="tableBox">
            <h1>Node List</h1>
            <br/>
            <table>
            <tr>
              <th>Node ID</th>
              <th>Soil Type</th>
              <th>Crop Type</th>
              <th>Soil Density</th>
              <th>Feeding Date</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
            {nodes}
          </table>
        </div>  
        </div>        
        )
    }
}
