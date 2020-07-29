import React, { Component } from 'react'; 
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'; 
 
const mapStyles = { 
  width: '100%', 
  height: '100%' 
}; 
 
let geocoder; 
let addressData = [{location: "146 Pierrepont St, Brooklyn, NY, USA"}, {location: "153 Remsen St, Brooklyn, NY, USA"}]; 
 
export class MapContainer extends Component { 
  constructor (props) { 
    super(props); 
    this.onMarkerClick = this.onMarkerClick.bind(this); 
    this.displayMarkers = this.displayMarkers.bind(this); 
    this.state = { 
        lat: 47.49855629475769, 
        lng: -122.14184416996333, 
        showingInfoWindow: false, 
        activeMarker: {}, 
        selectedPlace: {}, 
        places: [], 
        stores: [{latitude: 47.49855629475769, longitude: -122.14184416996333}, 
          {latitude: 47.359423, longitude: -122.021071}, 
          {latitude: 47.2052192687988, longitude: -121.988426208496}, 
          {latitude: 47.6307081, longitude: -122.1434325}, 
          {latitude: 47.3084488, longitude: -122.2140121}, 
          {latitude: 47.5524695, longitude: -122.0425407}] 
    } 
  } 
  displayMarkers (stores) { 
    return stores.map((place, index) => { 
      return <Marker key={index} id={index} position={{ 
       lat: place.latitude, 
       lng: place.longitude 
     }} 
     onClick={() => console.log("You clicked me!")} /> 
    }) 
  } 
 
  onMarkerClick (props, marker, e) { 
    this.setState({ 
      selectedPlace: props, 
      activeMarker: marker, 
      showingInfoWindow: true 
    }); 
  }; 
 
  render() { 
    geocoder = new this.props.google.maps.Geocoder(); 
    return ( 
      <div className="container place-map"> 
        <div className="row"> 
          <div className="col-md-12"> 
            <Map 
              google={this.props.google} 
              zoom={14} 
              style={mapStyles} 
              initialCenter={{ 
                lat: this.state.lat, 
                lng: this.state.lng 
              }} 
               
            > 
              {this.displayMarkers(this.state.stores)} 
              {this.displayMarkers(this.state.places)} 
              {/* <Marker onClick={this.onMarkerClick} /> */}
              <InfoWindow 
                marker={this.state.activeMarker} 
                visible={this.state.showingInfoWindow} 
              > 
                <div>Your Location Here!</div> 
              </InfoWindow> 
            </Map> 
          </div> 
        </div> 
      </div> 
    ); 
  } 
} 
 
export default GoogleApiWrapper({ 
  apiKey: 'AIzaSyAUbRHtu3k_fg3jDGk_qAatE5jA4bC_ndE' 
})(MapContainer);
