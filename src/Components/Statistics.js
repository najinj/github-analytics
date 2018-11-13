import React,{Component} from 'react';
import GitServices from '../API/GitServices';
import {HandleData} from '../Utils/Data.js';
import Pie from './Pie.js';
import TimeLineStream from './TimeLineStream.js';

export default class Statistics extends Component {
  state = {
    full_name : "LOADING_CONST"
  }
  constructor() {
    super();
  }

  getRepository(){
    GitServices.getRepository(this.props.RepositoryId).then(res=>{
      if(res.data){
        this.setState({full_name:res.data.full_name});
      }
    },(err)=>{
      console.log(err);
    })
  }

  componentWillMount(){
    this.getRepository();
  }

  render(){
    if(this.state.full_name != "LOADING_CONST")
            return(
              <div style={{ height: '600px',display:'inline-table',width:"100%",marginLeft:'2%'}}>
                    <div style={Styles.Pie}>
                           <span style={Styles.Header1}>The Impact of each user on the project given the last 100 commits </span>
                           <Pie full_name = {this.state.full_name} />
                    </div>
                    <div style={Styles.Timeline}>
                           <span style={Styles.Header2}>The projection of the last 100 commits on a timeline </span>
                           <div style={Styles.TimelinePadding}>
                              <TimeLineStream full_name = {this.state.full_name} style={{width:'inherit'}}/>
                           </div>
                    </div>
              </div>
            );
    return(
        <div style={{ height: '600px',display:'inline-table',width:"100%",marginLeft:'2%'}}>
                    <div style={Styles.Pie}>
                           <span style={Styles.Header1}>The Impact of each user on the project given the last 100 commits </span>
                    </div>
                    <div style={Styles.Timeline}>
                           <span style={Styles.Header2}>The projection of the last 100 commits on a timeline </span>
                           <div style={Styles.TimelinePadding}>

                           </div>
                    </div>
          </div>
            );



  }

}
const Styles = {
  TimelinePadding:{
    marginTop:'5%',
    marginLeft:'5%',
    marginRight:'100px'
  },
  Pie:{
    height: '400px',
    width:"40%" ,
    paddingLeft:'2%',
    paddingBottom:"5%",
    paddingRight:"2%",
    float:'left',
    marginLeft:'2%',
    marginRight:'5%',
    border:'0.2px solid #c8ced3',
    marginTop:"2%",
    borderRadius:'.25rem',
    backgroundColor:'#fff',
    boxShadow: ' 0 4px 4px rgba(0, 0, 0, 0.3)',
  },
  Timeline :
  {
      height: '400px',
      width:"40%",
      display: 'inline-table' ,
      paddingBottom:'5%',
      //marginLeft:'5%',
      //marginRight:'5%',
      border:'0.5px solid',
      marginBottom:'10%',
      marginTop:"2%",
      border:'0.2px solid #c8ced3',
      marginTop:"2%",
      borderRadius:'.25rem',
      backgroundColor:'#fff',
      boxShadow: ' 0 4px 4px rgba(0, 0, 0, 0.3)',
 },
 Header1 : { fontFamily: "Calibri",fontSize:28,marginTop:'1%',marginLeft:0, fontStyle: "normal", fontVariant: "normal", fontWweight: 400},
 Header2 : { fontFamily: "Calibri",fontSize:28,marginTop:'2%',marginLeft:0, fontStyle: "normal", fontVariant: "normal",marginLeft:'1%',padding:'1%' }


}
