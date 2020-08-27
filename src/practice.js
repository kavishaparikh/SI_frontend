import React from 'react'
import ReactApexChart from 'react-apexcharts'
import ApexCharts from 'apexcharts'
import Menu from './menu'
import { Redirect } from 'react-router';
export default class ApexChart extends React.Component {
   
    constructor(props) {

      super(props);
      const name=this.props.graphname; 
        const nodeid=this.props.node_id;
     
      
      
      // console.log( "Date :  "+start + " "  + end)
      const url="http://localhost:9000/"+this.props.graphname+"/"+this.props.node_id+"/"+this.props.startdate+"/"+this.props.enddate;
      fetch(url)
        .then((response) => {
        if (response.ok) {
         
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
          .then((d) => {
            // console.log("Hello: "+d);
            var obj = {
              name: this.props.topic,
              data:d
            };
            var arr = [obj];
            this.setState({series:arr});
          })
          .catch((err) => {
            this.setState({error:true});
            console.log(err);
    
          });
      this.state = {
        start: this.props.startdate,
        end:this.props.enddate,
        series: [{
          data:[]
        }],
        options: {
          chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
              autoScaleYaxis: true
            },
            toolbar:{
              autoSelected: 'zoom' 
            }
          },
          annotations: {
            yaxis: [{
              y: 30,
              borderColor: '#999',
              label: {
                show: true,
                text: 'Support',
                style: {
                  color: "#fff",
                  background: '#00E396'
                }
              }
            }],
            xaxis: [{
              x: new Date(this.props.enddate).getTime(),
              borderColor: '#999',
              yAxisIndex: 0,
              label: {
                show: true,
                text: 'Rally',
                style: {
                  color: "#fff",
                  background: '#775DD0'
                }
              }
            }]
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
            style: 'hollow',
          },
          xaxis: {
            type: 'datetime',
            min: new Date(this.props.startdate).getTime(),
            tickAmount: 6,
          },
          tooltip: {
            x: {
              format: 'MMM dd, yyyy, hh:mm:ss'
            }
          },
          fill: {
            //colors:this.props.color,
            
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.9,
              opacityTo: 0.7,
             // stops: [0, 100]
              
            }
          },
          // stroke: {
          //   show: true,
          //   // curve: 'smooth',
          //   // width:2,
          //   colors: '#000',
            

          // },
          
        },
      
      
        selection: 'one_month',
      
      };
      // this.updateData('one_month')
    }

    componentDidMount(){
      
      const url="http://localhost:9000/"+this.props.graphname+"/"+this.props.node_id+"/"+this.props.startdate+"/"+this.props.enddate;
      fetch(url)
        .then((response) => {
        if (response.ok) {
         
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
          .then((d) => {
            // console.log("Hello: "+d);
            var obj = {
              data:d
            };
            var arr = [obj];
            this.setState({series:arr});
          })
          .catch((err) => {
            this.setState({error:true});
            console.log(err);
    
          });
    }

    componentDidUpdate(prevprops)
    {
      if(this.props.startdate!=prevprops.startdate || this.props.enddate!=prevprops.enddate)
      {
        const url="http://localhost:9000/"+this.props.graphname+"/"+this.props.node_id+"/"+this.props.startdate+"/"+this.props.enddate;
      fetch(url)
        .then((response) => {
        if (response.ok) {
         
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
          .then((d) => {
            // console.log("Hello: "+d);
            var obj = {
              data:d
            };
            var arr = [obj];
            this.setState({series:arr});
          })
          .catch((err) => {
            this.setState({error:true});
            console.log(err);
    
          });
          
      this.state = {
        start: this.props.startdate,
        end:this.props.enddate,
        series: [{
          data:[]
        }],
        options: {
          chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
              autoScaleYaxis: true
            },
            toolbar:{
            autoSelected: 'zoom' 
            }
          },
          annotations: {
            yaxis: [{
              y: 30,
              borderColor: '#999',
              label: {
                show: true,
                text: 'Support',
                style: {
                  color: "#fff",
                  background: '#00E396'
                }
              }
            }],
            xaxis: [{
              x: new Date(this.props.enddate).getTime(),
              // min: new Date(this.props.startdate).getTime(),
              // y:new Date(this.props.startdate).getTime(),
              type: 'datetime',
            min: new Date(this.props.startdate).getTime(),
            tickAmount: 6,
              borderColor: '#999',
              yAxisIndex: 0,
              label: {
                show: true,
                text: 'Rally',
                style: {
                  color: "#fff",
                  background: '#775DD0'
                }
              }
            }]
          },
          dataLabels: {
            enabled: true
          },
          markers: {
            size: 0,
            style: 'hollow',
          },
          xaxis: {
            
          },
          tooltip: {
            x: {
              format: 'MMM dd, yyyy, hh:mm:ss'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          },
        },
      
      
        selection: 'one_month',
        
      };
      
      }
    }
    updateData(timeline) {
      this.setState({
        selection: timeline
      })
    
      switch (timeline) {
        case 'one_month':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date(this.props.startdate).getTime(),
            new Date(this.props.enddate).getTime()
          )
          break
        case 'six_months':
          console.log(this.props.startdate)
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date(this.props.startdate).getTime(),
            new Date(this.props.enddate).getTime()
          )
          break
        case 'one_year':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date('27 Feb 2019').getTime(),
            new Date('27 Feb 2020').getTime()
          )
          break
        case 'ytd':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date('01 Jul 2019').getTime(),
            new Date('27 Aug 2019').getTime()
          )
          break
        case 'all':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date('23 Jul 2019').getTime(),
            new Date('27 Aug 2020').getTime()
          )
          break
        default:
      }
    }
  

    render() {
      if (!localStorage.getItem("username")) {
        return <Redirect to = {{pathname:'/login'}}/>
      }
      return (
        
<div><Menu />
  <div id="chart">
     <h3>{this.props.topic}</h3><br/>
<div class="toolbar">
{/* <button id="one_month"
    
    onClick={()=>this.updateData('one_month')} className={ (this.state.selection==='one_month' ? 'active' : '')}>
  1M
</button>
&nbsp;
<button id="six_months"
    
    onClick={()=>this.updateData('six_months')} className={ (this.state.selection==='six_months' ? 'active' : '')}>
  6M
</button>
&nbsp;
<button id="one_year"
    
    
    onClick={()=>this.updateData('one_year')} className={ (this.state.selection==='one_year' ? 'active' : '')}>
  1Y
</button>
&nbsp;
<button id="ytd"
    
    onClick={()=>this.updateData('ytd')} className={ (this.state.selection==='ytd' ? 'active' : '')}>
  YTD
</button>
&nbsp;
<button id="all"
    
    onClick={()=>this.updateData('all')} className={ (this.state.selection==='all' ? 'active' : '')}>
  ALL
</button> */}
</div>

<div id="chart-timeline">
<ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} width={1000} />
</div>
</div>
</div>

      );
    }
  }

//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(React.createElement(ApexChart), domContainer);