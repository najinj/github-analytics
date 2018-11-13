import React,{Component} from 'react';
import GitServices from '../API/GitServices';
import Contributor from './Contributor';

export default class ContributorsList extends Component {
  state = {
    contributors : [],
    full_name : '',
    offset: 1
  }
  constructor() {
    super();
  }

  Previous = (val) => {
    let index = val.target.value;
    if(index > 2){
      let offset = index - 1;

      this.setState({offset: offset}, () => {
        this.LoadRepositories(this.state.search);
      });
    }
  };

  Next = (val) => {
    let index = val.target.value;
    if(index < 9){
      let offset = index + 1;

      this.setState({offset: offset}, () => {
        this.LoadRepositories(this.state.search);
      });
    }
  };

  LoadContributorss(){
    GitServices.getContributors(this.state.full_name,this.state.offset,30).then(res=>{  // here i fetch the first 30 contributors with the most impact on the project
      if(res.data){
        this.setState({contributors:res.data});
        this.SendContributorsCountToParent();
      }

    },(err)=>{
      console.log(err);
    });
  }
  getownerandrepo(cb){
    GitServices.getRepository(this.props.RepositoryId).then(res=>{
        if(res.data)
        {
          this.setState({full_name:res.data.full_name});
          return cb(true);
        }
        return cb(false)
    },(err)=>{
      console.log(err);
    });
  }
  componentWillMount(){
    this.getownerandrepo(TrueOrFalse=>{
      if(TrueOrFalse){
        this.LoadContributorss();
      }
    })
  }
  rendercontributors(){
      if(this.state.contributors.length)
      return this.state.contributors.map(cont =>{
        return(
            <Contributor contributor={cont} key={cont.id}/>
        );
      })
          return <Contributor/>;
  }
  SendContributorsCountToParent(){
    if(this.state.contributors.length)
        this.props.callbackFromParent(this.state.contributors.length);
    }
  render(){
    return(
            <div style={Styles.Liststyle}>
                {this.rendercontributors()}
            </div>
    );
  }
}
const Styles = {
  Liststyle : {
    heigh:'200px',
    display : 'inline-table',
    overflowY : 'auto',
    border : '1px solid red',
    marginLeft : '2%',
    marginRight : '2%',
    width:'96%',
    border:'0.2px solid #c8ced3',
    marginTop:"10%",
    borderRadius:'.25rem',
    backgroundColor:'#fff',
    boxShadow: ' 0 4px 4px rgba(0, 0, 0, 0.3)',
  },
  Button:{
    margin:"2%",
    width:'3em',
    height:'3em'
  }
}
