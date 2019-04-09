import React,{Component,useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
type RepositoryProps = {
  license : any,
  full_name : string,
  langage : string,
  description : string,
  id : string
}

const Repository: React.FC<RepositoryProps> = (props) =>  {

    const classes = useStyles();
    return (
      <div style={{padding:'2%',
      border:'0.2px solid #c8ced3',
      marginTop:"1%",
      borderRadius:'.25rem',
      backgroundColor:'#fff',
      boxShadow: ' 0 4px 4px rgba(0, 0, 0, 0.3)'}}>
         <div>
            <span style={{padding:'2%',fontSize:20,color:'#0074D9'}}>{props.full_name}</span>
            <span>{props.langage}</span>
          </div>
          <div>
            <p style={{maxLines:3,marginLeft:'10px'}}>{props.description}</p>
            <span></span>
          </div>
      </div>
    );
}



const useStyles = makeStyles({
  RepositoryContainer : {
    //border : '1px solid',
    padding:'2%',
    border:'0.2px solid #c8ced3',
    marginTop:"1%",
    borderRadius:'.25rem',
    backgroundColor:'#fff',
    boxShadow: ' 0 4px 4px rgba(0, 0, 0, 0.3)',

    //marginleft : '5%',

  }
});

export {Repository};
