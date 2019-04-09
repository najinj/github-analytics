import React from 'react';
import GitServices from '../API/GitServices';
import {makeStyles} from '@material-ui/styles';

type ContributorProps = {
    html_url : string,
    avatar_url:string,
    login: string,
    contributions:number
}


const Contributor : React.FC<ContributorProps> = (props) =>  {
  const classes = useStyles();
  return(
    <div className={classes.contributorContainer}>
       <a href={props.html_url} style={{textDecoration:'none'}}>
          <img className={classes.imageStyle}  src={props.avatar_url} alt="thumbnail" />
          <span className={classes.caption}>{props.login}</span><br/>
       </a>
        <span className={classes.caption}>Total commits: <span style={{color:'green'}}>{props.contributions}</span></span>
    </div>
  );

}


const useStyles = makeStyles({
  contributorContainer : {
     float:"left",
     padding : "10px",
     margin: "2%",
    verticalAlign: 'top',
    'display': 'inline-table',
    textAlign: 'center',
    'width': '120px'
  },
  imageStyle : {
     width : 200,
     height: 200,
     display:'block',
     marginLeft:'auto',
     marginRight:'auto',
     borderRadius:'50%',
     padding:'1%',
     border : '3px #0074D9 solid',
     boxShadow: ' 0 4px 4px rgba(0, 0, 0, 0.3)',
  },
  caption :{
      color : '#0074D9',
      font : 'bold'
  }
});

export {Contributor};
