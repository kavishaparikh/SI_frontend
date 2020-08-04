import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Showgraph from './showgraph'
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
    
    axios.get("http://localhost:9000/node_data").then(function (response) {
      
      return response.data;
   })
        .then(res => {
         
            this.setState({
                nodeIds: res
            })
            console.log("hello", this.state.nodeIds)
        })
   }

   handleChange=(selectedOption) =>{
     console.log(selectedOption.label);
     axios.get("http://localhost:9000/node_details/"+selectedOption.label).then(function (response) {
      // console.log(response);
      return response.data;
   })
        .then(res => {
          console.log(res);
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
            console.log("hello", this.state.node)
        })
    this.setState({selectedOption});
    this.setState({details:true});
    this.setState({showgraph1:false});
   }
  render() {
    let options = this.state.nodeIds.map(function (nodeId) {
      return { value: nodeId.longitude, label: nodeId.node_id };
    })
    return (
      <div className="">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="row">
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

        {this.state.details?<div>
        <table>
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
        <td colSpan="3"><button onClick={this.viewgraph}>Show Graph</button></td>
        </tr>
        </tbody>
        </table>
        
        </div>
        :<div/>}
        {this.state.showgraph1 ? <div className="gcss"><br/><br/>
        <Showgraph node_id={this.state.node.node_id}/></div>:<div/>}
        


      </div>

    
    );
  }
}

export default csvfile
