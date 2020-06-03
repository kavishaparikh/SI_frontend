import {Line} from 'react-chartjs-2'

import React, { Component } from 'react'
import './app.css'


export default class app extends Component {
    
    constructor(props)
    {
        super(props)  
        const name=this.props.graphname; 
        const url="http://localhost:9000/"+name;                                                                                                                              
           this.state={
            data:{
             labels:[],
            datasets:[
                {
                    label:this.props.name,
                    backgroundColor:this.props.color,
                    data:[]
                }
               ]
        }
        }
        fetch(url)
          .then((response) => {
            if (response.ok) {
              this.setState({loading:false});
              return response.json();
            } else {
              throw new Error("Something went wrong");
            }
          })
          .then((data) => {
            this.setState({tabledata:data});
            this.datavalue=data;
            console.log(data);
          })
          .catch((err) => {
            this.setState({error:true});
            console.log(err);
    
          });  
        setInterval(()=>
        {
        var getdata=this.datavalue;
        
        
        var valuearray = getdata.map(function(d) {return d.value1});
        var timestamparray = getdata.map(function(d) {return d.timestamp1});
        
       
        
        this.setState({
            data:{
             
                labels:timestamparray,
            datasets:[
                {
                    label:this.props.name,
                    backgroundColor:this.props.color,
                    data:valuearray
                }
               ]
        }
        })
    },2000);
    }
    
    render() {
        return (
            <div className="graph" >
                
                
                <h3>{this.props.topic}</h3>
                 <Line 
                    options={{
                        responsive:true
                    }}
                    
                    data={this.state.data}
                
                />
            </div>
        )
    }
}

