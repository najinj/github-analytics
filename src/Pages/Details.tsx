import React,{Component} from 'react';
import {BrowserRouter as Router ,Link} from 'react-router-dom';
import {RepositorySubDetails} from '../Components/RepositorySubDetails';
import {ContributorsList} from '../Components/ContributorsList';
import {Statistics} from '../Components/Statistics';

const Details = (props) =>{

  const { match: { params } } = props;
  return(
        <div style={{backgroundColor:'#e4e5e6'}}>
          <RepositorySubDetails repoId={params.RepositoryId} />
          <ContributorsList repoId = {params.RepositoryId} />
          <Statistics repoId = {params.RepositoryId} />
        </div>


  );
}

export {Details};
