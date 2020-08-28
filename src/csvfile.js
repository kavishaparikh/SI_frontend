import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Showgraph from './showgraph'
import './csvfile.css'
import Menu from './menu'
import { Redirect } from 'react-router';
class csvfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedOption: '',
        clearable: true,
        nodeIds: [],
        details: false,
        node: '',
        showgraph1: false
     } 
   }
   viewgraph = ()=>{
     this.setState({showgraph1:true});
   }
   componentDidMount() {
    
    axios.get("http://localhost:9000/node_data/"+localStorage.getItem("username")+"/"+localStorage.getItem("role")).then(function (response) {
      
      return response.data;
   })
        .then(res => {
            this.setState({
                nodeIds: res
            })
         
        })
   }

   handleChange=(selectedOption) =>{
     
     axios.get("http://localhost:9000/node_details/"+selectedOption.label).then(function (response) {
     
      return response.data;
   })
        .then(res => {
          const nodeval=[];
          res.map(function(nd){
            nodeval.node_id=nd.node_id;
            nodeval.soil_type=nd.soil_type;
            nodeval.crop_type=nd.crop_type;
            nodeval.soil_density=nd.soil_density;
            nodeval.feeding_date=nd.feeding_date;
            nodeval.longitude=nd.longitude;
            nodeval.latitude=nd.latitude;
            nodeval.name=nd.name;
          })
            this.setState({
                node: nodeval
            })
           
        })
    this.setState({selectedOption});
    this.setState({details:true});
    this.setState({showgraph1:false});
   }
  render() {
    if (!localStorage.getItem("username")) {
      return <Redirect to = {{pathname:'/login'}}/>
    }
    let options = this.state.nodeIds.map(function (nodeId) {
          return { value: nodeId.longitude, label: nodeId.node_id };
    
    })
    return (
      <div><Menu/>
      <div className="map">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="row" >
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Select
            name="form-field-name"
            value={this.state.value}
            onChange={this.handleChange}
            clearable={this.state.clearable}
            searchable={this.state.searchable}
            // labelKey='name'
            // valueKey='countryCode'
            options={options} />
            
          </div>
          <div className="col-md-4"></div>
        </div>
        <br/><br/>
        {this.state.details?<div>
        <table className="tablebox1">
        <thead>
            <tr>
              <th colSpan="3"><h3><center>Node details of {this.state.node.node_id}</center></h3></th>
            </tr>
          </thead>
          <tbody>
        <tr>
          <td>Node-Id </td>     
          <td>:</td> 
          <td>{this.state.node.node_id}</td>
        </tr>
        <tr>
          <td>Soil-Type </td>     
          <td>:</td> 
          <td>{this.state.node.soil_type}</td>
        </tr>
        <tr>
          <td>Crop-Type </td>     
          <td>:</td> 
          <td>{this.state.node.crop_type}</td>
        </tr>
        <tr>
          <td>Soil-Density </td>     
          <td>:</td> 
          <td>{this.state.node.soil_density}</td>
        </tr>
        <tr>
          <td>Feeding-Date </td>     
          <td>:</td> 
          <td>{this.state.node.feeding_date}</td>
        </tr>
        <tr>
          <td>Longitude </td>     
          <td>:</td> 
          <td>{this.state.node.longitude}</td>
        </tr>
        <tr>
          <td>Latitude </td>     
          <td>:</td> 
          <td>{this.state.node.latitude}</td>
        </tr>
        <tr>
          <td>User-Name </td>     
          <td>:</td> 
          <td>{this.state.node.name}</td>
        </tr>
        <tr>
        <td colSpan="3"><button id="btnn" onClick={this.viewgraph}>Show Graph</button></td>
        </tr>
        </tbody>
        </table>
        
        </div>
        :<div/>}
        {this.state.showgraph1 ? <div className="gcss"><br/><br/>
        <Showgraph node_id={this.state.node.node_id}/></div>:<div/>}
        


      </div>
</div>
    
    );
  }
}

export default csvfile
