import React,{Component} from 'react';
import Repository from '../Components/Repository';
import GitServices from '../API/GitServices';
import {BrowserRouter as Router ,Link,Route} from 'react-router-dom';
import Details from './Details';
import Routes from '../Components/Routes';
import ReactPaginate from 'react-paginate';
import "../Styles/Paginavigation.css";
import {HandleData} from '../Utils/Data.js';
import TimeLineStream from '../Components/TimeLineStream.js';
import Logo from "../Styles/HomeLogo.png";
import SearchIcon from '@material-ui/icons/Search';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import moment from "moment";
export default class Home extends Component {
  state = {
            Repositories : [] ,
            total_count:  '',
            Loading : false,
            search :'',
            offset: 1

          };

  constructor() {
      super();

  }

  componentWillMount(){
    console.log(moment("2018-11-01T23:33:14Z").format("YYYY-MM-DD"));
  }

  handlePageClick = (data) => {

    let selected = data.selected;
    let offset = selected + 1;

    this.setState({offset: offset}, () => {
      this.LoadRepositories(this.state.search);
    });
  };

  LoadRepositories(name){
    if(!this.isEmpty(this.state.search))
      GitServices.SearchRepositories(this.state.search,this.state.offset,10).then(res=>{
        if(this.state.offset == 1) this.setState({total_count:res.data.total_count});
        this.setState({Repositories:res.data.items});
        this.setState({total_count:res.data.total_count});
      });
      else {
        this.setState({Repositories:[]});
        this.setState({total_count:''});
      }
  }

  search(){
    //let name = val.target.value;
    if(!this.isEmpty(this.state.search))
      this.LoadRepositories(this.state.search);
      else {
        this.setState({Repositories:[]});
        this.setState({total_count:''});
      }
  }
   isEmpty(str) {
    return (!str || 0 === str.length);
  }
  handleChange(val){
    let name = val.target.value;
    this.setState({search:name});
  }

  renderRepositories(){
    if(this.state.total_count){

      return this.state.Repositories.map(repo =>{
        return(
          <Link to={`/Repository/${repo.id}`} style={{ textDecoration: 'none' ,color : 'unset'}} >
            <Repository repo={repo} key={repo.id}/>
          </Link>
        );
      })
    }
      return null;

  }

  render(){
    const {Repositories} = this.state;
    if(this.state.Repositories.length)
          return(
            <div style={{backgroundColor:'#e4e5e6',marginTop:0,marginBottom:0,display:"block",width:'100%',height:'100%',position:'fixed',overflowY:'scroll'}}>

                <div style={Styles.container}>
                <div style={{display:'flex',marginLeft:'30%'}}>
                    <img src={Logo} width="50%" height="50%" />
                    <h2>Statistics</h2>
                </div>
                  <div style={Styles.InputText}>
                  <input type="text" onChange={this.handleChange.bind(this)} style={{height:'30px',width: "800px",fontSize:"20px",padding:'0.3%'}}/>

                  <Button variant="contained" color="primary" style={{height:'39px',width:'80px'}} onClick={this.search.bind(this)} >
                    <SearchIcon className={"search"} />
                  </Button>
                  </div>
                  <div className="Repositories">
                      {this.renderRepositories()}
                  </div>
                  <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={"..."}
                       breakClassName={"break-me"}
                       pageCount={this.state.total_count}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />

                </div>
            </div>

          );
          return(
            <div style={{backgroundColor:'#e4e5e6',marginTop:0,marginBottom:0,display:"block",width:'100%',height:'100%',position:'fixed',overflowY:'scroll'}}>
                <div style={Styles.container}>
                    <div style={{display:'flex',marginLeft:'30%'}}>
                    <img src={Logo} width="50%" height="50%" />
                    <h2>Statistics</h2>
                    </div>
                  <div style={Styles.InputText}>
                      <input type="text" onChange={this.handleChange.bind(this)} style={{height:'30px',width: "800px",fontSize:"20px",padding:'0.3%'}}/>

                      <Button variant="contained" color="primary" style={{height:'39px',width:'80px'}} onClick={this.search.bind(this)} >
                        <SearchIcon className={"search"} />
                      </Button>
                  </div>
                </div>
            </div>

          );



  }
}

const Styles = {
  container : {
    width:'800px',
    margin:"auto",
    align:'center',
    marginTop:'5%',

  },
  InputText : {
    margin: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    alignContent: 'center',

  }
}
