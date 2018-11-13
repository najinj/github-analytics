import React,{Component} from 'react';


export default class Repository extends Component {
  constructor() {
    super();
  }

  render(){

    const name = this.props.repo.license && this.props.repo.license.hasOwnProperty('name') ? this.props.repo.license.name : '';
    const {RepositoryContainer} = Styles;
    console.log(this.props.repo);
    return (
      <div style={RepositoryContainer}>
         <div>
            <span style={{padding:'2%',fontSize:20,color:'#0074D9'}}>{this.props.repo.full_name}</span>
            <span>{this.props.repo.langage}</span>
          </div>
          <div>
            <p style={{maxLines:3,marginLeft:'10px'}}>{this.props.repo.description}</p>
            <span>{name}</span>
          </div>
      </div>
    );
  }


}

const Styles = {
  RepositoryContainer : {
    border : '1px solid',
    padding:'2%',

    border:'0.2px solid #c8ced3',
    marginTop:"1%",
    borderRadius:'.25rem',
    backgroundColor:'#fff',
    boxShadow: ' 0 4px 4px rgba(0, 0, 0, 0.3)',

    //marginleft : '5%',

  }
}
