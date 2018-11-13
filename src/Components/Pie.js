import React,{Component} from 'react';
import { ResponsivePieCanvas } from '@nivo/pie';
import GitServices from '../API/GitServices';
import {HandleData} from '../Utils/Data.js';
export default class Pie extends Component {
  state = {
    commits : [],
    data : []
  }
  constructor() {
    super();
  }
  componentWillMount(){
    if(this.props.full_name != "LOADING_CONST")
    GitServices.getCommits(this.props.full_name,100).then(res=>{
      if(res.data){
        this.setState({commits:res.data});
        this.HandleData();
      }
    },(err)=>{
      console.log(err);
    })
  }
  HandleData(){
    let data = HandleData(this.state.commits);
    if(typeof(data)!="undefined" && data.length){
      this.setState({data:data});
    }
  }
  render(){
    const {data} = this.state;
    return(
      <ResponsivePieCanvas
        data={data}
        margin={{
            "top": 0,
            "right": 170,
            "bottom": 0,
            "left": 40
        }}
        pixelRatio={1}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors="paired"
        colorBy="id"
        borderColor="inherit:darker(0.6)"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}

        legends={[
            {
                "anchor": "right",
                "direction": "column",
                "translateX": 140,
                "itemWidth": 60,
                "itemHeight": 14,
                "itemsSpacing": 2,
                "symbolSize": 14,
                "symbolShape": "circle"
            }
        ]}
    />
    );
  }
}
