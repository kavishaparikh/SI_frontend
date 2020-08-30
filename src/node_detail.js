import React, { Component } from 'react'
import './node_detail.css'
import axios from "axios";
import { Redirect } from 'react-router';
import Menu from './menu'
export default class node_detail extends Component {
    constructor(props)
    {
       super(props);
        
        this.state = {
            
            redirect: '',
            node_id:"",
            soil_type:"",
            crop_type:"",
            soil_density:"",
            feeding_date:"",
            longitude:"",
            latitude:"",
            showerror:false,
            email_id:props.location.id,
            sub:true
            
        }
    }
    
   
    onChangeHandler=event=>{
           
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
      
      onClickHandler = () => {
        
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        data.append("name",this.state.node_id);
      
        const nodedetail ={node_id:this.state.node_id,
            soil_type:this.state.soil_type,
            crop_type:this.state.crop_type,
            soil_density:this.state.soil_density,
            feeding_date:this.state.feeding_date,
            logtitude:this.state.longitude,
            latitude:this.state.latitude,
            email_id:this.state.email_id}
      
        var th=this;
        axios
          .post("http://localhost:9000/upload", data, {
            headers:{
              'Content-Type':'multipart/form-data'
            }
            // receive two parameter endpoint url ,form data
          })
          .then((res) => {
            axios.post("http://localhost:9000/addnodedetails",{
        node_id:this.state.node_id,
        soil_type:this.state.soil_type,
        crop_type:this.state.crop_type,
        soil_density:this.state.soil_density,
        feeding_date:this.state.feeding_date,
        longitude:this.state.longitude,
        latitude:this.state.latitude,
        email_id:this.state.email_id})
            .then((res) => {
                // then print response status
              
              });
            // then print response status
           
            this.setState({
              redirect:'/node_list',
            })
          })
          .catch(()=>{
            this.setState({showerror:true})
          })
          ;

          
      };
     onChange=(e)=> {
        var tname=e.target.name;
        let obj={};
        obj[tname] = e.target.value
       
        this.setState(obj);
        
        if(this.state.node_id==="" || this.state.soil_type===""|| this.state.crop_type===""|| this.state.soil_density===""|| this.state.feeding_date===""|| this.state.latitude===""|| this.state.longitude===""|| this.state.email_id==="")
        {
            this.setState({sub:true});
            
            document.getElementById("sub").disabled=true;
        }
        else
        {
            this.setState({sub:false});
            document.getElementById("sub").disabled=false;
        }
      }
      
     
    render() {
      if (!localStorage.getItem("username")) {
        return <Redirect to = {{pathname:'/login'}}/>
      }
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }

        return (
          <div><Menu />
            <div id>
            
            <div className="main1">
            </div>
            <div className="adjustsize"> </div>
            <div id="details" className="nodebox">
                <form autocomplete="off">
                    <h1> Node Details</h1>
                    <p>User ID</p> 
                    <input type="text" disabled value={this.state.email_id}/>
                   
                    <p>  Enter Node ID</p>
                    <input onChange={ this.onChange }  type="text" name="node_id" placeholder="Enter Node ID"  id="node_id" required/>
                    <p> Enter Soil Type</p>
                    <input onChange={this.onChange} type="text" name="soil_type" placeholder="Enter Soil Type"  id="soil_type" required/>
                    <p> Enter Crop Type</p>
                    <input onChange={this.onChange} type="text" name="crop_type" placeholder="Enter Crop Type"  id="crop_type" required/>
                    <p>Enter Soil Density</p>
                    <input onChange={this.onChange} type="text" name="soil_density" placeholder="Enter Soil Density"  id="soil_density" required/>
                    <p>Enter Date of Feeding</p>
                    <input onChange={this.onChange} type="date" name="feeding_date" placeholder="Enter Date of Feeding"  id="feeding_date" required/>
                    <p>Enter Longitude</p>
                    <input onChange={this.onChange} type="text" name="longitude" placeholder="Enter Longitude"  id="longitude" required/>
                    <p>Enter Latitude</p>
                    <input onChange={this.onChange}  type="text" name="latitude" placeholder="Enter Latitude"  id="latitude" required/>
                    <p>Upload Your File </p>
                    <input
                        type="file"
                        name="file"
                        onChange={this.onChangeHandler}
                    required/>
                       <br/> 
                       
                    <center>
                    <button
                    type="button" id="sub" disabled={this.state.sub}
                    onClick={this.onClickHandler}
                    >
                Submit
              </button>
                {this.state.showerror?<h4 style={{color:"red"}}>Invalid File Selected</h4>:<span></span>}
                          </center>
                    
                   
                    </form>
                    
            
            </div>
            
            <br></br>
            </div>            
            </div>
        )
    }
}
