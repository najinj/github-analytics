import React,{Component} from 'react';
import GitServices from '../API/GitServices';
import { Media, Row, Col } from 'react-bootstrap';
export default class Contributor extends Component {
  state = {
    user : ''
  }
  constructor(props) {
    super(props);
  }
  componentWillMount(){

  }

  render(){
    if(this.props.contributor)
      return(
        <div style={Styles.contributorContainer}>
           <a href={this.props.contributor.html_url} style={{textDecoration:'none'}}>
              <img style={Styles.imageStyle}  src={this.props.contributor.avatar_url} alt="thumbnail" />
              <span style={Styles.caption.login}>{this.props.contributor.login}</span><br/>
           </a>
            <span style={Styles.caption}>Total commits: <span style={{color:'green'}}>{this.props.contributor.contributions}</span></span>
        </div>
      );
      return (
        <div style={Styles.contributorContainer}>
            <img style={Styles.imageStyle}  />
            <span style={Styles.caption.login}></span><br/>
            <span style={Styles.caption}>Total commits: <span style={{color:'green'}}></span></span>
        </div>
      );
  }
}

const Styles = {
  contributorContainer :{
    // display:'inline-table',
     float:"left",
    // border:'1px solid',
     padding : "10px",
     margin: "2%",
    // width : "120px"

    verticalAlign: 'top',
    'display': 'inline-table',
    textAlign: 'center',
    'width': '120px'

    // marginTop : "0.2%",
    // border : "0.1em solid",
    // display : "flex",
    // flexDirection : 'row'

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
    login : {
      color : '#0074D9',
      font : 'bold'
    }
    // border : "0.1em solid red",

    // height : '5%',
    // marginTop : 0,
    // paddingTop : 0,
    // marginBottom : 0,
    // paddingBottom :0,
  //  display : "flex",
    //flexDirection:'row'
  }

}
