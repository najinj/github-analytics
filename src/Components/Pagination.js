import React,{Component} from 'react';

export default class Pagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activepage : 0
    }
  }

  componentWillMount(){

  }

  handlePageClick(){

  }

  render(){
    return(
      <div className="pagination">
          <ReactPaginate previousLabel={"previous"}
               nextLabel={"next"}
               breakLabel={"..."}
               breakClassName={"break-me"}
               pageCount={this.state.pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               onPageChange={this.handlePageClick}
               containerClassName={"pagination"}
               subContainerClassName={"pages pagination"}
               activeClassName={"active"} />
      </div>
    )
  }
}
