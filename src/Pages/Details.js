import React,{Component} from 'react';
import {BrowserRouter as Router ,Link} from 'react-router-dom';
import RepositorySubDetails from '../Components/RepositorySubDetails';
import ContributorsList from '../Components/ContributorsList';
import Statistics from '../Components/Statistics';

export default class Details extends Component {
  constructor() {
    super();
    this.state = {
            Contributors_Count: 0,
          
        };
  }
  componentWillMount(){
    const { match: { params } } = this.props;
  }
  getContributors_Count_From_Child = (dataFromContributorsList) => {
      this.setState({Contributors_Count:dataFromContributorsList});
    }



  render(){
    const { match: { params } } = this.props;
    return(
          <div style={{backgroundColor:'#e4e5e6'}}>
            <RepositorySubDetails RepositoryId={params.RepositoryId} commits = {this.state.Commits_Count} contributors = {this.state.Contributors_Count}/>
            <ContributorsList RepositoryId = {params.RepositoryId} callbackFromParent={this.getContributors_Count_From_Child}/>
            <Statistics RepositoryId = {params.RepositoryId} />
          </div>


    );
  }
}
