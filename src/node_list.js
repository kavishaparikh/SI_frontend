import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './userlist.css'
import axios from "axios";
import { MdFileUpload } from "react-icons/md";
import Tooltip from '@material-ui/core/Tooltip';    
import IconButton from '@material-ui/core/IconButton';    
import 'bootstrap/dist/css/bootstrap.min.css';

export default class node_list extends Component{
  constructor() {
    super();
    this.state = {
       data: [],
    }
 }
  
 componentDidMount() {
  var th = this;
  this.serverRequest = axios.get("http://localhost:9000/node_list")
    .then(function (res) {
      
      th.setState({
        data: res.data
    });
    // console.log(th.state.data);
 })
}

 render(){
  //  console.log(this);
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
      </td>
    </tr>
    })
        return(
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
        )
    }
}
