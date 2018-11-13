import React,{Component} from 'react';
import GitServices from '../API/GitServices';
import {BrowserRouter as Router ,Link,Route} from 'react-router-dom';
import github_logo from "../Styles/github.png";
export default class RepositorySubDetails extends Component {
  state = {
    subdetails : null
  }
  constructor() {
    super();
  }
  dateformat(date_string){
    return  new Date(date_string).toLocaleString('en-GB');
  //  return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() +" at "+date.getHours()+":"+date.getMinutes();
  }
  componentWillMount(){
    GitServices.getRepository(this.props.RepositoryId).then(res=>{
        this.setState({subdetails:res.data});
    },(err)=>{
      console.log(err);
    });
  }

  render(){

    if(this.state.subdetails != null)
    {
      const {full_name,owner,description,created_at,updated_at,language,license,watchers} = this.state.subdetails;

      return (
        <div style={Styles.navBar}>
          <Link to={"/"} style={{ textDecoration: 'none' ,color : 'unset',marginTop:'-0.5%',marginLeft:'1%',flex:0.1}} >
            <img src={github_logo} width="100px" style={{display:'inline-table',float:'left'}}/>
          </Link>

            <span style={Styles.span}>{full_name}</span>

              {/* <div style={Styles.container}>
                <div style = {Styles.details}>
                    <span style={Styles.details_span}>Created at : {this.dateformat(created_at)}</span>
                    <span style={Styles.details_span}>Last Update : {this.dateformat(updated_at)}</span>
                </div>
                </div>
              */}




        </div>
      );

    }
    return (
      <div style={Styles.navBar}>
          <span style={Styles.span}></span>
          {/*
            <div style={Styles.container}>
                <div style = {Styles.details}>
                    <span style={Styles.details_span}>Created at : </span>
                    <span style={Styles.details_span}>Last Update : </span>
                    <span style={Styles.details_span}>contributors : </span>
                </div>

            </div>
            */}
      </div>
    );

  //
  //  const avatar_url = owner.avatar_url;

  }
}

const Styles = {
  navBar : {
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#fafbfc',
    borderBottom:'1px solid rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',position: 'fixed',
    top: 0,
    width:'100%',
    height:"80px"
  },
  details_span:{
    fontSize:18,
    marginTop:'-3%',
    marginLeft:'2%'
  },
  span : {
    fontSize:25,
    color : '#0074D9',
    marginTop:'1%',
    marginLeft:'2%',
    marginBottom:'2%'
  },
  container : {
    display:'block',
    flexDirection:"row",
    width:"100%",
    //borderBottom:'1px solid rgba(0, 0, 0, 0.3)'

  },
  owner : {
    marginLeft : "10%",
    marginBottom : "15%",
    marginTop : "5%",
    border : "1px solid"
  },
  details : {
    marginTop : '2%',
    marginLeft:'1%',
    marginBottom:'0.5%',
    display : 'flex'
  },
  description : {
    marginLeft : "10%",
    marginTop:0,
    border : "1px solid"
  }

}
