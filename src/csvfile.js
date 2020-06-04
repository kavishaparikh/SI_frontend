import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import "./csvfile.css";
import Loader from "./components/loader";
import CsvError from "./components/csvError";

class Csvfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      
      error: false,
      tabledata:{}
    };
  }

  // :::::::: CSV parser ::::::::::
  papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };
  //::::::::::::::::::::::::::::::::

  //::::::::: for putting all data in CSV to MySQL :::::::::::
  handleForce = (data, fileInfo) => {
    this.setState({ loading: true });
    
    let d = JSON.stringify({ ...data });
    console.log(d);
    fetch("http://localhost:9000/soilmoisture", {
      
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: d,
    })
      .then((response) => {
        this.setState({ loading: false });

        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error, this.state);
      });
  };
  //:::::::::::::::: End of POST call to save data ::::::::::::::

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <CsvError />;
    return (
      <div><center><br/><br/><br/><br/><br/><br/>
      <div className="wrapper">
        
        <div className="section1">
          <div className="container">
                <CSVReader
                  cssClass="react-csv-input"
                  label="Select CSV  :"
                  onFileLoaded={this.handleForce.bind(this)}
                  parserOptions={this.papaparseOptions}
                />
                
                
          </div>
        </div>
        

        </div></center>
        </div>

    );
  }
}

export default Csvfile;
