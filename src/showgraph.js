import React, { Component } from 'react'
import App  from './app';
import ApexChart from './practice'
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
                var k = new Date(this.state.end);
                k.setDate(k.getDate()-30);
                this.setState({start: k});
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
                {/* <div className="datepicker1"> */}
                {/* <span className="date1"><span className="colorfrom">From : </span><DatePick  selected={this.state.start} onChange={this.startdate}/></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="date2"><span className="colorfrom">To :</span> <DatePick selected={this.state.end} onChange={this.enddate}/></span> */}
                {/* </div> */}
                <h2>Data between <span dangerouslySetInnerHTML={{__html: this.state.sd1}}></span> and <span dangerouslySetInnerHTML={{__html: this.state.ed1}}></span></h2><br/>
                {this.state.show_graph?<ApexChart node_id={this.props.node_id} enddate={this.state.ed1} startdate={this.state.sd1} graphname="soilmoisture" topic="Soil moisture" name="Soil moisture" color="rgb(0,100,0)"/>:<div/>} <br/><br/>
                {this.state.show_graph?<ApexChart node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="soiltemperature" topic="Soil temperature"name="Soil temperature" color="rgb(0,0,255)"/>:<div/>} <br/><br/>
                {this.state.show_graph?<ApexChart node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="ambienthumidity"topic="Ambient humidity" name="Ambient humidity" color="rgb(0,0,100)"/>:<div/>} <br/><br/>
                {this.state.show_graph?<ApexChart node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="ambienttemperature"topic="Ambient temperature" name="Ambient temperature" color="rgb(255,0,100)"/>:<div/>} <br/><br/>
                {this.state.show_graph?<ApexChart node_id={this.props.node_id} enddate={this.state.end} startdate={this.state.start} graphname="leafwetness" topic="Bettery Level" name="Leaf wetness" color="rgb(100,200,200)"/>:<div/>}  
                
                </center>
            </div>
        )
    }
}
