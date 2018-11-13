import React,{Component} from 'react';
import { ResponsiveStream  } from '@nivo/pie';
import GitServices from '../API/GitServices';
import {HandleData,Timelinedata} from '../Utils/Data.js';

import {Charts,ChartContainer,ChartRow,YAxis,LineChart,BarChart,AreaChart} from "react-timeseries-charts";
import { Collection, TimeSeries, TimeEvent, IndexedEvent, TimeRange } from "pondjs";
import moment from "moment";


export default class TimeLineStream extends Component {

  constructor(props) {
    super(props);
       this.state = {
           mode: "log",
           timerange: '',
           commits : [],
           seriesCommit : new TimeSeries(),
           Loading : true,

       };
  }
  handleTimeRangeChange = timerange => {
        this.setState({ timerange });
    };
  componentWillMount(){
    console.log(moment("2018-11-01T23:33:14Z").format("YYYY-MM-DD"));
    if(this.props.full_name != "LOADING_CONST")
        GitServices.getCommits(this.props.full_name,100).then(res=>{
          if(res.data){
            this.setState({commits:res.data});
            let start = Date.parse(res.data[res.data.length-1].commit.author.date) - 86400000; // 86400000 is a day in milliseconds i added it cuz there is some sort of bug in the chart it wont start from the first day in the dataset
            let end = Date.parse(res.data[0].commit.author.date) + 86400000;
            console.log(start);
            let timeRange = new TimeRange([start, Date.parse(res.data[0].commit.author.date)]);
            console.log(timeRange);//2018-11-05T17:08:07Z
            this.setState({timerange:timeRange});
            this.HandleData();
          }
        },(err)=>{
          console.log(err);
        });
  }
  HandleData(){
    let data = Timelinedata(this.state.commits);
    if(typeof(data)!="undefined" && data.length){

      const commitEvents = data.map(item => {
        const index = new Date(item.date).toISOString();
        let  commit  = item.commit;
        console.log(new IndexedEvent(index, { commit: + commit }));
        return new IndexedEvent(index, { commit: + commit });
      });

      const commitCollection = new Collection(commitEvents);
      const sortedCommitCollection = commitCollection.sortByTime();

      const seriesCommit = new TimeSeries({
          name: "AAPL-commit",
          utc: false,
          collection: sortedCommitCollection
      });



      this.setState({seriesCommit:seriesCommit});
      this.setState({Loading:false});
    }
  }
  renderchart(){
    if(!this.state.Loading){
      const { timerange, seriesCommit} = this.state;
      const croppedCommitSeries = seriesCommit.crop(timerange);
      return (
          <ChartContainer
                    timeRange={timerange}
                    hideWeekends={false}
                    enablePanZoom={true}
                    onTimeRangeChanged={this.handleTimeRangeChange}

          >
                <ChartRow height="200">
                              <YAxis
                                  id="y"
                                  label="commits"
                                  min={0}
                                  max={croppedCommitSeries.max("commit")}
                                  width="60"
                              />
                             <Charts>
                                 <BarChart
                                     axis="y"
                                     style={{ commit: { normal: { stroke: "steelblue" } } }}
                                     columns={["commit"]}
                                     series={croppedCommitSeries}
                                     spacing={1}
                                 />
                             </Charts>

                         </ChartRow>
              </ChartContainer>


      );
    }
    return null;
  }

  render(){
    //const {data} = this.state;
    if(!this.state.Loading){
      const { timerange, seriesCommit} = this.state;
      const croppedCommitSeries = seriesCommit.crop(timerange);
      return (
          <ChartContainer
                    timeRange={timerange}
                    hideWeekends={false}
                    enablePanZoom={true}
                    onTimeRangeChanged={this.handleTimeRangeChange}
                    width={800}

          >
                <ChartRow height="200">
                              <YAxis
                                  id="y"
                                  label="commits"
                                  min={0}
                                  max={croppedCommitSeries.max("commit")}
                                  width="60"
                              />
                             <Charts>
                                 <BarChart
                                     axis="y"
                                     style={{ commit: { normal: { stroke: "steelblue" } } }}
                                     columns={["commit"]}
                                     series={croppedCommitSeries}

                                 />
                             </Charts>

                         </ChartRow>
              </ChartContainer>

      );
    }
    return null;
  }
}
