import React, { Component } from "react"
import { compose } from "recompose"
import axios from "axios";
import Showgraph from './showgraph'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
  <div>
    <br/><br/><br/><br/><br/>
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 22.5, lng: 72 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onMouseUp={onClick}
            onClick={onClick}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.node_id}
                </div>
              </InfoWindow>}
            
          </Marker>
        )
      })}
    </GoogleMap></div>
  )
})

export default class ShelterMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false,
      selectedOption: '',
        clearable: true,
        nodeIds: [],
        details: false,
        node: '',
        showgraph1: false
    }
  }
  componentDidMount() {
    fetch("http://localhost:9000/node_data")
      .then(r => r.json())
      .then(data => {
        this.setState({ shelters: data})
      })
  }
  viewgraph = ()=>{
    this.setState({showgraph1:true});
  }
  handleClick = (selectedOption, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: selectedOption })
    // console.log(selectedOption.label);
     axios.get("http://localhost:9000/node_details/"+selectedOption.node_id).then(function (response) {
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
    return (
      <div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
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
    )
  }
}