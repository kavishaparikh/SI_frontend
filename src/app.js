import {Line} from 'react-chartjs-2'

import React, { Component } from 'react'
import './app.css'


export default class app extends Component {
    constructor(props)
    {
        super(props)  
        const name=this.props.graphname; 
        const nodeid=this.props.node_id;
        console.log("janne"+nodeid)
        const url="http://localhost:9000/"+this.props.graphname+"/"+this.props.node_id+"/"+this.props.startdate+"/"+this.props.enddate;                                                                                                                              
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
        var timestamparray = getdata.map(function(d) {return d.time_stamp});
        
       var count=timestamparray.length;
       const arrayval=[];
       for(let i=1;i<=count;i++)
       {
          arrayval.push(i);
       }
        
        this.setState({
            data:{
             
                labels:arrayval,
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
    componentDidUpdate(prevprops)
    {
      if(this.props.startdate!=prevprops.startdate || this.props.enddate!=prevprops.enddate)
      {
      const url="http://localhost:9000/"+this.props.graphname+"/"+this.props.node_id+"/"+this.props.startdate+"/"+this.props.enddate;                                                                                                                              
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
        var timestamparray = getdata.map(function(d) {return d.time_stamp});
        
       var count=timestamparray.length;
       const arrayval=[];
       for(let i=1;i<=count;i++)
       {
          arrayval.push(i);
       }
        
        this.setState({
            data:{
             
                labels:arrayval,
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

