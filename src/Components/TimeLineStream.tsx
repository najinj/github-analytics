import React,{useEffect} from 'react';
import GitServices from '../API/GitServices';
import {HandleData,Timelinedata} from '../Utils/Data.js';
import useStore from "global-hook-store";
import {Charts,ChartContainer,ChartRow,YAxis,LineChart,BarChart,AreaChart} from "react-timeseries-charts";
import { Collection, TimeSeries, indexedEvent, TimeRange ,Index} from "pondjs";
import moment from "moment";
import {commitsStore} from '../Stores/gitStore';

const TimeLineStream = ({full_name}) =>{
  const {
  state: {timerange,seriesCommit,loading},
  actions: { fetchingCommits,setTimeRage,setSeriesCommit, setStatics,setLoading,reset }
  } = useStore(commitsStore);

  const handleTimeRangeChange = (timerange) => {
        setTimeRage({ timerange });
    };
    type IItem = {
      commit : number,
      data : string
    };
  const ProcessData = (commits)=> {
      let data = Timelinedata(commits);
      if(typeof(data)!="undefined" && data.length){
        console.log('*********')
        let test = new indexedEvent(new Date(), {commit:1});
        // const commitEvents = data.map(item => {
        //   const index = new Index(new Date(item.date).toISOString());
        //   let  commit  = item.commit;
        //   console.log("typeof commit " + commit);
        //   //let dataset =  new Map();
        //   //dataset.set("commit",commit);
        //   let test = new Map<string, number>();
        //   test.set("commit",commit);
        //   //var item : { [key:string]:number; } = {};
        //   //item["commit"] = commit;
        //   //console.log(new indexedEvent(index, { commit:  commit }));
        //   return new indexedEvent(index, {"commit":commit});
        // });
        //
        // const commitCollection = new Collection(commitEvents);
        // const sortedCommitCollection = commitCollection.sortByTime();
        //
        // const var_seriesCommit = new TimeSeries({
        //     name: "AAPL-commit",
        //     utc: false,
        //     collection: sortedCommitCollection
        // });



        setSeriesCommit(var_seriesCommit);
        this.setState({Loading:false});
      }
    }

    useEffect(()=>{
      if(full_name != "LOADING_CONST")
          fetchingCommits({full_name}).then(res=>{
            if(res.commits.data){
              let start = Date.parse(res.commits.data[res.commits.data.length-1].commit.author.date) - 86400000; // 86400000 is a day in milliseconds i added it cuz there is some sort of bug in the chart it wont start from the first day in the dataset
              let end = Date.parse(res.commits.data[0].commit.author.date) + 86400000;
              console.log(end);
              let timeRange = new TimeRange([start, Date.parse(res.commits.data[0].commit.author.date)]);
              setTimeRage(timerange);
              console.log(timerange)
              ProcessData(res.commits.data);
              setLoading(false);
            }
          },(err)=>{
            console.log(err);
            setLoading(false);
          });
    },[])


    // const croppedCommitSeries = seriesCommit!=null? seriesCommit.crop(timerange) : null;
    // if(croppedCommitSeries != null)
    //   return (
    //     <ChartContainer
    //               timeRange={timerange}
    //               hideWeekends={false}
    //               enablePanZoom={true}
    //               onTimeRangeChanged={handleTimeRangeChange}
    //               width={800}
    //
    //     >
    //           <ChartRow height="200">
    //                         <YAxis
    //                             id="y"
    //                             label="commits"
    //                             min={0}
    //                             max={croppedCommitSeries.max("commit")}
    //                             width="60"
    //                         />
    //                        <Charts>
    //                            <BarChart
    //                                axis="y"
    //                                style={{ commit: { normal: { stroke: "steelblue" } } }}
    //                                columns={["commit"]}
    //                                series={croppedCommitSeries}
    //
    //                            />
    //                        </Charts>
    //
    //                    </ChartRow>
    //         </ChartContainer>
    //
    // );
    return null;
}
export {TimeLineStream};
