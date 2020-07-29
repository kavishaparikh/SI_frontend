import React, { Component } from 'react'
import App  from './app';
import "react-datepicker/dist/react-datepicker.css";
import './showgraph.css'
import DatePick from "react-datepicker";
import axios from "axios";
export default class  extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            start:new Date(),
            end:new Date(),
            sd1:new Date(),
            ed1:new Date(),
            show_graph:false
        }


        
     }
     startdate=(e)=>
     {
            this.setState({show_graph:false});
            console.log("date "+e );
            this.setState({start:e})
            this.setState({show_graph:true});
     }
     enddate=(e)=>
     {
            this.setState({show_graph:false});
            console.log("date "+e); 
            this.setState({end:e})
            this.setState({show_graph:true});
     }
     componentDidMount()
     {
        axios.get("http://localhost:9000/startdate/"+this.props.node_id).then(function (response) {
            console.log(response.data[0].date);
            return response.data[0].date;
         })
              .then(res => {
                
                
                var d= new Date(res);
                var sd=res.split('T');
                this.setState({
                    start: d
                })
                this.setState({
                    sd1:sd[0]
                })
                  console.log("hello1 "+d)
              })
         
      
         axios.get("http://localhost:9000/enddate/"+this.props.node_id).then(function (response) {
           
            return response.data[0].date;
         })
              .then(res => {

                var d1= new Date(res);
                var ed=res.split('T');
                this.setState({
                    end: d1
                })
                this.setState({

                    ed1: ed[0]
                })
                this.setState({show_graph:true})
                console.log("hello2 "+d1)
              })
             
        
     }
    render() {
        return (
            <div className="showgraph">
                <center>
                    
                    <br/><br/>
                <span>From : <DatePick  selected={this.state.start} onChange={this.startdate}/></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>To : <DatePick selected={this.state.end} onChange={this.enddate}/></span>
                <br/><br/>
                 <h4>Date should be between <span dangerouslySetInnerHTML={{__html: this.state.sd1}}></span> and <span dangerouslySetInnerHTML={{__html: this.state.ed1}}></span></h4><br/>
                {this.state.show_graph?<App node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="soilmoisture" topic="Soil moisture" name="Soil moisture" color="rgba(255,153,153,0.2)"/>:<div/>} <br/><br/>
                {this.state.show_graph?<App node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="soiltemperature" topic="Soil temperature"name="Soil temperature" color="rgba(0,0,255,0.75)"/>:<div/>} <br/><br/>
                {this.state.show_graph?<App node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="ambienthumidity"topic="Ambient humidity" name="Ambient humidity" color="rgba(100,100,0,0.75)"/>:<div/>} <br/><br/>
                {this.state.show_graph?<App node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="ambienttemperature"topic="Ambient temperature" name="Ambient temperature" color="rgba(255,0,100,0.75)"/>:<div/>} <br/><br/>
                {this.state.show_graph?<App node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="leafwetness" topic="Leaf wetness" name="Leaf wetness" color="rgba(105,100,100,0.75)"/>:<div/>}  
                
                </center>
            </div>
        )
    }
}
