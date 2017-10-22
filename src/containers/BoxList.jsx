import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchBoxes } from '../actions';
import BoxListItem from './BoxListItem'
import CreateBoxListItem from './CreateBoxListItem';


class BoxList extends Component {

  constructor(props){
    super(props);

    this.props.fetchBoxes()
  }

  renderBoxItems(){
    return (
      this.props.boxes.map( box => {
        return <BoxListItem box={box} key={box.id}/>
      })
    );
  }

  render() {
    if (!this.props.boxes){
      return <ul className="col-md-4 list-group"></ul>
    }
    return (
      <ul className="list-group">
        <CreateBoxListItem />
        { this.renderBoxItems() }
      </ul>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBoxes }, dispatch);
}

function mapStateToProps(state){
  return {
    boxes: state.boxes,
    selectedBox: state.selectedBox
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxList)
