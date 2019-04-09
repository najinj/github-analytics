import React,{useEffect} from 'react';
import GitServices from '../API/GitServices';
import {Contributor} from './Contributor';
import {githubStore,repositoryStore,contributorsStore} from '../Stores/gitStore';
import useStore from "global-hook-store";
import {makeStyles} from '@material-ui/styles';


const ContributorsList = ({repoId}) =>{
  let DidLoad = false;

  const {
  state: {repository},
  actions: { fetchingRepo, reset }
  } = useStore(repositoryStore);

  const {
  state: {contributors},
  actions: {fetchingContributors }
  } = useStore(contributorsStore);

  const {
  state: { repos,resposCount },
  actions: { fetchingRepos, }
  } = useStore(githubStore);

  const getownerandrepo = () => {
    fetchingRepo({id : repoId}).then(res=>{
      if(res.repository.data.full_name)
          LoadContributors(res.repository.data.full_name);
    });
  }
  const LoadContributors = (name) => {
    fetchingContributors({name});
  }

  // useEffect(()=>{
  //   LoadContributors(repository.data.full_name);
  // },[typeof repository.data.full_name !== "undefined"])


  useEffect(()=>{
    getownerandrepo();
  },[])



  const  rendercontributors = () =>{
      return contributors.data.map(cont =>{
        return(
            <Contributor {...cont} key={cont.id}/>
        );
      })
          return null;
  }
  const classes = useStyles();
  return(
          <div className = {classes.Liststyle}>
              {rendercontributors()}
          </div>
  );


}


const useStyles = makeStyles({
  Liststyle : {
    heigh:'200px',
    display : 'inline-table',
    overflowY : 'auto',
    //border : '1px solid red',
    marginLeft : '2%',
    marginRight : '2%',
    width:'96%',
    border:'0.2px solid #c8ced3',
    marginTop:"5%",
    borderRadius:'.25rem',
    backgroundColor:'#fff',
    boxShadow: ' 0 4px 4px rgba(0, 0, 0, 0.3)',
  },
  Button:{
    margin:"2%",
    width:'3em',
    height:'3em'
  }
});

export {ContributorsList};
