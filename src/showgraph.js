import React, { Component } from 'react'
import App  from './app';
import DatePick from './Datepick';
export default class 
 extends Component {
    render() {
        return (
            <div>
                <center>
                    <br/><br/>
                <span>From : <DatePick /></span>
                <span>To : <DatePick /></span>
                <br/><br/><br/>
                <App graphname="soilmoisture" topic="Soil moisture" name="Soil moisture" color="rgba(255,153,153,0.2)"/><br/><br/>
                <App graphname="soiltemperature" topic="Soil temperature"name="Soil temperature" color="rgba(0,0,255,0.75)"/><br/><br/>
                <App  graphname="ambienthumidity"topic="Ambient humidity" name="Ambient humidity" color="rgba(100,100,0,0.75)"/><br/><br/>
                <App  graphname="ambienttemperature"topic="Ambient temperature" name="Ambient temperature" color="rgba(255,0,100,0.75)"/><br/><br/>
                <App  graphname="leafwetness" topic="Leaf wetness" name="Leaf wetness" color="rgba(105,100,100,0.75)"/>
                </center>
            </div>
        )
    }
}
